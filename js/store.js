/* ============================================================
   VENTURE CONNECT — State store, persistence, quality engine
   ============================================================ */

const Store = (() => {
  const KEY = "venture_connect_state_v1";

  const DEFAULT_WORKSPACE = {
    problem: "Smallholder farmers in India lose 15-30% of yield because they make irrigation and pest decisions from guesswork. Extension services are sparse and soil sensors from global brands cost more than a farmer's monthly income.",
    solution: "EcoHarvest is a $40 soil-and-weather sensing node with a phone app that tells farmers exactly when to irrigate and spray. The hardware is built from locally available components and the app works offline.",
    targetCustomer: "Farmers in India who need better crop information.",
    market: "There are roughly 100M smallholder farms in India and the agri-inputs market exceeds $30B. Precision agriculture is growing ~13% annually as mobile penetration rises.",
    businessModel: "We sell the hardware at a thin margin and earn recurring revenue from a $2/month subscription for field analytics, pest alerts, and crop advisories.",
    validation: "We interviewed 43 farmers across two districts and ran a 6-week pilot with 12 farms, measuring a 19% reduction in water use. 31 farmers joined our waitlist.",
    competition: "Large global players sell $300+ soil sensors.",
    advantage: "Our hardware costs 85% less than imported alternatives because we assemble in-country, and our models are trained on regional crops rather than temperate-climate data.",
    funding: "$150,000 pre-seed via SAFE",
    useOfFunds: "45% team and engineering, 25% pilot deployments across 200 farms, 15% hardware tooling, 10% field operations, 5% buffer."
  };

  function defaults() {
    return {
      role: null,
      founder: {
        name: "Aarav Mehta",
        college: "IIT Bombay",
        location: "Mumbai, India",
        skills: ["Product", "Machine Learning", "Hardware Prototyping"],
        bio: "Final-year mechanical engineering student building low-cost sensing hardware for agriculture. Led a 12-person robotics team and interned at an agri-tech startup.",
        socials: { linkedin: "linkedin.com/in/aaravmehta", twitter: "twitter.com/aaravbuilds", github: "github.com/aaravmehta" },
        startupId: "ecoharvest",
        stageIdx: 4,
        workspace: Object.assign({}, DEFAULT_WORKSPACE)
      },
      investor: Object.assign({}, DEMO_INVESTOR),
      incubator: Object.assign({}, DEMO_INCUBATOR),
      organizer: Object.assign({}, DEMO_ORGANIZER),
      internal: Object.assign({}, INTERNAL_USER),
      accounts: JSON.parse(JSON.stringify(DEMO_ACCOUNTS)),
      session: null,
      userStartups: [],
      opportunities: JSON.parse(JSON.stringify(OPPORTUNITIES)),
      applications: JSON.parse(JSON.stringify(SEED_APPLICATIONS)),
      saved: ["fieldpilot", "skillloop"],
      interested: ["verra-solar", "medimind"],
      queue: ["verra-solar", "fieldpilot", "paypulse", "medimind", "skillloop", "gridforge", "tasknest"],
      messages: JSON.parse(JSON.stringify(DEFAULT_MESSAGES)),
      notifications: JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS)),
      notifRead: false,
      reviewResults: {}, // startupId -> { status, ranAt }
      externalApplications: []
    };
  }

  let state = null;
  try {
    state = JSON.parse(localStorage.getItem(KEY)) || defaults();
  } catch (e) {
    state = defaults();
  }
  /* migration: ensure auth-era fields exist on states saved before this update */
  if (!state.accounts) state.accounts = JSON.parse(JSON.stringify(DEMO_ACCOUNTS));
  if (!state.incubator) state.incubator = Object.assign({}, DEMO_INCUBATOR);
  if (!state.organizer) state.organizer = Object.assign({}, DEMO_ORGANIZER);
  if (!state.userStartups) state.userStartups = [];
  if (!("session" in state)) state.session = null;
  if (!state.externalApplications) state.externalApplications = [];
  state.opportunities.forEach(o => {
    if (o.category === "Hackathons") {
      o.type = "hackathon";
      o.applicationMode = "external";
      if (!o.applicationUrl && o.id === "hack-the-valley") o.applicationUrl = "https://hackthevalley.dev/register";
      if (!o.applicationUrl && o.id === "healthtech-bootcamp") o.applicationUrl = "https://medfuture.example/bootcamp/register";
      if (!o.teamRequirements && o.id === "hack-the-valley") o.teamRequirements = "Teams of 2–5";
      if (!o.teamRequirements && o.id === "healthtech-bootcamp") o.teamRequirements = "Student teams";
      if (!o.eventDate) o.eventDate = o.startDate || "";
    } else if (!o.applicationMode) {
      o.applicationMode = "internal";
    }
  });

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  function reset() {
    state = defaults();
    save();
  }

  /* ---------------- roles & users ---------------- */
  const getRole = () => state.role;
  const setRole = (r) => { state.role = r; save(); };
  const founder = () => state.founder;
  const investor = () => state.investor;
  const incubator = () => state.incubator;
  const organizer = () => state.organizer;
  const internal = () => state.internal;
  const me = () => {
    if (state.role === "investor") return state.investor;
    if (state.role === "incubator") return state.incubator;
    if (state.role === "organizer") return state.organizer;
    if (state.role === "internal") return state.internal;
    return state.founder;
  };
  /* role-aware accessors used by shared investor-side pages */
  const org = () => {
    if (state.role === "incubator") return state.incubator.org;
    if (state.role === "organizer") return state.organizer.org;
    return state.investor.org;
  };
  const sessionUser = () => {
    if (!state.session) return null;
    return state.accounts.find(a => a.email === state.session.email) || null;
  };

  /* ---------------- authentication ---------------- */
  const accounts = () => state.accounts;
  const findAccount = (email) => state.accounts.find(a => a.email.toLowerCase() === String(email).toLowerCase()) || null;
  const registerAccount = (account) => {
    if (findAccount(account.email)) return { ok: false, err: "An account with this email already exists." };
    state.accounts.push(account);
    save();
    return { ok: true, account };
  };
  const login = (email, password) => {
    const a = findAccount(email);
    if (!a) return { ok: false, err: "No account found with this email." };
    if (a.password !== password) return { ok: false, err: "Incorrect password. Try again." };
    setSession(a);
    return { ok: true, account: a };
  };
  const setSession = (account) => {
    state.session = { email: account.email };
    state.role = account.role;
    /* restore the profile snapshot captured at signup (demo accounts keep seeded demo data) */
    if (account.profile) {
      const key = account.role === "investor" ? "investor" : account.role === "incubator" ? "incubator" : account.role === "organizer" ? "organizer" : "founder";
      state[key] = JSON.parse(JSON.stringify(account.profile));
    }
    save();
  };
  const signOut = () => {
    state.session = null;
    state.role = null;
    save();
  };

  /* new founders get their own startup record (kept out of discovery until gated) */
  const addUserStartup = (data) => {
    const startup = {
      id: "usr-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      name: data.name || "My Startup",
      tagline: (data.description || "A student venture in the Venture Connect ecosystem.").slice(0, 80),
      sector: data.industry || "Other",
      stage: data.stage || "Idea Stage",
      location: data.location || "India",
      logo: "#6366f1",
      qualityGate: "in-progress",
      score: 62,
      fundingAsk: "To be defined",
      submitted: new Date().toISOString().slice(0, 10),
      lastActivity: "Just now",
      founder: { name: data.founderName || "Founder", college: data.college || "", location: data.location || "India", bio: data.bio || "" },
      scoreBreak: { problem: 0, solution: 0, market: 0, validation: 0, businessModel: 0, team: 60 },
      problem: "", solution: "", targetCustomer: "", market: "", businessModel: "", validation: "",
      competition: "", advantage: "",
      team: [{ name: data.founderName || "Founder", role: "Founder", detail: data.college || "" }],
      useOfFunds: "",
      milestones: [{ name: "Complete the Idea Workspace", done: false }],
      evidence: []
    };
    state.userStartups.unshift(startup);
    save();
    return startup;
  };

  const myStartup = () => STARTUPS.find(s => s.id === state.founder.startupId) || state.userStartups.find(s => s.id === state.founder.startupId) || null;
  const getStartup = (id) => STARTUPS.find(s => s.id === id) || state.userStartups.find(s => s.id === id) || null;

  /* ---------------- quality gate stages ---------------- */
  const stageIdx = () => state.founder.stageIdx;
  const setStageIdx = (i) => { state.founder.stageIdx = Math.max(0, Math.min(GATE_STAGES.length - 1, i)); save(); };
  const advanceStage = () => {
    if (state.founder.stageIdx < GATE_STAGES.length - 1) {
      state.founder.stageIdx += 1;
      save();
      return true;
    }
    return false;
  };
  const stageState = (i) => {
    const cur = state.founder.stageIdx;
    if (i < cur) return "done";
    if (i === cur) return "current";
    return "pending";
  };

  /* ---------------- workspace ---------------- */
  const workspace = () => state.founder.workspace;
  const updateWorkspace = (key, value) => {
    state.founder.workspace[key] = value;
    save();
  };
  const workspaceCompletion = () => {
    const w = state.founder.workspace;
    const filled = WORKSPACE_SECTIONS.filter(s => (w[s.key] || "").trim().length >= 25).length;
    return Math.round((filled / WORKSPACE_SECTIONS.length) * 100);
  };

  /* ---------------- investor lists ---------------- */
  const isSaved = (id) => state.saved.includes(id);
  const toggleSaved = (id) => {
    state.saved = isSaved(id) ? state.saved.filter(x => x !== id) : [...state.saved, id];
    save();
    return isSaved(id);
  };
  const isInterested = (id) => state.interested.includes(id);
  const toggleInterested = (id) => {
    state.interested = isInterested(id) ? state.interested.filter(x => x !== id) : [...state.interested, id];
    if (state.interested.includes(id) && !state.messages[id]) {
      const s = getStartup(id);
      state.messages[id] = {
        startupId: id,
        partner: { name: s.founder.name, role: "Founder, " + s.name },
        items: [
          { from: "partner", text: "Hi " + state.investor.name.split(" ")[0] + ", thanks for marking " + s.name + " as interested! Happy to share our latest numbers and answer any questions.", time: "Just now" }
        ]
      };
    }
    save();
    return state.interested.includes(id);
  };
  const removeFromQueue = (id) => { state.queue = state.queue.filter(x => x !== id); save(); };

  /* ---------------- messaging ---------------- */
  const conversations = () => state.messages;
  const getConversation = (id) => state.messages[id] || null;
  const sendMessage = (convId, text) => {
    const c = state.messages[convId];
    if (!c) return null;
    c.items.push({ from: "me", text, time: "Just now" });
    save();
    return c;
  };

  /* ---------------- notifications ---------------- */
  const notifications = () => state.notifications;
  const unreadCount = () => state.notifications.filter(n => !n.read).length;
  const markNotifsRead = () => { state.notifications.forEach(n => n.read = true); state.notifRead = true; save(); };

  /* ---------------- review results (investor QC page) ---------------- */
  const reviewResults = () => state.reviewResults;
  const setReviewResult = (id, status) => { state.reviewResults[id] = { status, ranAt: new Date().toLocaleString() }; save(); };

  /* ============================================================
     APPLICATION QUALITY CHECK ENGINE
     Rule-based + meaning-based. Statuses (only these five):
     Ready to Submit | Needs Revision | Incomplete |
     Eligibility Mismatch | Manual Review
     ============================================================ */

  const RE_PLACEHOLDER = /(lorem|ipsum|xxx+|tbd|todo|placeholder|asdf|待定|待补充|test answer|sample text|change me)/i;
  const RE_RANDOM = /(.)\1{4,}|^[asdfghjkl;]{6,}$/i;
  const STOPWORDS = new Set(["the","a","an","and","or","but","for","with","that","this","these","those","from","are","our","your","their","its","was","were","will","have","has","had","not","can","who","what","when","where","how","which","into","over","under","than","then","they","them","we","us","you","it","of","in","on","at","to","is","be","by","as","so","do","does","up","down"]);
  const SEGMENT_WORDS = /(student|farmer|hospital|school|college|campus|smallholder|small|micro|local|urban|rural|enterprise|smb|businesses|vendor|patient|parent|teacher|creator|freelancer|retail|restaurant|university|club|lab|cafeteria|family)/i;
  const REVENUE_WORDS = /(subscription|saas|commission|fee|freemium|license|advertis|sell|sale|revenue|margin|per seat|monthly|annual|%)/i;
  const EVIDENCE_WORDS = /(interview|survey|pilot|prototype|waitlist|beta|users|letters?|feedback|revenue|signup|download|trial|test|mou|loi|study|deploy)/i;
  const FUNDING_USE_WORDS = /(team|engineering|marketing|product|ops|operations|hardware|manufacturing|sales|trial|legal|compliance|design|%|buffer|build|hiring|expansion)/i;

  function tokens(text) {
    return (text || "").toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 3 && !STOPWORDS.has(t));
  }
  function overlap(a, b) {
    const ta = new Set(tokens(a));
    return tokens(b).filter(t => ta.has(t)).length;
  }

  function ruleChecks(w, founderProfile) {
    const checks = [];
    const trimmed = {};
    WORKSPACE_SECTIONS.forEach(s => { trimmed[s.key] = (w[s.key] || "").trim(); });

    // Missing required fields / very short answers
    for (const s of WORKSPACE_SECTIONS) {
      const v = trimmed[s.key];
      if (!v) {
        checks.push({ section: s.key, label: s.label, kind: "rule", status: "fail", title: "Missing required field", msg: s.label + " is empty. Add a specific answer so reviewers understand this section.", act: "Write 2–4 sentences answering: " + s.q });
      } else if (v.length < 40) {
        checks.push({ section: s.key, label: s.label, kind: "rule", status: "fail", title: "Answer too short", msg: "Your " + s.label.toLowerCase() + " answer is only " + v.length + " characters. Reviewers need enough detail to evaluate it.", act: "Expand to at least 40 characters with concrete specifics." });
      } else if (RE_PLACEHOLDER.test(v)) {
        checks.push({ section: s.key, label: s.label, kind: "rule", status: "fail", title: "Placeholder content detected", msg: "Your answer contains placeholder or test wording.", act: "Replace placeholder text with your real answer." });
      } else if (RE_RANDOM.test(v)) {
        checks.push({ section: s.key, label: s.label, kind: "rule", status: "fail", title: "Random characters detected", msg: "This answer looks like keyboard mashing or repeated characters.", act: "Rewrite with a clear, typed answer." });
      }
    }

    // Repeated answers
    const keys = WORKSPACE_SECTIONS.map(s => s.key);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const a = trimmed[keys[i]], b = trimmed[keys[j]];
        if (a && b && a.length > 40 && (a === b || a.includes(b) || b.includes(a))) {
          const labelA = WORKSPACE_SECTIONS.find(s => s.key === keys[i]).label;
          const labelB = WORKSPACE_SECTIONS.find(s => s.key === keys[j]).label;
          checks.push({ section: keys[i], kind: "rule", status: "fail", title: "Repeated answer", msg: labelA + " and " + labelB + " contain the same text. Duplicated answers reduce credibility.", act: "Write a distinct, specific answer for each section." });
        }
      }
    }

    // Invalid links
    const allText = WORKSPACE_SECTIONS.map(s => trimmed[s.key] || "").join(" ");
    const urls = allText.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi) || [];
    for (const u of urls) {
      if (/^www\./.test(u) || !/^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}/i.test(u)) {
        checks.push({ section: "links", kind: "rule", status: "fail", title: "Invalid link format", msg: "\"" + u.slice(0, 40) + "...\" is not a valid https:// link.", act: "Use the full URL format starting with https://" });
      }
    }
    if (/link here|paste link|www\.\s/.test(allText)) {
      checks.push({ section: "links", kind: "rule", status: "warn", title: "Placeholder link", msg: "A placeholder link was found.", act: "Replace it with the real URL or remove it." });
    }

    // Eligibility mismatch
    if (!founderProfile || !(founderProfile.college || "").trim() || !(founderProfile.name || "").trim()) {
      checks.push({ section: "eligibility", kind: "rule", status: "eligibility", title: "Eligibility mismatch", msg: "Venture Connect accepts student founders. Your profile is missing a name or college.", act: "Complete your Profile before submitting." });
    }
    return checks;
  }

  function meaningChecks(w) {
    const checks = [];
    const p = (w.problem || "").trim(), s = (w.solution || "").trim(), c = (w.targetCustomer || "").trim();
    const m = (w.market || "").trim(), b = (w.businessModel || "").trim(), v = (w.validation || "").trim();
    const f = (w.useOfFunds || "").trim(), comp = (w.competition || "").trim(), adv = (w.advantage || "").trim();

    // Problem understandable
    if (p.length >= 60 && !RE_PLACEHOLDER.test(p) && /\d/.test(p)) checks.push({ section: "problem", kind: "meaning", status: "pass", title: "Problem clarity", msg: "The problem is specific, quantified, and understandable.", act: "" });
    else checks.push({ section: "problem", kind: "meaning", status: "warn", title: "Problem clarity", msg: "Reviewers may struggle to understand the problem. Add specifics: who is affected, how often, and why it matters.", act: "Add a concrete scenario or a quantified cost of the problem." });

    // Solution addresses problem
    if (overlap(p, s) >= 2) checks.push({ section: "solution", kind: "meaning", status: "pass", title: "Solution fit", msg: "The solution clearly connects to the problem described.", act: "" });
    else checks.push({ section: "solution", kind: "meaning", status: "warn", title: "Solution fit", msg: "The solution does not clearly address the problem. Reviewers need to see the mechanism.", act: "Explain step by step how the product removes the pain described in the problem." });

    // Target customer specific
    if (SEGMENT_WORDS.test(c) || /\d/.test(c)) checks.push({ section: "targetCustomer", kind: "meaning", status: "pass", title: "Target customer", msg: "The target customer is a specific, identifiable segment.", act: "" });
    else checks.push({ section: "targetCustomer", kind: "meaning", status: "warn", title: "Target customer", msg: "Your target customer is too broad. Specify the exact customer segment.", act: "Name who exactly buys/uses this — segment, geography, and trigger event." });

    // Business model understandable
    if (REVENUE_WORDS.test(b)) checks.push({ section: "businessModel", kind: "meaning", status: "pass", title: "Business model", msg: "The revenue mechanism is understandable.", act: "" });
    else checks.push({ section: "businessModel", kind: "meaning", status: "warn", title: "Business model", msg: "It is not clear how the startup makes money.", act: "State the revenue stream, pricing unit, and who pays." });

    // Internal consistency
    if (overlap(c, m) >= 1 || overlap(p, m) >= 1) checks.push({ section: "market", kind: "meaning", status: "pass", title: "Internal consistency", msg: "Market, customer, and problem claims are consistent with each other.", act: "" });
    else checks.push({ section: "market", kind: "meaning", status: "warn", title: "Internal consistency", msg: "The market description does not align with the customer or problem described.", act: "Make sure the market size logic references the same segment as your target customer." });

    // Validation explained
    if (EVIDENCE_WORDS.test(v)) checks.push({ section: "validation", kind: "meaning", status: "pass", title: "Validation", msg: "Validation is explained with concrete evidence.", act: "" });
    else checks.push({ section: "validation", kind: "meaning", status: "warn", title: "Validation", msg: "Validation evidence is missing or unclear. Investors will discount claims without it.", act: "Add interviews, surveys, pilots, waitlists, or letters of intent with numbers." });

    // Funding use explained
    if (FUNDING_USE_WORDS.test(f)) checks.push({ section: "useOfFunds", kind: "meaning", status: "pass", title: "Use of funds", msg: "The use of funds is broken down clearly.", act: "" });
    else checks.push({ section: "useOfFunds", kind: "meaning", status: "warn", title: "Use of funds", msg: "It is not clear how the funding will be spent.", act: "Allocate the raise: team, product, pilots, go-to-market — with percentages." });

    // Competition
    if (comp.length >= 30) checks.push({ section: "competition", kind: "meaning", status: "pass", title: "Competition", msg: "Existing alternatives are acknowledged.", act: "" });
    else checks.push({ section: "competition", kind: "meaning", status: "warn", title: "Competition", msg: "\"No competition\" is rarely true. List who else solves this problem, including the status quo.", act: "Name 2–3 direct competitors or alternatives and how they differ." });

    // Competitive advantage
    if (adv.length >= 30 && adv !== s) checks.push({ section: "advantage", kind: "meaning", status: "pass", title: "Competitive advantage", msg: "The defensible edge is articulated.", act: "" });
    else checks.push({ section: "advantage", kind: "meaning", status: "warn", title: "Competitive advantage", msg: "Why your solution wins is not clear.", act: "Explain the durable edge: technology, data, access, or distribution." });

    // Manual-review trigger: validation mentions intent but no evidence
    if (v && /(plan to|will do|we think|intend to|believe)/i.test(v) && !EVIDENCE_WORDS.test(v)) {
      checks.push({ section: "validation", kind: "meaning", status: "review", title: "Manual review recommended", msg: "Validation is described as intent rather than evidence. A Venture Connect analyst should review this manually.", act: "Submit for manual review, or add concrete evidence first." });
    }
    return checks;
  }

  function runQualityChecks(workspaceData, profileOverride) {
    const w = workspaceData || state.founder.workspace;
    const fp = profileOverride || state.founder;
    const rules = ruleChecks(w, fp);
    const meaning = meaningChecks(w);

    const fails = rules.filter(c => c.status === "fail").length;
    const eligibilityFails = rules.filter(c => c.status === "eligibility").length;
    const warns = [...rules, ...meaning].filter(c => c.status === "warn").length;
    const manual = meaning.filter(c => c.status === "review").length;

    let status;
    if (eligibilityFails > 0) status = "Eligibility Mismatch";
    else if (fails >= 6 || workspaceCompletion() < 40) status = "Incomplete";
    else if (fails > 0 || warns > 2) status = "Needs Revision";
    else if (manual > 0) status = "Manual Review";
    else status = "Ready to Submit";

    return { status, rules, meaning, meta: { fails, warns, manual } };
  }

  /* ---------------- opportunities (two-sided) ---------------- */
  const getOpportunities = () => state.opportunities;
  const getOpportunity = (id) => state.opportunities.find(o => o.id === id) || null;
  const myOpportunities = (org) => state.opportunities.filter(o => o.createdBy === org);
  const createOpportunity = (data, status) => {
    const id = "opp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
    const opp = Object.assign({ id, status: status || "draft", views: 0, createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), createdBy: data.org || "" }, data);
    state.opportunities.unshift(opp);
    save();
    return opp;
  };
  const updateOpportunity = (id, patch) => {
    const o = state.opportunities.find(x => x.id === id);
    if (!o) return null;
    Object.assign(o, patch);
    save();
    return o;
  };
  const closeOpportunity = (id) => updateOpportunity(id, { status: "closed" });
  const reopenOpportunity = (id) => updateOpportunity(id, { status: "published" });
  const incrementViews = (id) => {
    const o = state.opportunities.find(x => x.id === id);
    if (o) { o.views = (o.views || 0) + 1; save(); }
  };
  const recordExternalApplicationClick = (id) => {
    const o = state.opportunities.find(x => x.id === id);
    if (!o) return null;
    o.applicationLinkClicks = (o.applicationLinkClicks || 0) + 1;
    const startupId = state.founder && state.founder.startupId;
    if (startupId && !state.externalApplications.some(x => x.startupId === startupId && x.opportunityId === id)) {
      state.externalApplications.unshift({ startupId, opportunityId: id, clickedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
    }
    save();
    return o.applicationLinkClicks;
  };
  const externalApplicationsForStartup = (startupId) => state.externalApplications.filter(x => x.startupId === startupId);

  /* ---------------- applications (founder + startup + opportunity + org) ---------------- */
  const getApplications = () => state.applications;
  const getApplication = (id) => state.applications.find(a => a.id === id) || null;
  const applicationsForStartup = (sid) => state.applications.filter(a => a.startupId === sid);
  const applicationsForOrg = (org) => state.applications.filter(a => {
    const o = state.opportunities.find(x => x.id === a.opportunityId);
    return o && o.createdBy === org;
  });
  const oppApplicationCount = (id) => state.applications.filter(a => a.opportunityId === id).length;
  const oppQualifiedCount = (id) => state.applications.filter(a => a.opportunityId === id && a.gate && a.gate.decision === "passed" && a.stage >= 7).length;
  const oppInterestedCount = (id) => state.applications.filter(a => a.opportunityId === id && state.interested.includes(a.startupId)).length;

  function freshApplication(startupId, opportunityId) {
    return {
      id: "app-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      startupId, opportunityId,
      submitted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUpdate: "Just now",
      stage: 1,
      needsRevision: false,
      rejected: false,
      vcReview: { decision: null, notes: "" },
      pitch: { scores: { quality: null, problem: null, solution: null, market: null, communication: null, businessModel: null, evidence: null }, decision: null, notes: "" },
      interview: { scheduled: "", completed: false, notes: "", decision: null },
      evidenceNotes: {},
      gate: { decision: null, notes: "", decidedAt: null }
    };
  }
  const createApplication = (startupId, opportunityId) => {
    const app = freshApplication(startupId, opportunityId);
    state.applications.unshift(app);
    save();
    return app;
  };
  const updateApplication = (id, patch) => {
    const a = state.applications.find(x => x.id === id);
    if (!a) return null;
    Object.assign(a, patch);
    a.lastUpdate = "Just now";
    save();
    return a;
  };
  const advanceApp = (id) => {
    const a = state.applications.find(x => x.id === id);
    if (!a) return false;
    if (a.stage < INTERNAL_STAGES.length - 1) {
      a.stage += 1;
      a.lastUpdate = "Just now";
      save();
      return true;
    }
    return false;
  };
  const setGate = (id, passed, notes) => {
    const a = state.applications.find(x => x.id === id);
    if (!a) return;
    a.gate = { decision: passed ? "passed" : "not-passed", notes: notes || "", decidedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    if (passed) a.needsRevision = false;
    a.lastUpdate = "Just now";
    save();
  };
  const unlockApp = (id) => {
    const a = state.applications.find(x => x.id === id);
    if (!a) return;
    if (a.gate && a.gate.decision === "passed") {
      a.stage = INTERNAL_STAGES.length - 1;
      a.lastUpdate = "Just now";
      save();
    }
  };
  const rejectApp = (id) => {
    const a = state.applications.find(x => x.id === id);
    if (!a) return;
    a.rejected = true;
    a.lastUpdate = "Just now";
    save();
  };

  /* ---------------- helpers for UI ---------------- */
  function visibleStartups() {
    return STARTUPS.filter(s => s.qualityGate === "passed" || s.qualityGate === "review");
  }
  function passedStartups() {
    return STARTUPS.filter(s => s.qualityGate === "passed");
  }
  function recommendedIds() {
    return [...STARTUPS].sort((a, b) => b.score - a.score).slice(0, 3).map(s => s.id);
  }

  return {
    get state() { return state; }, save, reset,
    getRole, setRole, founder, investor, incubator, organizer, internal, me, org,
    sessionUser, accounts, findAccount, registerAccount, login, setSession, signOut, addUserStartup,
    myStartup, getStartup,
    stageIdx, setStageIdx, advanceStage, stageState,
    workspace, updateWorkspace, workspaceCompletion,
    isSaved, toggleSaved, isInterested, toggleInterested, removeFromQueue,
    conversations, getConversation, sendMessage,
    notifications, unreadCount, markNotifsRead,
    reviewResults, setReviewResult,
    runQualityChecks,
    visibleStartups, passedStartups, recommendedIds,
    DEFAULT_WORKSPACE,
    getOpportunities, getOpportunity, myOpportunities,
    createOpportunity, updateOpportunity, closeOpportunity, reopenOpportunity, incrementViews, recordExternalApplicationClick, externalApplicationsForStartup,
    getApplications, getApplication, applicationsForStartup, applicationsForOrg,
    oppApplicationCount, oppQualifiedCount, oppInterestedCount,
    createApplication, updateApplication, advanceApp, setGate, unlockApp, rejectApp
  };
})();
