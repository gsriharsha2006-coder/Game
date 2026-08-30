/* ============================================================
   VENTURE CONNECT — Authentication & Onboarding
   Entry screen · partner modal · login · 4 signup flows
   ============================================================ */

let authStep = 0;
let authRole = null;
let authDraft = {};
let authPartner = null;

/* ---------------- ENTRY SCREEN (#/auth) ---------------- */
function renderAuth() {
  const html =
    '<nav class="land-nav">' +
      '<a href="#/" class="vc-logo lg-nav" title="Venture Connect"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></a>' +
      '<a href="#/auth/login" class="btn btn-ghost btn-sm" style="margin-left:auto">' + Icon("user", 14) + 'Log In</a>' +
    '</nav>' +

    '<div class="auth-wrap">' +
      '<div style="text-align:center;max-width:620px;margin:0 auto 44px">' +
        '<span class="vc-logo lg-hero" style="justify-content:center;margin-bottom:20px"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></span>' +
        '<h1 class="auth-h1">Welcome to Venture Connect</h1>' +
        '<p class="muted" style="font-size:16.5px;margin-top:12px;line-height:1.6">Build ventures. Discover opportunities. Connect with the right ecosystem.</p>' +
      '</div>' +

      '<div class="grid-2 auth-cards">' +
        '<div class="glass glass-hover auth-card">' +
          '<div class="ac-ic violet">' + Icon("spark", 26) + '</div>' +
          '<h2 class="h2">Founder</h2>' +
          '<p class="muted small" style="line-height:1.65;margin:8px 0 18px">Build your startup, discover opportunities, and apply to programs and funding opportunities.</p>' +
          '<div class="row-wrap" style="margin-bottom:18px">' +
            '<span class="tag">Idea Workspace</span><span class="tag">Opportunities</span><span class="tag">Applications</span><span class="tag">VC Readiness</span>' +
          '</div>' +
          '<button class="btn btn-primary btn-lg btn-block" onclick="App.authSignup(\'founder\')">' + Icon("arrowR", 16) + 'Continue as Founder</button>' +
        '</div>' +
        '<div class="glass glass-hover auth-card">' +
          '<div class="ac-ic indigo">' + Icon("eye", 26) + '</div>' +
          '<h2 class="h2">Investor / Ecosystem</h2>' +
          '<p class="muted small" style="line-height:1.65;margin:8px 0 18px">Discover qualified startups, create opportunities, and connect with founders.</p>' +
          '<div class="row-wrap" style="margin-bottom:18px">' +
            '<span class="tag">Discover</span><span class="tag">Opportunities</span><span class="tag">Applications</span><span class="tag">Messaging</span>' +
          '</div>' +
          '<button class="btn btn-soft btn-lg btn-block" onclick="App.authPartnerModal()">' + Icon("arrowR", 16) + 'Continue as Investor / Ecosystem</button>' +
        '</div>' +
      '</div>' +

      '<div style="text-align:center;margin-top:38px">' +
        '<div class="small muted" style="margin-bottom:12px">Have an account? <a href="#/auth/login" class="semibold" style="color:var(--accent-deep)">Log in</a></div>' +
        '<div class="small faint" style="margin-bottom:10px">Or explore with a demo account</div>' +
        '<div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap">' +
          '<button class="chip" onclick="App.loginAs(\'aarav@example.com\')">' + Icon("spark", 12) + ' Demo Founder</button>' +
          '<button class="chip" onclick="App.loginAs(\'nikhil@meridian.example\')">' + Icon("trending", 12) + ' Demo Investor</button>' +
          '<button class="chip" onclick="App.loginAs(\'hello@exampleincubator.io\')">' + Icon("layers", 12) + ' Demo Incubator</button>' +
          '<button class="chip" onclick="App.loginAs(\'events@hackvalley.dev\')">' + Icon("calendar", 12) + ' Demo Organizer</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
}

