/* ============================================================
   VENTURE CONNECT — Internal Review System
   The Quality Gate lives here. Professional review/control UI.
   ============================================================ */

let intFilter = "all";

function internalStageBadge(app) {
  const st = INTERNAL_STAGES[app.stage];
  if (app.rejected) return '<span class="badge badge-danger">' + Icon("x", 11) + ' Rejected</span>';
  if (app.gate && app.gate.decision === "passed" && app.stage >= 7) return '<span class="badge badge-success">' + Icon("shield", 11) + ' Gate Passed · Unlocked</span>';
  if (app.needsRevision) return '<span class="badge badge-warning">' + Icon("alert", 11) + ' ' + st.name + ' · Revision</span>';
  return '<span class="badge badge-indigo">' + Icon("clock", 11) + ' ' + st.name + '</span>';
}

/* ---------------- DASHBOARD ---------------- */
function internalDashboard() {
  const apps = Store.getApplications();
  const inReview = apps.filter(a => !a.rejected && !(a.gate && a.gate.decision === "passed"));
  const pitchPending = apps.filter(a => a.stage === 3 && !a.rejected);
  const interviews = apps.filter(a => a.stage === 4 && a.interview.scheduled && !a.rejected);
  const gated = apps.filter(a => a.gate && a.gate.decision === "passed");

  const stats = [
    { label: "Applications in review", val: inReview.length, icon: "layers", tone: "" },
    { label: "Awaiting pitch review", val: pitchPending.length, icon: "present", tone: "violet" },
    { label: "Interviews scheduled", val: interviews.length, icon: "calendar", tone: "blue" },
    { label: "Gate passed (cycle)", val: gated.length, icon: "trophy", tone: "green" }
  ];

  const inReviewRows = inReview.slice(0, 4).map(app => appRow(app)).join("");
  const gatedRows = gated.slice(0, 3).map(app => {
    const s = Store.getStartup(app.startupId);
    const o = Store.getOpportunity(app.opportunityId);
    return '<div class="list-row">' +
      startupLogo(s, 34) +
      '<div class="lr-main"><div class="semibold" style="font-size:13.5px">' + s.name + '</div><div class="tiny faint">' + (o ? o.title : "") + ' · gated ' + app.gate.decidedAt + '</div></div>' +
      '<span class="badge badge-success">' + Icon("shield", 11) + ' PASSED</span>' +
      '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/internal/application/' + app.id + '\')">' + Icon("eye", 13) + 'Open</button>' +
    '</div>';
  }).join("");

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">Review Dashboard</h1><p class="sub">Internal quality control. Every application is screened, reviewed, and verified before it reaches investors and incubators.</p></div>' +
      '<span class="badge badge-indigo" style="font-size:12px;padding:7px 14px">' + Icon("shield", 13) + ' Quality Gate — Internal System</span>' +
    '</div>' +

    '<div class="stats" style="margin-bottom:20px">' + stats.map(st =>
      '<div class="glass glass-hover stat"><span class="s-label"><span class="card-title-ic ' + st.tone + '" style="width:26px;height:26px">' + Icon(st.icon, 13) + '</span>' + st.label + '</span><div class="s-val">' + st.val + '</div></div>'
    ).join("") + '</div>' +

    '<div class="grid-2" style="align-items:start">' +
      '<div class="solid-panel card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic">' + Icon("layers", 17) + '</span>In review now</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="App.navigate(\'#/internal/applications\')">All applications</button></div>' +
        (inReviewRows || '<p class="muted small">No applications in review.</p>') +
      '</div>' +
      '<div class="solid-panel card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic green">' + Icon("trophy", 17) + '</span>Recently gated</div></div>' +
        (gatedRows || '<p class="muted small">No applications passed the gate yet.</p>') +
      '</div>' +
    '</div>';

  return html;
}

