/* ============================================================
   VENTURE CONNECT — Founder pages: dashboard, workspace,
   readiness check, applications
   ============================================================ */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* "What should I do next?" guidance for an application (founder-facing only) */
function appNextStep(app) {
  if (!app) return null;
  if (app.rejected) return { text: "This application was not selected. Explore other opportunities that fit your startup.", cta: "Explore Opportunities", route: "#/founder/opportunities" };
  if (app.needsRevision) return { text: "Venture Connect requested changes. Review the feedback and update your application.", cta: "Review Feedback", route: "#/founder/application/" + app.id };
  const st = app.stage;
  if (st >= 6) return app.gate && app.gate.decision === "passed"
    ? { text: "Your application passed the Quality Gate and is now visible to the organization.", cta: "View Opportunity", route: "#/founder/opportunity/" + app.opportunityId }
    : { text: "The final decision is being prepared. You will be notified as soon as it is ready." };
  if (st === 5) return { text: "Venture Connect is verifying the evidence you submitted. No action needed from you right now." };
  if (st === 4) return { text: "Your founder interview is being scheduled by Venture Connect. Keep your calendar ready." };
  if (st === 3) return { text: "Your application is in pitch review. Keep your pitch materials ready in case they are requested." };
  if (st === 1) return { text: "Venture Connect is running automated quality checks on your application." };
  return { text: "Your application is under review by Venture Connect." };
}

/* Founder's most relevant application (demo: their startup) */
function myTopApp() {
  const apps = Store.applicationsForStartup(Store.founder().startupId);
  return apps.length ? apps[0] : null;
}

const FOUNDER_STATUS_STEPS = [
  { key: 0, label: "Submitted" },
  { key: 1, label: "Under Review" },
  { key: 3, label: "Pitch Review" },
  { key: 4, label: "Interview" },
  { key: 5, label: "Validation" },
  { key: 6, label: "Approved" }
];

function statusStrip(app) {
  if (!app) return "";
  const cur = app.stage;
  return '<div class="status-strip">' + FOUNDER_STATUS_STEPS.map((s, i) => {
    const done = cur >= s.key && !app.rejected && !(app.gate && app.gate.decision !== "passed" && cur >= 6);
    const isCur = !done && cur >= s.key && (i === FOUNDER_STATUS_STEPS.length - 1 || cur < FOUNDER_STATUS_STEPS[i + 1].key);
    const cls = app.rejected ? "" : cur >= 6 && app.gate && app.gate.decision !== "passed" ? (i < 6 ? "done" : "") : done ? "done" : isCur ? "current" : "";
    return '<span class="ss-step ' + cls + '">' + (cls === "done" ? Icon("check", 11) + " " : "") + s.label + '</span>' +
      (i < FOUNDER_STATUS_STEPS.length - 1 ? '<span class="ss-arrow">' + Icon("chevR", 12) + '</span>' : "");
  }).join("") + '</div>';
}