/* ---------------- ECOSYSTEM PARTNER MODAL ---------------- */
function authPartnerModal() {
  authPartner = null;
  openModal(
    '<div class="modal-head"><h3 class="h3">What type of ecosystem partner are you?</h3><button class="modal-close" onclick="closeModal()">' + Icon("x", 15) + '</button></div>' +
    '<p class="muted small" style="margin-bottom:16px">Your role shapes your onboarding and dashboard experience.</p>' +
    '<div class="col" style="gap:10px">' +
      partnerOption("investor", "trending", "Investor", "Discover and invest in promising startups.") +
      partnerOption("incubator", "layers", "Incubator", "Support, mentor, and build early-stage startups.") +
      partnerOption("organizer", "calendar", "Hackathon Organizer", "Create and publish hackathons and startup opportunities.") +
    '</div>' +
    '<button class="btn btn-primary btn-lg btn-block" id="partner-continue" style="margin-top:18px" disabled onclick="App.authPartnerContinue()">' + Icon("arrowR", 16) + 'Continue</button>'
  );
}

function partnerOption(key, icon, title, desc) {
  return '<div class="partner-opt" id="po-' + key + '" onclick="App.authSelectPartner(\'' + key + '\')">' +
    '<span class="po-ic">' + Icon(icon, 18) + '</span>' +
    '<div style="flex:1"><div class="semibold" style="font-size:14.5px">' + title + '</div><div class="small muted" style="margin-top:2px">' + desc + '</div></div>' +
    '<span class="po-check">' + Icon("check", 13) + '</span>' +
  '</div>';
}

/* ---------------- LOGIN (#/auth/login) ---------------- */
function renderLogin() {
  const html =
    '<nav class="land-nav">' +
      '<a href="#/" class="vc-logo lg-nav" title="Venture Connect"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></a>' +
      '<a href="#/auth" class="btn btn-ghost btn-sm" style="margin-left:auto">' + Icon("chevL", 13) + 'Back</a>' +
    '</nav>' +

    '<div class="auth-wrap" style="padding-top:60px">' +
      '<div class="glass-strong card auth-form">' +
        '<div style="text-align:center;margin-bottom:24px">' +
          '<span class="vc-logo lg-auth" style="justify-content:center;margin-bottom:16px"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></span>' +
          '<h1 class="h2">Welcome Back</h1>' +
          '<p class="small muted" style="margin-top:4px">Sign in to continue your Venture Connect journey.</p>' +
        '</div>' +
        '<div class="field"><label>Email</label><input class="input" id="li-email" type="email" placeholder="you@example.com" /></div>' +
        '<div class="field"><label>Password</label><input class="input" id="li-pass" type="password" placeholder="••••••••" onkeydown="if(event.key===\'Enter\')App.loginSubmit()" /></div>' +
        '<div class="row-between" style="margin-bottom:16px">' +
          '<button class="btn btn-ghost btn-sm" onclick="App.authForgot()">Forgot password?</button>' +
        '</div>' +
        '<button class="btn btn-primary btn-lg btn-block" onclick="App.loginSubmit()">' + Icon("arrowR", 16) + 'Log In</button>' +
        '<div class="divider"></div>' +
        '<div class="small muted semibold" style="text-align:center;margin-bottom:10px">Continue as</div>' +
        '<div class="grid-2" style="gap:10px">' +
          '<button class="btn btn-ghost" onclick="App.authSignup(\'founder\')">' + Icon("spark", 14) + 'Founder</button>' +
          '<button class="btn btn-ghost" onclick="App.authPartnerModal()">' + Icon("eye", 14) + 'Investor / Ecosystem</button>' +
        '</div>' +
        '<div class="divider"></div>' +
        '<div class="small faint" style="text-align:center;margin-bottom:10px">Quick demo access</div>' +
        '<div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap">' +
          '<button class="chip" onclick="App.loginAs(\'aarav@example.com\')">Founder</button>' +
          '<button class="chip" onclick="App.loginAs(\'nikhil@meridian.example\')">Investor</button>' +
          '<button class="chip" onclick="App.loginAs(\'hello@exampleincubator.io\')">Incubator</button>' +
          '<button class="chip" onclick="App.loginAs(\'events@hackvalley.dev\')">Organizer</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
}