function appRow(app) {
  const s = Store.getStartup(app.startupId);
  const o = Store.getOpportunity(app.opportunityId);
  return '<div class="list-row">' +
    startupLogo(s, 34) +
    '<div class="lr-main"><div class="semibold" style="font-size:13.5px">' + s.name + ' <span class="faint" style="font-weight:500">· ' + s.founder.name + '</span></div>' +
    '<div class="tiny faint">' + (o ? o.title + ' · ' + o.org : "") + '</div></div>' +
    internalStageBadge(app) +
    '<button class="btn btn-soft btn-sm" onclick="App.navigate(\'#/internal/application/' + app.id + '\')">' + Icon("eye", 13) + 'Review</button>' +
  '</div>';
}

/* ---------------- APPLICATIONS LIST ---------------- */
function internalApplications() {
  let apps = Store.getApplications();
  const chips = [
    ["all", "All (" + apps.length + ")"],
    ["review", "In review (" + apps.filter(a => !a.rejected && !(a.gate && a.gate.decision === "passed")).length + ")"],
    ["passed", "Gate passed (" + apps.filter(a => a.gate && a.gate.decision === "passed").length + ")"],
    ["revision", "Needs revision (" + apps.filter(a => a.needsRevision && !a.rejected).length + ")"]
  ];
  if (intFilter === "review") apps = apps.filter(a => !a.rejected && !(a.gate && a.gate.decision === "passed"));
  if (intFilter === "passed") apps = apps.filter(a => a.gate && a.gate.decision === "passed");
  if (intFilter === "revision") apps = apps.filter(a => a.needsRevision && !a.rejected);

  const html =
    '<div class="page-head">' +
      '<div><h1 class="h1">Applications</h1><p class="sub">All applications in the Venture Connect quality pipeline.</p></div>' +
    '</div>' +
    '<div class="row-wrap" style="margin-bottom:18px">' + chips.map(c =>
      '<button class="chip' + (intFilter === c[0] ? " active" : "") + '" onclick="App.intFilter(\'' + c[0] + '\')">' + c[1] + '</button>'
    ).join("") + '</div>' +

    (apps.length
      ? '<div class="glass" style="padding:12px 8px"><div class="col" style="gap:10px">' + apps.map(appRow).join("") + '</div></div>'
      : emptyState("layers", "No applications", "Applications submitted by founders will appear here once Venture Connect quality control begins."));

  return html;
}