/* ---------------- DASHBOARD ---------------- */
function founderDashboard() {
  const f = Store.founder();
  const s = Store.myStartup();
  const completion = Store.workspaceCompletion();
  const app = myTopApp();
  const appStatus = founderAppStatus(app);
  const opp = app ? Store.getOpportunity(app.opportunityId) : null;
  const opps = Store.getOpportunities().filter(o => o.status === "published").slice(0, 3);

  const wsFields = WORKSPACE_SECTIONS.map(sec => {
    const ok = sectionOk((f.workspace[sec.key] || "").trim().length);
    return '<div class="row" style="justify-content:space-between;padding:6px 0;border-bottom:1px dashed var(--hairline)">' +
      '<span class="small" style="color:' + (ok ? "var(--ink-2)" : "var(--ink-3)") + '">' + sec.label + '</span>' +
      (ok ? '<span class="badge badge-success" style="padding:2px 8px">' + Icon("check", 11) + '</span>'
          : '<span class="badge badge-neutral" style="padding:2px 8px">' + Icon("alert", 11) + ' pending</span>') +
    '</div>';
  }).join("");

  const readinessDims = [
    { k: "problem", label: "Problem clarity" },
    { k: "market", label: "Market" },
    { k: "solution", label: "Solution" },
    { k: "validation", label: "Validation" },
    { k: "businessModel", label: "Business model" },
    { k: "team", label: "Team" }
  ];
  const fr = (f.workspace.funding && f.workspace.useOfFunds) ? 78 : 42;
  const dimBars = readinessDims.map(d =>
    '<div style="margin-bottom:10px"><div class="row-between"><span class="small semibold">' + d.label + '</span><span class="small mono bold" style="color:var(--accent-deep)">' + s.scoreBreak[d.k] + '</span></div>' +
    bar(s.scoreBreak[d.k], "thin") + '</div>'
  ).join("") +
  '<div style="margin-bottom:6px"><div class="row-between"><span class="small semibold">Funding readiness</span><span class="small mono bold" style="color:var(--accent-deep)">' + fr + '</span></div>' + bar(fr, "thin") + '</div>';

  const oppCards = opps.map(o =>
    '<div class="glass glass-hover" style="padding:15px 16px;border-radius:16px;cursor:pointer" onclick="App.navigate(\'#/founder/opportunity/' + o.id + '\')">' +
      '<div class="row-between" style="margin-bottom:6px"><span class="tag">' + o.category + '</span><span class="tiny faint">' + Icon("clock", 11) + ' ' + o.deadline + '</span></div>' +
      '<div class="semibold" style="font-size:13.5px;line-height:1.35">' + o.title + '</div>' +
      '<div class="tiny faint" style="margin-top:4px">' + o.org + ' · ' + (o.funding || "") + '</div>' +
    '</div>'
  ).join("");

  const appCard = app
    ? '<div class="app-status-row" style="margin-top:12px">' +
        '<div class="asr-main"><div class="semibold" style="font-size:13.5px">' + (opp ? opp.title : "Application") + '</div>' +
        '<div class="tiny faint">' + (opp ? opp.org : "") + ' · Submitted: ' + app.submitted + '</div></div>' +
        '<span class="badge ' + (appStatus.tone === "success" ? "badge-success" : appStatus.tone === "warning" ? "badge-warning" : appStatus.tone === "danger" ? "badge-danger" : "badge-indigo") + '">' + appStatus.label + '</span>' +
      '</div>' +
      (function () {
        const nx = appNextStep(app);
        return nx
          ? '<div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap">' +
              '<div class="small muted" style="flex:1;min-width:180px">' + Icon("arrowR", 13) + ' Next: ' + nx.text + '</div>' +
              (nx.cta ? '<button class="btn btn-soft btn-sm" onclick="App.navigate(\'' + nx.route + '\')">' + nx.cta + '</button>' : '') +
            '</div>'
          : '';
      })() +
      '<button class="btn btn-soft btn-block" style="margin-top:12px" onclick="App.navigate(\'#/founder/applications\')">' + Icon("layers", 15) + 'View Applications</button>'
    : '<p class="muted small" style="margin:10px 0">You have not applied to any opportunity yet. Browse the marketplace and submit your first application.</p>' +
      '<button class="btn btn-primary btn-block" style="margin-top:12px" onclick="App.navigate(\'#/founder/opportunities\')">' + Icon("briefcase", 15) + 'Explore Opportunities</button>';

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">' + greeting() + ', Founder</h1><p class="sub">Build your idea, apply to the right opportunities, and track your applications.</p></div>' +
      '<div class="autosave saved"><span class="as-dot"></span>Workspace synced</div>' +
    '</div>' +

    '<div class="glass-strong card" style="padding:24px;margin-bottom:20px">' +
      '<div class="row-between" style="flex-wrap:wrap;gap:14px">' +
        '<div class="row" style="gap:16px">' + startupLogo(s, 52) +
          '<div><div class="small faint semibold">' + Icon("briefcase", 12) + ' STARTUP</div>' +
          '<div style="font-size:21px;font-weight:800;letter-spacing:-0.02em">' + s.name + '</div>' +
          '<div class="small muted" style="margin-top:2px">' + s.tagline + ' · ' + s.sector + '</div></div>' +
        '</div>' +
        '<div style="text-align:right;max-width:320px">' +
          '<div class="tiny faint semibold" style="letter-spacing:.08em">LATEST APPLICATION</div>' +
          (app
            ? '<div class="semibold" style="font-size:14px;margin-top:3px">' + (opp ? opp.title : "—") + '</div>' +
              '<span class="badge ' + (appStatus.tone === "success" ? "badge-success" : appStatus.tone === "warning" ? "badge-warning" : appStatus.tone === "danger" ? "badge-danger" : "badge-indigo") + '" style="margin-top:6px;font-size:12.5px;padding:6px 13px">' + (appStatus.tone === "success" ? Icon("check", 12) : Icon("clock", 12)) + ' ' + appStatus.label + '</span>' +
              '<div class="tiny faint" style="margin-top:7px">Last update: ' + app.lastUpdate + '</div>'
            : '<div class="muted small" style="margin-top:4px">No applications yet</div>') +
        '</div>' +
      '</div>' +
    '</div>' +

    (!app && completion < 30 ? '<div class="onboard-banner">' +
      '<span class="ob-ic">' + Icon("spark", 22) + '</span>' +
      '<div style="flex:1;min-width:220px"><div class="semibold" style="font-size:16px">Welcome to Venture Connect</div>' +
      '<div class="small muted" style="margin-top:3px">Two quick steps: complete your profile, then start building your idea.</div></div>' +
      '<div class="row" style="flex-wrap:wrap">' +
        '<button class="btn btn-primary" onclick="App.navigate(\'#/founder/workspace\')">' + Icon("edit", 15) + 'Open Idea Workspace</button>' +
        '<button class="btn btn-ghost" onclick="App.navigate(\'#/founder/profile\')">' + Icon("user", 15) + 'Complete Profile</button>' +
      '</div>' +
    '</div>' : '') +

    (app ? '<div class="glass card" style="padding:18px 20px;margin-bottom:20px">' +
      '<div class="row-between" style="margin-bottom:10px"><div class="h3" style="font-size:14.5px"><span class="card-title-ic" style="width:28px;height:28px">' + Icon("layers", 14) + '</span>Application progress</div>' +
      '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/founder/applications\')">View all</button></div>' +
      statusStrip(app) +
    '</div>' : '') +

    '<div class="grid-2">' +

      '<div class="glass card glass-hover">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic">' + Icon("edit", 17) + '</span>Idea Workspace</div>' +
        '<span class="badge badge-indigo">' + completion + '% complete</span></div>' +
        bar(completion) +
        '<div style="margin-top:14px">' + wsFields + '</div>' +
        '<button class="btn btn-primary btn-block" style="margin-top:16px" onclick="App.navigate(\'#/founder/workspace\')">' + Icon("arrowR", 15) + 'Continue Workspace</button>' +
      '</div>' +

      '<div class="glass card glass-hover">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic violet">' + Icon("trending", 17) + '</span>VC Readiness</div>' +
        '<span class="score-chip">' + s.score + '/100</span></div>' +
        '<div class="row" style="gap:20px;align-items:center">' +
          Ring(s.score, 92, "readiness") +
          '<div style="flex:1;min-width:0">' + dimBars + '</div>' +
        '</div>' +
        '<button class="btn btn-soft btn-block" style="margin-top:16px" onclick="App.navigate(\'#/founder/readiness\')">' + Icon("file", 15) + 'View Report</button>' +
      '</div>' +

      '<div class="glass card glass-hover">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic blue">' + Icon("briefcase", 17) + '</span>Opportunities</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/founder/opportunities\')">Browse all</button></div>' +
        '<div class="stack">' + oppCards + '</div>' +
      '</div>' +

      '<div class="glass card glass-hover">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic green">' + Icon("send", 17) + '</span>Applications</div>' +
        (app ? '<span class="badge badge-indigo">' + app.submitted + '</span>' : '<span class="badge badge-neutral">None yet</span>') + '</div>' +
        '<p class="muted small" style="line-height:1.6">Every application is reviewed by Venture Connect before it reaches the investor or incubator. You will always see a clear, simple status.</p>' +
        appCard +
      '</div>' +
    '</div>';

  return html;
}