/* ---------------- SIGNUP FLOWS ---------------- */
const AUTH_FLOWS = {
  founder: {
    title: "Create your Founder Profile",
    icon: "spark",
    steps: [
      { name: "Account", fields: [
        { key: "fullName", label: "Full Name", type: "text", req: true, ph: "e.g. Aarav Mehta" },
        { key: "email", label: "Email", type: "email", req: true, ph: "you@example.com" },
        { key: "phone", label: "Phone Number", type: "tel", ph: "+91 …" },
        { key: "password", label: "Password", type: "password", req: true, ph: "Min. 6 characters" },
        { key: "confirm", label: "Confirm Password", type: "password", req: true, ph: "Repeat your password" }
      ]},
      { name: "Education", fields: [
        { key: "college", label: "College / University", type: "text", req: true, ph: "e.g. IIT Bombay" },
        { key: "degree", label: "Degree", type: "text", ph: "e.g. B.Tech" },
        { key: "branch", label: "Branch / Department", type: "text", ph: "e.g. Mechanical Engineering" },
        { key: "gradYear", label: "Graduation Year", type: "text", ph: "e.g. 2027" }
      ]},
      { name: "Founder Info", fields: [
        { key: "founderType", label: "Founder Type", type: "select", req: true, options: FOUNDER_TYPES },
        { key: "startupName", label: "Startup / Idea Name", type: "text", req: true, ph: "e.g. EcoHarvest" },
        { key: "description", label: "Short Startup Description", type: "textarea", req: true, ph: "What are you building, in one or two sentences?" },
        { key: "industry", label: "Industry / Domain", type: "chips-single", req: true, options: INDUSTRIES }
      ]},
      { name: "Startup Profile", fields: [
        { key: "stage", label: "Startup Stage", type: "chips-single", req: true, options: STARTUP_STAGES },
        { key: "bio", label: "Short Bio", type: "textarea", ph: "Who you are and why you are building this." },
        { key: "skills", label: "Skills", type: "text", ph: "Comma separated, e.g. Product, ML, Hardware" },
        { key: "teamSize", label: "Team Size", type: "select", options: ["Just me", "2", "3", "4", "5+"] },
        { key: "location", label: "Location", type: "text", ph: "e.g. Mumbai, India" }
      ]},
      { name: "Complete", fields: [
        { key: "linkedin", label: "LinkedIn", type: "text", ph: "linkedin.com/in/…" },
        { key: "website", label: "Portfolio / Website", type: "text", ph: "yourstartup.dev" },
        { key: "otherLinks", label: "Other relevant links", type: "text", ph: "GitHub, resume, deck — optional" }
      ]}
    ]
  },
  investor: {
    title: "Create Investor Profile",
    icon: "trending",
    steps: [
      { name: "Account", fields: [
        { key: "fullName", label: "Full Name", type: "text", req: true, ph: "e.g. Nikhil Rao" },
        { key: "email", label: "Work Email", type: "email", req: true, ph: "you@firm.com" },
        { key: "phone", label: "Phone Number", type: "tel", ph: "+91 …" },
        { key: "password", label: "Password", type: "password", req: true, ph: "Min. 6 characters" },
        { key: "confirm", label: "Confirm Password", type: "password", req: true, ph: "Repeat your password" }
      ]},
      { name: "Organization", fields: [
        { key: "org", label: "Investment Firm Name", type: "text", req: true, ph: "e.g. Meridian Capital" },
        { key: "role", label: "Designation / Role", type: "text", ph: "e.g. Partner" },
        { key: "website", label: "Website", type: "text", ph: "meridian.example" },
        { key: "location", label: "Location", type: "text", ph: "e.g. Hyderabad, India" }
      ]},
      { name: "Investment Profile", fields: [
        { key: "sectors", label: "Investment Domain / Sector", type: "chips-multi", req: true, options: INVESTOR_SECTORS },
        { key: "stages", label: "Investment Stage", type: "chips-multi", req: true, options: INVESTOR_STAGES }
      ]},
      { name: "Preferences", fields: [
        { key: "ticket", label: "Funding / Ticket Size", type: "chips-single", req: true, options: TICKET_SIZES },
        { key: "geography", label: "Geography", type: "chips-single", req: true, options: GEOGRAPHIES },
        { key: "thesis", label: "Investment Thesis", type: "textarea", req: true, ph: "What do you look for in a startup?" }
      ]},
      { name: "Complete", fields: [
        { key: "linkedin", label: "LinkedIn", type: "text", ph: "linkedin.com/in/…" },
        { key: "portfolio", label: "Portfolio Website", type: "text", ph: "yourfirm.com" },
        { key: "prevInvestments", label: "Previous Investments", type: "textarea", ph: "Names of startups you have backed — optional" }
      ]}
    ]
  },
  incubator: {
    title: "Create Incubator Profile",
    icon: "layers",
    steps: [
      { name: "Account", fields: [
        { key: "fullName", label: "Full Name", type: "text", req: true, ph: "e.g. Priya Nair" },
        { key: "email", label: "Official Email", type: "email", req: true, ph: "hello@incubator.org" },
        { key: "phone", label: "Phone Number", type: "tel", ph: "+91 …" },
        { key: "password", label: "Password", type: "password", req: true, ph: "Min. 6 characters" },
        { key: "confirm", label: "Confirm Password", type: "password", req: true, ph: "Repeat your password" }
      ]},
      { name: "Organization", fields: [
        { key: "org", label: "Incubator Name", type: "text", req: true, ph: "e.g. Example Incubator" },
        { key: "orgType", label: "Organization Type", type: "select", req: true, options: INCUBATOR_ORG_TYPES },
        { key: "website", label: "Website", type: "text", ph: "exampleincubator.io" },
        { key: "location", label: "Location", type: "text", ph: "e.g. Mumbai, India" }
      ]},
      { name: "Startup Focus", fields: [
        { key: "sectors", label: "Domains / Sectors", type: "chips-multi", req: true, options: INCUBATOR_SECTORS },
        { key: "stages", label: "Startup Stage Supported", type: "chips-multi", req: true, options: INCUBATOR_STAGES }
      ]},
      { name: "Support", fields: [
        { key: "support", label: "Support Offered", type: "chips-multi", req: true, options: SUPPORT_TYPES },
        { key: "duration", label: "Typical Program Duration", type: "text", ph: "e.g. 12 weeks" },
        { key: "funding", label: "Funding / Support Available", type: "text", ph: "e.g. $25,000 + workspace" },
        { key: "equity", label: "Equity Requirement (if any)", type: "text", ph: "e.g. 6% or None" },
        { key: "description", label: "Short description of the incubator", type: "textarea", ph: "What programs do you run?" }
      ]},
      { name: "Complete", fields: [] }
    ]
  },
  organizer: {
    title: "Create Organizer Profile",
    icon: "calendar",
    steps: [
      { name: "Account", fields: [
        { key: "org", label: "Organization / Organizer Name", type: "text", req: true, ph: "e.g. Hack the Valley Collective" },
        { key: "orgType", label: "Organizer Type", type: "select", req: true, options: ORGANIZER_TYPES },
        { key: "email", label: "Official Email", type: "email", req: true, ph: "events@org.com" },
        { key: "phone", label: "Phone", type: "tel", ph: "+91 …" },
        { key: "website", label: "Website", type: "text", ph: "org.dev" },
        { key: "location", label: "Location", type: "text", ph: "e.g. Bangalore, India" }
      ]},
      { name: "About", fields: [
        { key: "about", label: "About Organization", type: "textarea", req: true, ph: "What events and programs do you run?" },
        { key: "domains", label: "Typical Hackathon Domains", type: "chips-multi", req: true, options: HACKATHON_DOMAINS }
      ]},
      { name: "Complete", fields: [] }
    ]
  }
};