/* ---------------- APPLICATION REVIEW PAGE ---------------- */
function internalApplicationReview(id) {
  const app = Store.getApplication(id);
  if (!app) return errorPage();
  const s = Store.getStartup(app.startupId);
  const opp = Store.getOpportunity(app.opportunityId);
  const appStatus = founderAppStatus(app);
  const stage = INTERNAL_STAGES[app.stage];

  // stage rail
  const rail = INTERNAL_STAGES.map((g, i) => {
    const st = i < app.stage ? "done" : i === app.stage ? "current" : "pending";
    const flag = i < app.stage ? '<span class="badge badge-success g-flag">' + Icon("check", 10) + '</span>'
      : i === app.stage ? '<span class="badge badge-indigo g-flag">' + Icon("clock", 10) + ' NOW</span>' : "";
    return '<div class="gate-step ' + st + '" style="min-width:150px">' +
      '<div class="g-ic">' + (i < app.stage ? Icon("check", 18) : Icon(g.icon, 18)) + '</div>' +
      '<div class="g-num">STAGE ' + (i + 1) + '</div><div class="g-name">' + g.name + '</div><div class="g-sub">' + g.group + '</div>' + flag + '</div>';
  }).join("");

  // automated checks
  const checksRes = Store.runQualityChecks(workspaceLike(s));
  const checksRan = app.autoCheck && app.autoCheck.ranAt;
  const checksBanner = checksRan
    ? '<div class="status-banner ' + QC_STATUS_META[checksRes.status].tone + '" style="margin-bottom:14px"><span class="sb-ic">' + Icon(QC_STATUS_META[checksRes.status].icon, 20) + '</span><div><b>' + checksRes.status + '</b><p>Recorded ' + app.autoCheck.ranAt + '</p></div></div>'
    : '<div class="status-banner info" style="margin-bottom:14px"><span class="sb-ic">' + Icon("scan", 20) + '</span><div><b>Automated checks pending</b><p>Run the rule-based and meaning-based checks to begin quality control.</p></div></div>';

  // VC review
  const vc = app.vcReview;
  const vcBadge = vc.decision ? '<span class="badge ' + (vc.decision === "approved" ? "badge-success" : vc.decision === "rejected" ? "badge-danger" : vc.decision === "manual" ? "badge-info" : "badge-warning") + '">' + (vc.decision === "approved" ? Icon("check", 11) + " Approved" : vc.decision === "rejected" ? Icon("x", 11) + " Rejected" : vc.decision === "manual" ? Icon("users", 11) + " Manual review" : Icon("refresh", 11) + " Revision requested") + '</span>' : '<span class="badge badge-neutral">Pending</span>';

  // pitch scores
  const pitchRows = [
    ["quality", "Pitch quality"], ["problem", "Problem clarity"], ["solution", "Solution clarity"],
    ["market", "Market understanding"], ["communication", "Founder communication"],
    ["businessModel", "Business model"], ["evidence", "Evidence"]
  ].map(d =>
    '<div class="score-row"><span class="small semibold" style="flex:1">' + d[1] + '</span>' +
    '<input class="input score-in" id="pitch-' + d[0] + '" type="number" min="0" max="100" placeholder="—" value="' + (app.pitch.scores[d[0]] || "") + '" /></div>'
  ).join("");

  // interview
  const intv = app.interview;

  // evidence
  const evRows = (s.evidence || []).map((e, i) =>
    '<div style="padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.55);border:1px solid var(--hairline);margin-bottom:10px">' +
      '<div class="row-between" style="flex-wrap:wrap;gap:8px;margin-bottom:8px">' +
        '<div class="row" style="gap:10px"><span class="card-title-ic ' + (e.status === "Verified" ? "green" : e.status === "Needs clarification" ? "amber" : "blue") + '" style="width:30px;height:30px">' + Icon(e.status === "Verified" ? "verify" : e.status === "Needs clarification" ? "alert" : "clock", 14) + '</span>' +
        '<div><div class="semibold small">' + e.type + '</div><div class="tiny faint">' + e.description + '</div></div></div>' +
        '<select class="select" style="width:190px" id="ev-' + i + '-status">' +
          '<option value="Verified"' + ((((app.evidenceStatus && app.evidenceStatus[e.type]) || e.status) === "Verified") ? " selected" : "") + '>Verified</option>' +
          '<option value="Needs clarification"' + ((((app.evidenceStatus && app.evidenceStatus[e.type]) || e.status) === "Needs clarification") ? " selected" : "") + '>Needs clarification</option>' +
          '<option value="Under review"' + ((((app.evidenceStatus && app.evidenceStatus[e.type]) || e.status) === "Under review") ? " selected" : "") + '>Under review</option>' +
        '</select>' +
      '</div>' +
      '<input class="input" id="ev-' + i + '-notes" placeholder="Reviewer notes for this evidence item" value="' + escapeHtml(app.evidenceNotes[e.type] || e.notes || "") + '" />' +
    '</div>'
  ).join("");

  // gate panel
  const gate = app.gate;
  const gateTone = gate.decision === "passed" ? "success" : gate.decision === "not-passed" ? "danger" : "warning";

  const html =
    '<div class="page-head">' +
      '<div><a href="#/internal/applications" class="small semibold" style="color:var(--accent-deep)">' + Icon("chevL", 13) + ' All applications</a></div>' +
      '<span class="badge badge-indigo">' + Icon("shield", 12) + ' Internal Quality Control</span>' +
    '</div>' +

    '<div class="glass-strong card" style="padding:24px;margin-bottom:18px">' +
      '<div class="row-between" style="flex-wrap:wrap;gap:14px">' +
        '<div class="row" style="gap:15px">' + startupLogo(s, 50) +
          '<div><div class="row" style="gap:9px"><span style="font-size:19px;font-weight:800">' + s.name + '</span>' + internalStageBadge(app) + '</div>' +
          '<div class="small muted" style="margin-top:3px">Founder: <b>' + s.founder.name + '</b> · ' + s.founder.college + '</div>' +
          '<div class="small muted">Applying to: <b style="color:var(--ink)">' + (opp ? opp.title : "—") + '</b> · ' + (opp ? opp.org : "") + '</div></div>' +
        '</div>' +
        '<div style="text-align:right"><div class="tiny faint semibold" style="letter-spacing:.08em">CURRENT STAGE</div>' +
        '<div class="semibold" style="font-size:17px;color:var(--accent-deep)">' + stage.name + '</div>' +
        '<div class="tiny faint" style="margin-top:2px">Submitted ' + app.submitted + ' · Stage ' + (app.stage + 1) + '/' + INTERNAL_STAGES.length + '</div>' +
        '<div class="tiny faint">Founder status: <b style="color:var(--ink)">' + appStatus.label + '</b></div></div>' +
      '</div>' +
    '</div>' +

    '<div class="gate-timeline" style="margin-bottom:20px">' + rail + '</div>' +

    '<div class="stack">' +

      /* --- Automated Quality Checks --- */
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic">' + Icon("scan", 17) + '</span>Automated Quality Checks</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="App.intRunChecks(\'' + app.id + '\')">' + Icon("refresh", 13) + 'Re-run Checks</button></div>' +
        checksBanner +
        '<div class="col" style="gap:9px;margin-bottom:14px">' + [...checksRes.rules, ...checksRes.meaning].map(checkCard).join("") + '</div>' +
        '<div class="row">' +
          '<button class="btn btn-primary" onclick="App.intChecksApprove(\'' + app.id + '\')"' + (app.stage > 1 ? " disabled" : "") + '>' + Icon("arrowR", 14) + 'Approve checks &amp; continue</button>' +
          (checksRan ? '<span class="tag">' + Icon("check", 11) + ' Recorded ' + app.autoCheck.ranAt + '</span>' : '') +
        '</div>' +
      '</div>' +

      /* --- Venture Connect Review --- */
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic violet">' + Icon("shield", 17) + '</span>Venture Connect Review</div>' + vcBadge + '</div>' +
        '<p class="muted small" style="margin-bottom:12px">Assess the application on its own merit — problem, market, model, and evidence coherence. This is the first human checkpoint.</p>' +
        '<div class="field"><label>Reviewer notes</label><textarea class="textarea" id="vc-notes" placeholder="Notes for the founder and the review record…" style="min-height:90px">' + escapeHtml(vc.notes || "") + '</textarea></div>' +
        (vc.reviewedAt ? '<div class="tiny faint" style="margin-bottom:10px">Reviewed ' + vc.reviewedAt + '</div>' : '') +
        '<div class="row-wrap">' +
          '<button class="btn btn-success" onclick="App.intVcDecision(\'' + app.id + '\', \'approved\')"' + (app.stage > 2 || app.rejected ? " disabled" : "") + '>' + Icon("checkCircle", 14) + 'Approve for next stage</button>' +
          '<button class="btn btn-ghost" onclick="App.intVcDecision(\'' + app.id + '\', \'revision\')"' + (app.rejected ? " disabled" : "") + '>' + Icon("refresh", 14) + 'Request Revision</button>' +
          '<button class="btn btn-danger" onclick="App.intVcDecision(\'' + app.id + '\', \'reject\')"' + (app.rejected ? " disabled" : "") + '>' + Icon("x", 14) + 'Reject</button>' +
          '<button class="btn btn-soft" onclick="App.intVcDecision(\'' + app.id + '\', \'manual\')"' + (app.rejected ? " disabled" : "") + '>' + Icon("users", 14) + 'Manual Review</button>' +
        '</div>' +
      '</div>' +

      /* --- Pitch Review --- */
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic amber">' + Icon("present", 17) + '</span>Pitch Review</div>' +
        (app.pitch.decision ? '<span class="badge badge-success">' + Icon("check", 11) + ' Passed</span>' : '<span class="badge badge-neutral">Pending</span>') + '</div>' +
        '<p class="muted small" style="margin-bottom:12px">Score each dimension 0–100. The average informs the final Quality Gate assessment.</p>' +
        '<div class="col" style="gap:8px;margin-bottom:12px">' + pitchRows + '</div>' +
        '<div class="field"><label>Pitch reviewer notes</label><textarea class="textarea" id="pitch-notes" placeholder="Feedback shared with the founder…" style="min-height:80px">' + escapeHtml(app.pitch.notes || "") + '</textarea></div>' +
        '<div class="row-wrap">' +
          '<button class="btn btn-success" onclick="App.intPitchSave(\'' + app.id + '\', \'pass\')"' + (app.stage > 3 || app.rejected ? " disabled" : "") + '>' + Icon("checkCircle", 14) + 'Pass</button>' +
          '<button class="btn btn-ghost" onclick="App.intPitchSave(\'' + app.id + '\', \'revision\')"' + (app.rejected ? " disabled" : "") + '>' + Icon("refresh", 14) + 'Request Revision</button>' +
        '</div>' +
      '</div>' +

      /* --- Founder Interview --- */
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic blue">' + Icon("users", 17) + '</span>Founder Interview</div>' +
        (intv.completed ? '<span class="badge badge-success">' + Icon("check", 11) + ' Completed</span>' : intv.scheduled ? '<span class="badge badge-indigo">' + Icon("calendar", 11) + ' Scheduled</span>' : '<span class="badge badge-neutral">Not scheduled</span>') + '</div>' +
        '<div class="form-grid" style="margin-bottom:12px">' +
          '<div class="field"><label>Interview time</label><input class="input" id="intv-time" placeholder="e.g. Sep 4, 2026 · 10:00 AM" value="' + escapeHtml(intv.scheduled || "") + '" /></div>' +
          '<div class="field"><label>Decision</label><select class="select" id="intv-decision">' +
            '<option value="">— select —</option>' +
            '<option value="pass"' + (intv.decision === "pass" ? " selected" : "") + '>Pass — advance to validation</option>' +
            '<option value="revision"' + (intv.decision === "revision" ? " selected" : "") + '>Request revision</option>' +
            '<option value="reject"' + (intv.decision === "reject" ? " selected" : "") + '>Reject</option>' +
          '</select></div>' +
        '</div>' +
        '<div class="field"><label>Interview notes</label><textarea class="textarea" id="intv-notes" placeholder="Reviewer notes after the interview…" style="min-height:80px">' + escapeHtml(intv.notes || "") + '</textarea></div>' +
        '<div class="row-wrap">' +
          '<button class="btn btn-primary" onclick="App.intInterviewSave(\'' + app.id + '\')">' + Icon("checkCircle", 14) + 'Save interview record</button>' +
          (intv.completed ? '<span class="tag">' + Icon("check", 11) + ' Recorded</span>' : '') +
        '</div>' +
      '</div>' +

      /* --- Evidence / Validation Verification --- */
      '<div class="glass card">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic green">' + Icon("verify", 17) + '</span>Evidence / Validation Verification</div>' +
        '<span class="tag">' + (s.evidence || []).length + ' evidence items</span></div>' +
        '<p class="muted small" style="margin-bottom:12px">Verify each evidence item submitted by the founder. Everything must be verified before the gate decision.</p>' +
        (evRows || '<p class="muted small">No evidence submitted.</p>') +
        '<div class="row" style="margin-top:14px">' +
          '<button class="btn btn-primary" onclick="App.intEvidenceSave(\'' + app.id + '\')">' + Icon("check", 14) + 'Save verification statuses</button>' +
          '<button class="btn btn-success" onclick="App.intEvidenceApprove(\'' + app.id + '\')"' + (app.stage > 5 || app.rejected ? " disabled" : "") + '>' + Icon("arrowR", 14) + 'Approve verification &amp; continue</button>' +
        '</div>' +
      '</div>' +

      /* --- Final Quality Gate --- */
      '<div class="glass card" style="padding:26px;border:1px solid ' + (gate.decision === "passed" ? "rgba(14,164,114,.4)" : gate.decision === "not-passed" ? "rgba(225,29,72,.35)" : "rgba(99,102,241,.3)") + '">' +
        '<div class="card-header"><div class="h3"><span class="card-title-ic">' + Icon("trophy", 17) + '</span>Final Quality Gate</div>' +
        (gate.decision === "passed" ? '<span class="badge badge-success" style="font-size:13px;padding:7px 14px">' + Icon("shield", 13) + ' QUALITY GATE PASSED</span>'
          : gate.decision === "not-passed" ? '<span class="badge badge-danger" style="font-size:13px;padding:7px 14px">' + Icon("x", 13) + ' QUALITY GATE NOT PASSED</span>'
          : '<span class="badge badge-warning" style="font-size:13px;padding:7px 14px">' + Icon("clock", 13) + ' DECISION PENDING</span>') + '</div>' +
        '<p class="muted small" style="margin-bottom:14px">The gate is the trust layer. Only applications that pass become eligible for the relevant investor or incubator to review. No raw applications ever reach investors.</p>' +
        '<div class="field"><label>Gate notes</label><textarea class="textarea" id="gate-notes" placeholder="Decision rationale…" style="min-height:80px">' + escapeHtml(gate.notes || "") + '</textarea></div>' +
        (gate.decidedAt ? '<div class="tiny faint" style="margin-bottom:10px">Decided ' + gate.decidedAt + '</div>' : '') +
        '<div class="row-wrap" style="margin-bottom:14px">' +
          '<button class="btn btn-success btn-lg" onclick="App.intGateDecision(\'' + app.id + '\', true)">' + Icon("shield", 16) + 'Quality Gate Passed</button>' +
          '<button class="btn btn-danger btn-lg" onclick="App.intGateDecision(\'' + app.id + '\', false)">' + Icon("x", 16) + 'Quality Gate Not Passed</button>' +
        '</div>' +
        (app.stage >= 7
          ? '<div class="status-banner success"><span class="sb-ic">' + Icon("eye", 20) + '</span><div><b>Unlocked for investor / incubator review</b><p>This application is now visible to ' + (opp ? opp.org : "the relevant investor") + '.</p></div></div>'
          : gate.decision === "passed"
            ? '<button class="btn btn-primary btn-lg btn-block" onclick="App.intUnlock(\'' + app.id + '\')">' + Icon("eye", 16) + 'Unlock for Investor / Incubator Review</button>'
            : '<p class="tiny faint">' + Icon("lock", 11) + ' The application stays confidential until the gate is passed and unlocked.</p>') +
      '</div>' +
    '</div>';

  return html;
}

/* Build a workspace-like object from a startup for the check engine */
function workspaceLike(s) {
  return {
    problem: s.problem, solution: s.solution, targetCustomer: s.targetCustomer,
    market: s.market, businessModel: s.businessModel, validation: s.validation,
    competition: s.competition, advantage: s.advantage, funding: s.fundingAsk, useOfFunds: s.useOfFunds
  };
}