/* ---------------- IDEA WORKSPACE ---------------- */
let wsActiveSection = "problem";
let wsSaveTimer = null;

function wsSectionNav() {
  const f = Store.founder();
  return WORKSPACE_SECTIONS.map(sec => {
    const ok = sectionOk((f.workspace[sec.key] || "").trim().length);
    const active = sec.key === wsActiveSection;
    return '<button class="nav-item" style="' + (active ? "background:linear-gradient(135deg,rgba(99,102,241,.13),rgba(139,92,246,.1));color:var(--accent-deep);font-weight:650;border-color:rgba(99,102,241,.18)" : "") + 'justify-content:flex-start" onclick="App.wsSelect(\'' + sec.key + '\')">' +
      '<span class="row" style="flex:1;justify-content:space-between"><span class="row" style="gap:9px">' + Icon(ok ? "checkCircle" : "circle", 15) + ' <span>' + sec.label + '</span></span>' +
      (ok ? '<span class="tiny" style="color:var(--success)">done</span>' : '<span class="tiny" style="color:var(--ink-3)">' + (f.workspace[sec.key] ? "draft" : "empty") + '</span>') +
      '</span></button>';
  }).join("");
}

function founderWorkspace() {
  const f = Store.founder();
  const completion = Store.workspaceCompletion();
  const sec = WORKSPACE_SECTIONS.find(x => x.key === wsActiveSection);
  const val = f.workspace[sec.key] || "";

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">Idea Workspace</h1><p class="sub">Answer each section with specifics. Reviewers read every one.</p></div>' +
      '<div class="row">' +
        '<div class="autosave saved" id="ws-autosave"><span class="as-dot"></span>Saved just now</div>' +
        '<button class="btn btn-ghost" onclick="App.wsSave()">' + Icon("download", 15) + 'Save Progress</button>' +
        '<button class="btn btn-primary" onclick="App.navigate(\'#/founder/quality-check\')">' + Icon("scan", 15) + 'Check Readiness</button>' +
      '</div>' +
    '</div>' +

    '<div class="grid-2" style="grid-template-columns:250px 1fr;align-items:start">' +
      '<div class="glass card" style="padding:14px;position:sticky;top:96px">' +
        '<div style="padding:6px 10px 10px"><div class="row-between"><span class="tiny semibold faint">COMPLETION</span><span class="tiny bold" style="color:var(--accent-deep)">' + completion + '%</span></div>' + bar(completion, "thin") + '</div>' +
        '<div class="col" style="gap:3px">' + wsSectionNav() + '</div>' +
      '</div>' +

      '<div class="glass card" style="padding:26px">' +
        '<div class="row-between" style="margin-bottom:4px">' +
          '<span class="tiny semibold faint">SECTION ' + (WORKSPACE_SECTIONS.indexOf(sec) + 1) + ' OF ' + WORKSPACE_SECTIONS.length + '</span>' +
          '<span class="badge ' + (sectionOk(val.trim().length) ? "badge-success" : "badge-neutral") + '">' + (sectionOk(val.trim().length) ? Icon("check", 11) + " Complete" : Icon("clock", 11) + " In progress") + '</span>' +
        '</div>' +
        '<h2 class="h2" style="margin-bottom:6px">' + sec.label + '</h2>' +
        '<p class="muted" style="font-size:14.5px;font-weight:600;margin-bottom:16px">"' + sec.q + '"</p>' +
        '<div class="field">' +
          '<label>' + sec.label + ' <span class="req">*</span></label>' +
          '<textarea class="textarea" id="ws-input" placeholder="Write your answer here — 2–4 sentences with specifics beats a paragraph of generalities." oninput="App.wsInput()" style="min-height:180px">' + escapeHtml(val) + '</textarea>' +
          '<div class="hint">' + Icon("info", 12) + ' ' + sec.hint + '</div>' +
        '</div>' +
        '<div class="row-between" style="margin-top:8px">' +
          '<button class="btn btn-ghost btn-sm" onclick="App.wsSelect(\'' + (WORKSPACE_SECTIONS[Math.max(0, WORKSPACE_SECTIONS.indexOf(sec) - 1)].key) + '\')"' + (WORKSPACE_SECTIONS.indexOf(sec) === 0 ? " disabled" : "") + '>' + Icon("chevL", 14) + 'Previous</button>' +
          '<button class="btn btn-primary btn-sm" onclick="App.wsSelect(\'' + (WORKSPACE_SECTIONS[Math.min(WORKSPACE_SECTIONS.length - 1, WORKSPACE_SECTIONS.indexOf(sec) + 1)].key) + '\')">' + (WORKSPACE_SECTIONS.indexOf(sec) === WORKSPACE_SECTIONS.length - 1 ? "Finish" : "Next") + Icon("chevR", 14) + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  return html;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wsSaveIndicator(state) {
  const el = document.getElementById("ws-autosave");
  if (!el) return;
  if (state === "saving") { el.className = "autosave saving"; el.innerHTML = '<span class="as-dot"></span>Saving...'; }
  else { el.className = "autosave saved"; el.innerHTML = '<span class="as-dot"></span>Saved just now'; }
}

/* ---------------- APPLICATION READINESS CHECK ---------------- */
function checkCard(c, idx) {
  const tone = c.status === "pass" ? "pass" : c.status === "review" ? "review" : c.status === "eligibility" ? "fail" : "warn";
  const ic = c.status === "pass" ? "checkCircle" : c.status === "review" ? "eye" : "alert";
  return '<div class="check-item ' + tone + ' fade-up" style="animation-delay:' + (idx * 40) + 'ms">' +
    '<span class="c-ic">' + Icon(ic, 14) + '</span>' +
    '<div style="flex:1"><div class="c-title">' + c.title +
      (c.section !== "links" && c.section !== "eligibility" ? '<span class="tag">' + c.label + '</span>' : '') +
      '<span class="badge ' + (c.status === "pass" ? "badge-success" : c.status === "review" ? "badge-info" : "badge-warning") + '" style="margin-left:auto">' +
      (c.status === "pass" ? "Pass" : c.status === "review" ? "Manual review" : "Action needed") + '</span></div>' +
      '<div class="c-msg">' + c.msg + '</div>' +
      (c.act ? '<div class="c-act">' + Icon("arrowR", 12) + ' ' + c.act + '</div>' : '') +
    '</div></div>';
}

function founderQualityCheck() {
  const res = Store.runQualityChecks();
  const meta = QC_STATUS_META[res.status] || { tone: "neutral", icon: "info" };
  const allChecks = [...res.rules, ...res.meaning];
  const passed = allChecks.filter(c => c.status === "pass").length;
  const actionNeeded = allChecks.filter(c => c.status !== "pass").length;

  const statusCopy = {
    "Ready to Submit": ["Your application meets Venture Connect's quality standards. Apply to an opportunity.", "success"],
    "Needs Revision": ["Almost there — fix the flagged items below to strengthen your application.", "warning"],
    "Incomplete": ["Most required sections are missing or too short. Complete the Idea Workspace first.", "danger"],
    "Eligibility Mismatch": ["Venture Connect accepts student founders. Complete your profile to continue.", "danger"],
    "Manual Review": ["The checks are green but one area needs a human eye. Venture Connect will review it manually.", "info"]
  }[res.status] || ["", "info"];

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">Application Readiness Check</h1><p class="sub">See how your Idea Workspace measures up before you apply — the same automated standards Venture Connect applies internally.</p></div>' +
      '<div class="row">' +
        '<button class="btn btn-ghost" id="qc-rerun" onclick="App.rerunChecks(this)">' + Icon("refresh", 15) + 'Re-run Checks</button>' +
        '<button class="btn btn-ghost" onclick="App.navigate(\'#/founder/workspace\')">' + Icon("edit", 15) + 'Edit Workspace</button>' +
      '</div>' +
    '</div>' +

    '<div class="status-banner ' + meta.tone + '" style="margin-bottom:18px">' +
      '<span class="sb-ic">' + Icon(meta.icon, 20) + '</span>' +
      '<div style="flex:1"><b>' + res.status + '</b><p>' + statusCopy[0] + '</p></div>' +
      '<div style="text-align:right;flex:none"><div class="semibold" style="font-size:20px">' + passed + '<span class="faint" style="font-size:13px">/' + allChecks.length + '</span></div><div class="tiny faint">checks passed</div></div>' +
    '</div>' +

    '<div class="stack">' +
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic">' + Icon("scan", 17) + '</span>Rule-based checks</div><span class="tag">Completeness &amp; formatting</span></div>' +
        '<div class="col" style="gap:10px">' + (res.rules.map(checkCard).join("") || '<p class="muted small">No rule-based issues found.</p>') + '</div>' +
      '</div>' +
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic violet">' + Icon("target", 17) + '</span>Meaning-based checks</div><span class="tag">Clarity &amp; coherence</span></div>' +
        '<div class="col" style="gap:10px">' + (res.meaning.map(checkCard).join("") || '<p class="muted small">No meaning-based issues found.</p>') + '</div>' +
      '</div>' +

      '<div class="glass card" style="padding:26px;text-align:center">' +
        '<div class="semibold" style="font-size:16px;margin-bottom:6px">' + (res.status === "Ready to Submit" ? "You are ready to apply." : "Keep polishing — then apply.") + '</div>' +
        '<p class="muted small" style="max-width:480px;margin:0 auto 18px">' + (res.status === "Ready to Submit" ? "Find an opportunity that fits your stage and sector, then submit your application. Venture Connect's internal quality control will take it from there." : "Fix the flagged items and re-run the check. Stronger answers mean a stronger application when Venture Connect reviews it.") + '</p>' +
        '<button class="btn btn-primary btn-lg" onclick="App.navigate(\'#/founder/opportunities\')">' + Icon("briefcase", 16) + 'Browse Opportunities to Apply</button>' +
        (actionNeeded > 0 ? '<div class="tiny faint" style="margin-top:10px">' + actionNeeded + ' item(s) need attention before your application is at its strongest</div>' : '') +
      '</div>' +
    '</div>';

  return html;
}

/* ---------------- FOUNDER APPLICATIONS ---------------- */
function founderApplications() {
  const apps = Store.applicationsForStartup(Store.founder().startupId);
  const rows = apps.map(app => {
    const opp = Store.getOpportunity(app.opportunityId);
    const st = founderAppStatus(app);
    return '<div class="app-status-row">' +
      '<div class="asr-main"><div class="semibold" style="font-size:14px">' + (opp ? opp.title : "Opportunity") + '</div>' +
      '<div class="tiny faint">' + (opp ? opp.org : "") + ' · Submitted: ' + app.submitted + ' · Last update ' + app.lastUpdate + '</div></div>' +
      '<span class="badge ' + (st.tone === "success" ? "badge-success" : st.tone === "warning" ? "badge-warning" : st.tone === "danger" ? "badge-danger" : "badge-indigo") + '">' + st.label + '</span>' +
      '<button class="btn btn-soft btn-sm" onclick="App.navigate(\'#/founder/application/' + app.id + '\')">' + Icon("eye", 13) + 'View Status</button>' +
    '</div>';
  }).join("");

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">Applications</h1><p class="sub">Every application you submit is reviewed by Venture Connect before it reaches the investor or incubator.</p></div>' +
      '<button class="btn btn-primary" onclick="App.navigate(\'#/founder/opportunities\')">' + Icon("plus", 15) + 'Apply to an Opportunity</button>' +
    '</div>' +
    (apps.length
      ? '<div class="glass" style="padding:14px 10px"><div class="col" style="gap:10px">' + rows + '</div></div>'
      : emptyState("send", "No applications yet", "Browse opportunities and submit your first application — Venture Connect quality control starts the moment you apply.", '<button class="btn btn-primary" style="margin-top:8px" onclick="App.navigate(\'#/founder/opportunities\')">' + Icon("briefcase", 15) + 'Explore Opportunities</button>'));

  return html;
}

/* ---------------- FOUNDER APPLICATION DETAIL ---------------- */
function founderApplicationDetail(id) {
  const app = Store.getApplication(id);
  if (!app) return errorPage();
  const s = Store.getStartup(app.startupId);
  const opp = Store.getOpportunity(app.opportunityId);
  const st = founderAppStatus(app);
  const stage = INTERNAL_STAGES[app.stage];

  const feedback = [
    app.vcReview && app.vcReview.notes ? ["Venture Connect review", app.vcReview.notes, "violet"] : null,
    app.pitch && app.pitch.notes ? ["Pitch review", app.pitch.notes, "amber"] : null,
    app.interview && app.interview.notes ? ["Founder interview", app.interview.notes, "blue"] : null,
    app.gate && app.gate.notes ? ["Quality gate", app.gate.notes, "green"] : null
  ].filter(Boolean);

  const html =
    '<div class="page-head">' +
      '<div><a href="#/founder/applications" class="small semibold" style="color:var(--accent-deep)">' + Icon("chevL", 13) + ' All applications</a></div>' +
      '<span class="badge ' + (st.tone === "success" ? "badge-success" : st.tone === "warning" ? "badge-warning" : st.tone === "danger" ? "badge-danger" : "badge-indigo") + '" style="font-size:12.5px;padding:7px 14px">' + st.label + '</span>' +
    '</div>' +

    '<div class="glass-strong card" style="padding:24px;margin-bottom:18px">' +
      '<div class="row-between" style="flex-wrap:wrap;gap:14px">' +
        '<div class="row" style="gap:15px">' + startupLogo(s, 48) +
          '<div><div style="font-size:18px;font-weight:800">' + (opp ? opp.title : "Application") + '</div>' +
          '<div class="small muted" style="margin-top:3px">' + (opp ? opp.org : "") + ' · ' + s.name + ' · ' + s.sector + '</div>' +
          '<div class="small muted">Submitted: ' + app.submitted + ' · Last update ' + app.lastUpdate + '</div></div>' +
        '</div>' +
        '<div style="text-align:right"><div class="tiny faint semibold" style="letter-spacing:.08em">CURRENT STAGE</div>' +
        '<div class="semibold" style="font-size:16px;color:var(--accent-deep)">' + stage.name + '</div>' +
        '<div class="tiny faint" style="margin-top:2px">Stage ' + (app.stage + 1) + ' of ' + INTERNAL_STAGES.length + '</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="glass card" style="padding:18px 20px;margin-bottom:18px">' +
      '<div class="h3" style="font-size:14px;margin-bottom:10px"><span class="card-title-ic" style="width:28px;height:28px">' + Icon("layers", 14) + '</span>Application progress</div>' +
      statusStrip(app) +
    '</div>' +

    '<div class="grid-2" style="align-items:start">' +
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic violet">' + Icon("shield", 17) + '</span>What happens next</div></div>' +
        '<p class="muted small" style="line-height:1.7">' + (function () {
          const nx = appNextStep(app);
          return nx ? nx.text : stage.desc;
        })() + '</p>' +
        '<p class="muted small" style="line-height:1.7;margin-top:10px">Venture Connect conducts the quality process internally — you will see a clear status at every step, and the relevant investor or incubator only sees your application after it passes.</p>' +
        (function () {
          const nx = appNextStep(app);
          return nx && nx.cta
            ? '<div class="row" style="margin-top:16px"><button class="btn btn-primary" onclick="App.navigate(\'' + nx.route + '\')">' + nx.cta + '</button></div>'
            : '<div class="row" style="margin-top:16px">';
        })() +
          (opp ? '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/founder/opportunity/' + opp.id + '\')">' + Icon("eye", 13) + 'View Opportunity</button>' : '') +
          '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/founder/workspace\')">' + Icon("edit", 13) + 'Edit Workspace</button>' +
        '</div>' +
      '</div>' +
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic amber">' + Icon("message", 17) + '</span>Reviewer feedback</div></div>' +
        (feedback.length
          ? '<div class="col" style="gap:11px">' + feedback.map(fb =>
              '<div style="padding:13px 15px;border-left:3px solid var(--' + (fb[2] === "green" ? "success" : fb[2]) + ');border-radius:0 13px 13px 0;background:rgba(255,255,255,.55)">' +
                '<div class="small semibold" style="color:var(--' + (fb[2] === "green" ? "success" : fb[2]) + ')">' + fb[0] + '</div>' +
                '<div class="small muted" style="margin-top:3px">' + fb[1] + '</div></div>'
            ).join("") + '</div>'
          : '<p class="muted small">No feedback yet. It will appear here as Venture Connect progresses through its review.</p>') +
      '</div>' +
    '</div>';

  return html;
}