function renderSignup(role) {
  if (authRole !== role) { authRole = role; authStep = 0; authDraft = {}; }
  const flow = AUTH_FLOWS[role];
  if (!flow) { renderAuth(); return; }
  const step = flow.steps[authStep];
  const last = authStep === flow.steps.length - 1;

  const stepBar = flow.steps.map((s, i) => {
    const cls = i < authStep ? " done" : i === authStep ? " current" : "";
    return '<div class="step-item' + cls + '">' +
      '<span class="step-dot">' + (i < authStep ? Icon("check", 11) : i + 1) + '</span>' +
      '<span class="step-name">' + s.name + '</span>' +
      (i < flow.steps.length - 1 ? '<span class="step-line"></span>' : '') +
    '</div>';
  }).join("");

  const fields = (step.fields || []).map(f => authField(f)).join("");

  const heroTitle = role === "founder" ? "Create your Founder Profile" : "Join the Venture Connect Ecosystem";
  const heroSub = role === "founder" ? "Create your Founder Profile" : role === "investor" ? "Create your Investor Profile" : role === "incubator" ? "Create your Incubator Profile" : "Create your Organizer Profile";

  const html =
    '<nav class="land-nav">' +
      '<a href="#/auth" class="vc-logo lg-nav" title="Venture Connect"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></a>' +
      '<a href="#/auth" class="btn btn-ghost btn-sm" style="margin-left:auto">' + Icon("x", 14) + 'Exit</a>' +
    '</nav>' +

    '<div class="auth-wrap" style="padding-top:56px">' +
      '<div class="auth-form glass-strong card" style="max-width:680px">' +
        '<div style="margin-bottom:22px">' +
          '<span class="vc-logo lg-auth" style="justify-content:center;margin-bottom:14px"><img src="assets/logo/logo-primary.png" alt="Venture Connect" /></span>' +
          '<h1 class="h2" style="text-align:center">' + heroTitle + '</h1>' +
          '<p class="small muted" style="text-align:center;margin-top:2px">' + (role === "founder" ? "Your startup journey starts here." : heroSub + " — this shapes your dashboard experience.") + '</p>' +
          '<p class="small faint" style="text-align:center;margin-top:10px">Step ' + (authStep + 1) + ' of ' + flow.steps.length + ' — ' + step.name + '</p>' +
        '</div>' +

        '<div class="step-bar">' + stepBar + '</div>' +

        (fields ? '<div class="stack" style="margin-top:22px">' + fields + '</div>' : '') +
        (last ? '<div style="margin-top:22px">' + authSummary(role, flow) + '</div>' : '') +

        '<div class="row-between" style="margin-top:26px">' +
          '<button class="btn btn-ghost" onclick="App.authPrev()"' + (authStep === 0 ? " disabled" : "") + '>' + Icon("chevL", 14) + 'Back</button>' +
          (last
            ? '<button class="btn btn-primary btn-lg" onclick="App.authSubmit()">' + Icon("checkCircle", 16) + 'Complete Profile</button>'
            : '<button class="btn btn-primary" onclick="App.authNext()">Continue' + Icon("chevR", 14) + '</button>') +
        '</div>' +
        '<p class="tiny faint" style="text-align:center;margin-top:16px">By continuing you agree to the Venture Connect demo terms. All data stays in your browser.</p>' +
      '</div>' +
    '</div>';

  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
}

function authSummary(role, flow) {
  const d = authDraft;
  const rows = [];
  if (role === "founder") {
    rows.push(["Name", d.fullName], ["Email", d.email], ["College", d.college], ["Founder type", d.founderType], ["Startup", d.startupName], ["Industry", d.industry], ["Stage", d.stage], ["Location", d.location]);
  } else if (role === "investor") {
    rows.push(["Name", d.fullName], ["Email", d.email], ["Firm", d.org], ["Role", d.role], ["Domains", (d.sectors || []).join(", ")], ["Stages", (d.stages || []).join(", ")], ["Ticket", d.ticket], ["Geography", d.geography]);
  } else if (role === "incubator") {
    rows.push(["Name", d.fullName], ["Email", d.email], ["Incubator", d.org], ["Type", d.orgType], ["Focus", (d.sectors || []).join(", ")], ["Stages", (d.stages || []).join(", ")], ["Support", (d.support || []).join(", ")], ["Duration", d.duration]);
  } else {
    rows.push(["Organization", d.org], ["Type", d.orgType], ["Email", d.email], ["Location", d.location], ["Domains", (d.domains || []).join(", ")]);
  }
  return '<div style="padding:16px 18px;border-radius:16px;background:var(--accent-softer);border:1px solid rgba(99,102,241,.15)">' +
    '<div class="semibold small" style="color:var(--accent-deep);margin-bottom:10px">' + Icon("checkCircle", 13) + ' Almost there — review your profile</div>' +
    '<div class="kv" style="grid-template-columns:130px 1fr">' + rows.map(r => '<dt>' + r[0] + '</dt><dd>' + (r[1] || "—") + '</dd>').join("") + '</div>' +
  '</div>';
}

/* ---------------- route dispatch ---------------- */
function renderAuthPage(sub, role) {
  if (sub === "login") return renderLogin();
  if (sub === "signup") return renderSignup(role);
  return renderAuth();
}

function authField(f) {
  const d = authDraft;
  if (f.type === "chips-multi" || f.type === "chips-single") {
    const selected = d[f.key] || (f.type === "chips-multi" ? [] : "");
    const chips = f.options.map(o => {
      const on = f.type === "chips-multi" ? selected.includes(o) : selected === o;
      return '<button class="chip' + (on ? " active" : "") + '" onclick="App.authChip(\'' + f.key + '\',\'' + o.replace(/'/g, "\\'") + '\')">' + (on ? Icon("check", 11) + ' ' : '') + o + '</button>';
    }).join("");
    return '<div class="field"><label>' + f.label + (f.req ? ' <span class="req">*</span>' : '') + '</label><div class="row-wrap">' + chips + '</div></div>';
  }
  if (f.type === "select") {
    const opts = ['<option value="">Select…</option>'].concat(f.options.map(o => '<option value="' + o + '"' + (d[f.key] === o ? " selected" : "") + '>' + o + '</option>')).join("");
    return '<div class="field"><label>' + f.label + (f.req ? ' <span class="req">*</span>' : '') + '</label><select class="select" id="af-' + f.key + '" onchange="App.authFieldSet(\'' + f.key + '\',this.value)">' + opts + '</select></div>';
  }
  if (f.type === "textarea") {
    return '<div class="field"><label>' + f.label + (f.req ? ' <span class="req">*</span>' : '') + '</label><textarea class="textarea" id="af-' + f.key + '" placeholder="' + (f.ph || "") + '" oninput="App.authFieldSet(\'' + f.key + '\',this.value)">' + escapeHtml(d[f.key] || "") + '</textarea></div>';
  }
  return '<div class="field"><label>' + f.label + (f.req ? ' <span class="req">*</span>' : '') + '</label><input class="input" id="af-' + f.key + '" type="' + (f.type || "text") + '" placeholder="' + (f.ph || "") + '" value="' + escapeHtml(d[f.key] || "") + '" oninput="App.authFieldSet(\'' + f.key + '\',this.value)" /></div>';
}
