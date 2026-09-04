/* ============================================================
   VENTURE CONNECT — Demo data
   All startups, people, and institutions are fictional.
   ============================================================ */

const GATE_STAGES = [
  { key: "idea-submitted",  name: "Idea Submitted",          sub: "Entry",              icon: "spark",   desc: "Your idea was submitted and accepted into the Venture Connect pipeline." },
  { key: "workspace",       name: "Idea Workspace Completed",sub: "Build",              icon: "edit",    desc: "All ten sections of your Idea Workspace were completed with real substance." },
  { key: "auto-check",      name: "Automated Quality Check", sub: "Quality check",      icon: "scan",    desc: "Rule-based and meaning-based checks confirmed your application is complete and coherent." },
  { key: "vc-review",       name: "Venture Connect Review",  sub: "Venture Connect",    icon: "shield",  desc: "A Venture Connect analyst reviewed your application for viability and clarity." },
  { key: "pitch-review",    name: "Pitch Review",            sub: "Venture Connect",    icon: "present", desc: "Your pitch materials were reviewed by an investment committee." },
  { key: "interview",       name: "Founder Interview",       sub: "Venture Connect",    icon: "users",   desc: "A structured interview covering your problem, market, and execution plan." },
  { key: "validation",      name: "Evidence / Validation Verification", sub: "Verify",  icon: "verify",  desc: "Customer interviews, pilots, surveys, and traction evidence are verified." },
  { key: "gate-passed",     name: "Venture Connect Quality Gate Passed", sub: "Quality gate", icon: "trophy", desc: "Your startup has officially passed the Venture Connect Quality Gate." },
  { key: "investor-access", name: "Investor / Incubator Access", sub: "Access",        icon: "eye",     desc: "Your startup is now visible to participating investors and incubators." }
];

const WORKSPACE_SECTIONS = [
  { key: "problem",        label: "Problem",            q: "What problem are you solving?",                        hint: "Describe the problem in real-world terms. Who feels it, how often, and how painful is it?" },
  { key: "solution",       label: "Solution",           q: "How does your product solve this problem?",            hint: "Explain your product, how it works, and why it removes the pain." },
  { key: "targetCustomer", label: "Target Customer",    q: "Who specifically experiences this problem?",           hint: "Name the exact segment — not 'everyone'. Include who, where, and how they behave." },
  { key: "market",         label: "Market",             q: "What market are you targeting?",                       hint: "Sizing, geography, and growth of the market you plan to serve." },
  { key: "businessModel",  label: "Business Model",     q: "How will your startup make money?",                    hint: "Pricing, revenue streams, and unit economics at a high level." },
  { key: "validation",     label: "Validation",         q: "What evidence do you have that this problem exists?",  hint: "Interviews, surveys, pilots, waitlists, letters of intent, or early revenue." },
  { key: "competition",    label: "Competition",        q: "Who already solves this problem?",                     hint: "Direct competitors, indirect alternatives, and the status quo." },
  { key: "advantage",      label: "Competitive Advantage", q: "Why is your solution different?",                   hint: "What defensible edge do you have — technology, access, data, or distribution?" },
  { key: "funding",        label: "Funding",            q: "How much funding are you seeking?",                    hint: "Amount and instrument, e.g. $150K pre-seed SAFE." },
  { key: "useOfFunds",     label: "Use of Funds",       q: "How will you use the funding?",                        hint: "Break down allocation: team, product, pilots, go-to-market, buffer." }
];

const STARTUPS = [
  {
    id: "ecoharvest", name: "EcoHarvest", tagline: "Crop intelligence for smallholder farms",
    sector: "AgriTech", stage: "Pre-seed", location: "Mumbai, India", logo: "#16a34a",
    qualityGate: "in-progress", score: 78, fundingAsk: "$150,000",
    submitted: "2026-07-02", lastActivity: "Today",
    founder: { name: "Aarav Mehta", college: "IIT Bombay", location: "Mumbai, India", bio: "Final-year mechanical engineering student building low-cost sensing hardware for agriculture." },
    scoreBreak: { problem: 84, solution: 79, market: 72, validation: 68, businessModel: 76, team: 86 },
    problem: "Smallholder farmers in India lose 15–30% of yield because they make irrigation and pest decisions from guesswork. Extension services are sparse and soil sensors from global brands cost more than a farmer's monthly income.",
    solution: "EcoHarvest is a $40 soil-and-weather sensing node with a phone app that tells farmers exactly when to irrigate and spray. The hardware is built from locally available components and the app works offline.",
    targetCustomer: "Farmers in India who need better crop information.",
    market: "There are roughly 100M smallholder farms in India, and the agri-inputs market exceeds $30B. Precision agriculture is projected to grow ~13% annually as cheap sensing and mobile penetration rise.",
    businessModel: "We sell the hardware at a thin margin and earn recurring revenue from a $2/month subscription for field analytics, pest alerts, and crop advisories.",
    validation: "We interviewed 43 farmers across two districts and ran a 6-week pilot with 12 farms, measuring a 19% reduction in water use. 31 farmers joined our waitlist.",
    competition: "Large global players sell $300+ soil sensors. Local advisory apps exist but provide generic, non-location-specific advice with no sensing hardware.",
    advantage: "Our hardware costs 85% less than imported alternatives because we assemble in-country, and our models are trained on regional crops and weather patterns rather than temperate-climate data.",
    team: [
      { name: "Aarav Mehta", role: "Founder & CEO", detail: "IIT Bombay, hardware prototyping" },
      { name: "Neha Kulkarni", role: "Co-founder & CTO", detail: "IIT Bombay, embedded systems" },
      { name: "Rohit Sharma", role: "Advisor", detail: "10 years in agri-distribution" }
    ],
    useOfFunds: "45% team and engineering, 25% pilot deployments across 200 farms, 15% hardware tooling, 10% field operations, 5% buffer.",
    milestones: [
      { name: "20-farm pilot complete", done: true },
      { name: "200-farm paid pilot", done: false },
      { name: "First 1,000 units manufactured", done: false }
    ],
    evidence: [
      { type: "Customer interviews", description: "43 structured interviews with smallholder farmers, 2 districts.", status: "Verified", notes: "Interview scripts and field notes reviewed. Quotes consistent with stated problem." },
      { type: "Pilot results", description: "6-week pilot across 12 farms; 19% water-use reduction measured.", status: "Under review", notes: "Requested raw water-meter logs for the pilot period." },
      { type: "Surveys", description: "120-farmer survey on irrigation decision-making.", status: "Under review", notes: "Survey platform export received; sample check in progress." },
      { type: "User traction", description: "31-farmer waitlist with contact details.", status: "Needs clarification", notes: "Please provide dates and the channel used to collect signups." },
      { type: "Supporting documents", description: "BOM cost breakdown and supplier quotes.", status: "Needs clarification", notes: "Two supplier quotes are from the same distributor; add an independent quote." }
    ]
  },
  {
    id: "verra-solar", name: "Verra Solar", tagline: "Community solar for campus microgrids",
    sector: "ClimateTech", stage: "Pre-seed", location: "Palo Alto, USA", logo: "#f59e0b",
    qualityGate: "passed", score: 86, fundingAsk: "$250,000",
    submitted: "2026-06-12", lastActivity: "2 days ago",
    founder: { name: "Sofia Reyes", college: "Stanford University", location: "Palo Alto, USA", bio: "MS Energy Resources Engineering; former solar installations intern." },
    scoreBreak: { problem: 92, solution: 88, market: 80, validation: 84, businessModel: 85, team: 90 },
    problem: "University campuses sign multi-decade solar contracts with vendors who own the panels, so students pay locked-in rates and never see the savings. Microgrids are expensive to design and most campuses lack the engineering capacity.",
    solution: "Verra Solar standardizes community-owned solar microgrids for campuses: a design toolkit, a co-op ownership model, and prefabricated modular arrays that cut install cost by 30%.",
    targetCustomer: "US universities with 5,000+ students, a sustainability office, and no in-house energy engineering team. Pilot segment: public universities in California.",
    market: "US higher-education institutions spend ~$6B annually on electricity. The campus microgrid market is growing ~11% yearly, with 400+ campuses actively exploring community solar.",
    businessModel: "We charge a one-time design-and-permit fee ($40K–$80K per campus) and a 5% management fee on co-op energy savings for 10 years. Campuses own the assets through the co-op.",
    validation: "LOI signed with one California public university; feasibility study delivered to two more. 9 campus sustainability directors interviewed; 6 ranked energy ownership a top-3 priority.",
    competition: "Traditional solar developers (Sunrun, ENGIE) install but retain ownership. Engineering consultants design microgrids at $200K+ per project. No player combines co-op ownership with a campus product.",
    advantage: "Ownership-first model aligns incentives with the buyer, and our modular design library makes each campus project a configuration rather than a custom engineering job.",
    team: [
      { name: "Sofia Reyes", role: "Founder & CEO", detail: "Stanford, energy engineering" },
      { name: "Daniel Osei", role: "Co-founder & COO", detail: "Stanford GSB, energy markets" },
      { name: "Prof. Ellen Wu", role: "Advisor", detail: "Campus sustainability lead, UC system" }
    ],
    useOfFunds: "40% engineering and design tooling, 25% pilot campus deployment, 15% permitting and legal, 12% business development, 8% buffer.",
    milestones: [
      { name: "LOI signed (pilot campus)", done: true },
      { name: "Feasibility studies for 2 campuses", done: true },
      { name: "First co-op launched", done: false }
    ],
    evidence: [
      { type: "Letters of intent", description: "LOI from a California public university for a pilot microgrid.", status: "Verified", notes: "Counterparty confirmed via official letterhead." },
      { type: "Customer interviews", description: "9 sustainability directors interviewed; 6 ranked energy ownership top-3.", status: "Verified", notes: "Interview log reviewed." },
      { type: "Revenue evidence", description: "$12K design-and-permit deposit received.", status: "Verified", notes: "Bank statement matches." },
      { type: "Supporting documents", description: "Feasibility study sample and module spec sheets.", status: "Verified", notes: "Technical review passed." }
    ]
  },
  {
    id: "fieldpilot", name: "FieldPilot", tagline: "Precision irrigation copilot for smallholder farms",
    sector: "AgriTech", stage: "Pre-seed", location: "Sacramento, USA", logo: "#0d9488",
    qualityGate: "passed", score: 81, fundingAsk: "$150,000",
    submitted: "2026-06-18", lastActivity: "5 days ago",
    founder: { name: "Liam Chen", college: "UC Davis", location: "Sacramento, USA", bio: "PhD candidate in plant sciences; grew up on a family farm." },
    scoreBreak: { problem: 85, solution: 82, market: 78, validation: 80, businessModel: 74, team: 88 },
    problem: "Water costs are the second-largest expense for small farms in California's Central Valley, yet most irrigation scheduling is still done by feel. Smart irrigation systems are priced for large agribusiness, not 50-acre family farms.",
    solution: "FieldPilot is a $29/month AI irrigation copilot: it combines public weather data, soil probes, and satellite imagery to give farmers a daily irrigation plan on a simple app — no expensive hardware required.",
    targetCustomer: "Small-to-mid family farms (50–500 acres) in California's Central Valley growing high-value row crops, primarily almonds, tomatoes, and lettuce.",
    market: "California agriculture uses ~34M acre-feet of water per year. The smart-irrigation market is projected to reach $2.1B by 2029, and 20,000+ Central Valley farms fit our target profile.",
    businessModel: "Monthly subscription ($29/acre-plan tier plus $49 for multi-field). Channel partnerships with agricultural co-ops that resell at 15% margin.",
    validation: "86 farmers interviewed; 61 said water cost is a top-3 concern. A 90-day beta with 22 farms showed average 14% water savings. 3 co-ops signed pilot agreements.",
    competition: "Netafim and John Deere target large operations with $10K+ hardware systems. Free advisory apps (e.g. CropManage) exist but don't schedule irrigation day-to-day.",
    advantage: "Zero-hardware entry point, algorithms tuned for Central Valley crops, and a co-op distribution channel competitors don't have.",
    team: [
      { name: "Liam Chen", role: "Founder & CEO", detail: "UC Davis, plant sciences" },
      { name: "Priya Patel", role: "Co-founder & CTO", detail: "UC Davis, water engineering" }
    ],
    useOfFunds: "35% model development and data, 30% beta expansion to 200 farms, 15% co-op partnerships, 12% app development, 8% buffer.",
    milestones: [
      { name: "90-day beta with 22 farms", done: true },
      { name: "Co-op pilot agreements (3)", done: true },
      { name: "200-farm paid beta", done: false }
    ],
    evidence: [
      { type: "Pilot results", description: "90-day beta, 22 farms, 14% average water savings.", status: "Verified", notes: "Meter data cross-checked with farm records." },
      { type: "Customer interviews", description: "86 farmer interviews with notes and recordings.", status: "Verified", notes: "Sample of 12 interviews audited." },
      { type: "User traction", description: "3 co-op agreements and a 210-farm waitlist.", status: "Verified", notes: "Agreements countersigned." }
    ]
  },
  {
    id: "paypulse", name: "PayPulse", tagline: "Payments infrastructure for student-run businesses",
    sector: "FinTech", stage: "Pre-seed", location: "Lagos, Nigeria", logo: "#4f46e5",
    qualityGate: "passed", score: 79, fundingAsk: "$200,000",
    submitted: "2026-06-25", lastActivity: "1 day ago",
    founder: { name: "Maya Okafor", college: "University of Lagos", location: "Lagos, Nigeria", bio: "Final-year computer science; built campus commerce tools since year two." },
    scoreBreak: { problem: 82, solution: 80, market: 76, validation: 74, businessModel: 83, team: 81 },
    problem: "Student-run businesses in Nigeria (food stalls, laundry, tutoring, reselling) lose sales because they can't accept cards, must chase payments, and have no bookkeeping. Gateways like Paystack require business registration students don't have.",
    solution: "PayPulse gives student businesses a 'bank account in an app' using their student ID for KYC: payment links, instant settlement to mobile money, and automatic bookkeeping — no registration needed.",
    targetCustomer: "Student-run businesses and campus vendors at Nigerian universities, starting with the 12 largest campuses in Lagos (est. 40,000 informal vendors).",
    market: "Nigeria has ~2.7M tertiary students and a fast-growing informal payments market. Digital payments in Nigeria are projected to exceed $60B by 2027.",
    businessModel: "Transaction fee of 1.2% per payment plus a ₦500/month pro plan with bookkeeping exports. Tiered pricing for campus vendor associations.",
    validation: "Ran a 4-week pilot with 180 student vendors processing ₦4.2M in payments; 74% said they'd pay for the pro plan. 5 campus associations expressed partnership interest.",
    competition: "Paystack and Flutterwave serve registered businesses. PalmPay and OPay target consumer transfers, not merchant tooling. No competitor accepts student ID as a merchant KYC path.",
    advantage: "Student-ID-based onboarding is a regulatory-first wedge no incumbent has, and campus distribution through student associations gives us low-cost acquisition.",
    team: [
      { name: "Maya Okafor", role: "Founder & CEO", detail: "University of Lagos, computer science" },
      { name: "Tunde Bakare", role: "Co-founder & CTO", detail: "Ex-Paystack engineer" }
    ],
    useOfFunds: "45% compliance and licensing, 25% product engineering, 15% campus expansion team, 10% liquidity buffer, 5% ops.",
    milestones: [
      { name: "180-vendor pilot", done: true },
      { name: "Licensing application filed", done: true },
      { name: "12-campus rollout", done: false }
    ],
    evidence: [
      { type: "Pilot results", description: "4-week pilot, 180 vendors, ₦4.2M processed.", status: "Verified", notes: "Transaction log exported and audited." },
      { type: "User traction", description: "5 campus association partnership letters.", status: "Verified", notes: "Letters verified with institutions." },
      { type: "Surveys", description: "74% willingness-to-pay from pilot survey.", status: "Under review", notes: "Raw survey data requested." }
    ]
  },
  {
    id: "medimind", name: "MediMind", tagline: "AI symptom triage for university health centers",
    sector: "HealthTech", stage: "Pre-seed", location: "Baltimore, USA", logo: "#0ea5e9",
    qualityGate: "passed", score: 84, fundingAsk: "$180,000",
    submitted: "2026-07-05", lastActivity: "6 hours ago",
    founder: { name: "Ethan Brooks", college: "Johns Hopkins University", location: "Baltimore, USA", bio: "MD-PhD candidate; background in clinical informatics." },
    scoreBreak: { problem: 88, solution: 86, market: 79, validation: 83, businessModel: 80, team: 87 },
    problem: "University health centers are overwhelmed: students wait 3–5 days for appointments, and 40% of visits are minor complaints that don't need a clinician. Nurses spend hours on repetitive triage calls.",
    solution: "MediMind is a clinician-supervised triage assistant: students describe symptoms in a chat, get a structured intake, and are routed to self-care, telehealth, or in-person care. It integrates with existing EHRs via standard APIs.",
    targetCustomer: "US university and college health centers (1,600+ institutions), starting with the 200 largest by enrollment that already use modern EHRs.",
    market: "US college health services serve ~20M students annually. Virtual triage software in higher education is an emerging segment estimated at $400M by 2028.",
    businessModel: "Annual SaaS license scaled by enrollment ($0.50–$1.50/student/year) plus implementation fee. Pilot pricing: 12-month contract with outcomes-based renewal.",
    validation: "Clinical validation study with one university health center: 312 simulated intakes, 94% triage accuracy vs. nurse-led triage. LOI for a spring pilot from the same center.",
    competition: "General telehealth platforms (TimelyCare) focus on virtual visits, not triage. Symptom checkers (Ada, Isabel) are consumer-grade and not EHR-integrated for campus workflows.",
    advantage: "Built on a validated clinical protocol with a university health center as co-developer; the student-experience layer is designed for campus settings, not generic consumers.",
    team: [
      { name: "Ethan Brooks", role: "Founder & CEO", detail: "Johns Hopkins, MD-PhD" },
      { name: "Grace Lin", role: "Co-founder & CTO", detail: "JHU, biomedical informatics" },
      { name: "Dr. Alan Foster", role: "Clinical advisor", detail: "Director, campus health center" }
    ],
    useOfFunds: "50% clinical validation and FDA-adjacent regulatory work, 25% engineering, 15% pilot deployment, 10% compliance.",
    milestones: [
      { name: "Validation study complete", done: true },
      { name: "Pilot LOI signed", done: true },
      { name: "Spring pilot go-live", done: false }
    ],
    evidence: [
      { type: "Clinical study", description: "312 simulated intakes, 94% triage accuracy.", status: "Verified", notes: "Study protocol and results reviewed." },
      { type: "Letters of intent", description: "Spring pilot LOI with a university health center.", status: "Verified", notes: "Signed by center director." },
      { type: "Supporting documents", description: "EHR integration architecture and security review.", status: "Under review", notes: "Pending security questionnaire completion." }
    ]
  },
  {
    id: "skillloop", name: "SkillLoop", tagline: "Peer-to-peer skill exchange for college students",
    sector: "EdTech", stage: "Pre-seed", location: "Singapore", logo: "#d946ef",
    qualityGate: "passed", score: 76, fundingAsk: "$120,000",
    submitted: "2026-07-09", lastActivity: "3 days ago",
    founder: { name: "Zara Khan", college: "National University of Singapore", location: "Singapore", bio: "Third-year business analytics; ran a campus tutoring collective." },
    scoreBreak: { problem: 78, solution: 77, market: 74, validation: 72, businessModel: 70, team: 84 },
    problem: "Students who need a specific skill (SQL, design, public speaking) can't find peers to learn from — tutoring platforms are expensive and campus clubs are unstructured. Knowledge sits idle in senior students.",
    solution: "SkillLoop matches students for skill exchange: you teach what you know, earn credits, and spend credits on learning what you don't. Sessions are scheduled, structured, and rated.",
    targetCustomer: "University students aged 18–24 in dense urban campuses, starting with NUS, NTU, and SMU in Singapore.",
    market: "The global peer-to-peer learning market is projected to grow ~17% annually. Singapore alone has 200K+ tertiary students; comparable dense markets (HK, Dubai) follow the same playbook.",
    businessModel: "Freemium: free exchanges with a 2-credit-per-month cap; $4.99/month unlimited plus verified-skills badges. University partnerships for campus licenses.",
    validation: "9-week pilot across 3 Singapore campuses: 1,240 students joined, 3,800 sessions booked, 71% monthly retention of active users. 2 universities in discussions for campus licenses.",
    competition: "Tutor marketplace (Tutorly, Wyzant) monetize one-directional paid tutoring. LinkedIn and campus clubs are unstructured. No product is built around reciprocal credit exchange.",
    advantage: "Reciprocal credit model removes payment friction and price sensitivity; campus-level distribution via student affairs partners creates defensible local networks.",
    team: [
      { name: "Zara Khan", role: "Founder & CEO", detail: "NUS, business analytics" },
      { name: "Jun Wei Tan", role: "Co-founder & CTO", detail: "NUS, computer science" }
    ],
    useOfFunds: "40% product and matching algorithms, 25% campus expansion, 15% community and trust & safety, 10% university partnerships, 10% buffer.",
    milestones: [
      { name: "3-campus pilot", done: true },
      { name: "Campus license discussion (2 universities)", done: true },
      { name: "First paid university license", done: false }
    ],
    evidence: [
      { type: "Pilot results", description: "3,800 sessions booked across 3 campuses in 9 weeks.", status: "Verified", notes: "Platform analytics reviewed." },
      { type: "User traction", description: "1,240 students joined; 71% retention.", status: "Verified", notes: "Cohort data exported." },
      { type: "Supporting documents", description: "University partnership slide deck.", status: "Needs clarification", notes: "Please add signed meeting minutes." }
    ]
  },
  {
    id: "gridforge", name: "GridForge", tagline: "Modular battery storage for rural grids",
    sector: "DeepTech", stage: "Pre-seed", location: "Daejeon, South Korea", logo: "#7c3aed",
    qualityGate: "passed", score: 82, fundingAsk: "$300,000",
    submitted: "2026-06-30", lastActivity: "1 week ago",
    founder: { name: "Noah Kim", college: "KAIST", location: "Daejeon, South Korea", bio: "PhD candidate in energy systems; two published papers on modular storage." },
    scoreBreak: { problem: 86, solution: 84, market: 78, validation: 76, businessModel: 82, team: 88 },
    problem: "Rural grids in emerging markets lose 20–40% of generated power to instability, but utility-grade battery systems cost millions and take years to deploy. Existing storage is monolithic, hard to finance, and impossible to scale incrementally.",
    solution: "GridForge builds containerized, plug-and-play battery modules (50 kWh each) that utilities stack like bricks. Each module self-balances with the stack, cutting deployment from 18 months to 6 weeks.",
    targetCustomer: "Rural distribution utilities and off-grid energy developers in Southeast Asia, starting with Indonesia and the Philippines, where 25M+ people lack reliable power.",
    market: "The grid-scale battery market is projected to reach $35B by 2030. Emerging-market rural electrification programs commit $8B+/year, and modular products fit donor-financed procurement.",
    businessModel: "Hardware sale per module ($18K) plus a 10-year capacity guarantee contract (recurring $3K/module/year) covering maintenance and remote monitoring.",
    validation: "1 MW-hours of modules deployed in a pilot with a Philippine co-op; 22% reduction in grid instability measured. LOI for a 5 MW project from the same co-op.",
    competition: "Tesla Megapack and Fluence target large utilities with million-dollar installations. No established player offers sub-100 kWh modular stacks with plug-and-play stacking.",
    advantage: "Patented stack-balancing firmware, 60% lower shipping volume per kWh, and a financing-friendly module unit that fits development-bank procurement thresholds.",
    team: [
      { name: "Noah Kim", role: "Founder & CEO", detail: "KAIST, energy systems" },
      { name: "Hana Choi", role: "Co-founder & CTO", detail: "KAIST, power electronics" },
      { name: "Dr. Marco Reyes", role: "Advisor", detail: "Former ADB energy specialist" }
    ],
    useOfFunds: "50% pilot manufacturing line, 20% certification (UL/IEC), 15% field engineering, 10% business development, 5% buffer.",
    milestones: [
      { name: "Philippine co-op pilot", done: true },
      { name: "5 MW LOI", done: true },
      { name: "UL/IEC certification", done: false }
    ],
    evidence: [
      { type: "Pilot results", description: "1 MWh deployed; 22% instability reduction.", status: "Verified", notes: "Grid telemetry logs reviewed." },
      { type: "Letters of intent", description: "5 MW project LOI from Philippine co-op.", status: "Verified", notes: "Board-approved LOI on file." },
      { type: "Revenue evidence", description: "First module purchase order ($72K).", status: "Under review", notes: "PO received; awaiting funds transfer confirmation." }
    ]
  },
  {
    id: "tasknest", name: "TaskNest", tagline: "Operations toolkit for student organizations",
    sector: "SaaS", stage: "Pre-seed", location: "Delhi, India", logo: "#f43f5e",
    qualityGate: "passed", score: 74, fundingAsk: "$100,000",
    submitted: "2026-07-14", lastActivity: "4 days ago",
    founder: { name: "Ava Singh", college: "University of Delhi", location: "Delhi, India", bio: "Second-year economics; led a 400-member fest committee." },
    scoreBreak: { problem: 76, solution: 75, market: 72, validation: 70, businessModel: 71, team: 82 },
    problem: "Student organizations run on WhatsApp chaos: budgets tracked in spreadsheets, approvals chased in DMs, and knowledge lost when leadership rotates every year. 60% of new leaders restart processes from scratch.",
    solution: "TaskNest is a structured operations workspace for student organizations: budget tracking, event planning, task ownership, and a handover pack that auto-generates when leadership changes.",
    targetCustomer: "Student organizations and campus clubs at Indian universities — an estimated 40,000 active clubs across the top 500 institutions.",
    market: "Campus productivity tools are an underserved wedge of the $15B student-engagement software market, growing ~14% annually in India.",
    businessModel: "Club-level subscription ₹1,999/month (approx. $24) for up to 50 members; university-wide licenses at ₹1.5L/year. Annual contracts with student councils as resellers.",
    validation: "38 clubs onboarded in a 2-month beta; 82% retained after the semester. Handover packs adopted by 14 clubs during leadership transitions.",
    competition: "Notion and Trello are general-purpose and require setup expertise students lack. WhatsApp groups and Google Sheets remain the default — we compete with the status quo, not tools.",
    advantage: "Built specifically for club operations with semester-lifecycle features (elections, handovers, fest planning) that generic tools ignore, distributed through student councils.",
    team: [
      { name: "Ava Singh", role: "Founder & CEO", detail: "University of Delhi, economics" },
      { name: "Kabir Malhotra", role: "Co-founder & CTO", detail: "Delhi Technological University" }
    ],
    useOfFunds: "40% product development, 25% university partnerships, 15% onboarding and support, 10% marketing, 10% buffer.",
    milestones: [
      { name: "38-club beta", done: true },
      { name: "2 university council partnerships", done: true },
      { name: "First paid license cohort", done: false }
    ],
    evidence: [
      { type: "User traction", description: "38 clubs onboarded, 82% retention.", status: "Verified", notes: "Usage analytics reviewed." },
      { type: "Customer interviews", description: "25 club leaders interviewed on ops pain points.", status: "Verified", notes: "Interview notes sampled." },
      { type: "Revenue evidence", description: "₹78,000 in pilot deposits from clubs.", status: "Under review", notes: "Deposit records requested." }
    ]
  },
  {
    id: "sustaincart", name: "SustainCart", tagline: "Sustainable packaging marketplace for campus cafeterias",
    sector: "SaaS", stage: "Pre-seed", location: "Austin, USA", logo: "#22c55e",
    qualityGate: "review", score: 71, fundingAsk: "$140,000",
    submitted: "2026-07-20", lastActivity: "Today",
    founder: { name: "Jordan Lee", college: "University of Texas at Austin", location: "Austin, USA", bio: "Junior in supply chain management." },
    scoreBreak: { problem: 74, solution: 72, market: 70, validation: 66, businessModel: 73, team: 72 },
    problem: "Campus cafeterias want to reduce single-use plastic but sustainable packaging costs 2–3x more and procurement is fragmented across hundreds of small suppliers.",
    solution: "SustainCart is a marketplace that aggregates vetted sustainable packaging suppliers, negotiates bulk pricing for campus food services, and reports plastic-reduction metrics automatically.",
    targetCustomer: "University food services and campus cafeterias in the US that have signed plastic-reduction pledges.",
    market: "The sustainable packaging market is projected to reach $240B by 2030; campus food services represent a concentrated, pledge-driven buyer segment.",
    businessModel: "12% commission on marketplace orders plus an annual sustainability-reporting subscription for campuses ($6K/year).",
    validation: "We interviewed 14 campus food service directors and 8 suppliers. Three cafeterias joined a pricing pilot.",
    competition: "Supply chain incumbents (Sysco, Aramark) offer sustainable lines but with limited catalog depth and no reporting. Direct supplier relationships are fragmented.",
    advantage: "Category-specific buying consortium for campuses with automated compliance reporting — neither suppliers nor incumbents provide the reporting layer.",
    team: [
      { name: "Jordan Lee", role: "Founder & CEO", detail: "UT Austin, supply chain" },
      { name: "Sam Rivera", role: "Co-founder & COO", detail: "UT Austin, public affairs" }
    ],
    useOfFunds: "40% supplier network and catalog, 25% platform engineering, 15% campus sales, 10% compliance reporting, 10% buffer.",
    milestones: [
      { name: "14 director interviews", done: true },
      { name: "3-cafeteria pricing pilot", done: true },
      { name: "First paid subscription", done: false }
    ],
    evidence: [
      { type: "Customer interviews", description: "14 food service directors interviewed.", status: "Under review", notes: "Notes provided; recordings pending." },
      { type: "Pilot results", description: "3 cafeterias in pricing pilot.", status: "Needs clarification", notes: "Please provide signed pilot terms." }
    ]
  },
  {
    id: "learnlabs", name: "LearnLabs", tagline: "Lab equipment sharing network for universities",
    sector: "EdTech", stage: "Pre-seed", location: "Berlin, Germany", logo: "#3b82f6",
    qualityGate: "review", score: 69, fundingAsk: "$160,000",
    submitted: "2026-07-22", lastActivity: "Yesterday",
    founder: { name: "Lena Fischer", college: "Technical University of Berlin", location: "Berlin, Germany", bio: "Masters in biotech engineering." },
    scoreBreak: { problem: 72, solution: 70, market: 68, validation: 64, businessModel: 69, team: 74 },
    problem: "University labs buy expensive equipment (PCR machines, spectrometers) that sits idle 60% of the time, while neighboring labs and startups can't afford their own.",
    solution: "LearnLabs is an equipment-sharing marketplace with insurance-backed bookings, IoT usage tracking, and institutional billing for universities.",
    targetCustomer: "Research universities and university-affiliated startups in Germany and the Netherlands.",
    market: "EU research institutions hold an estimated €45B in lab equipment; the lab-sharing market is nascent but growing with the maker-economy trend.",
    businessModel: "12% booking fee per rental plus institutional subscription for universities to list equipment ($5K/year).",
    validation: "We surveyed 90 researchers; 68% said they'd share underused equipment. 4 labs at TU Berlin signed an equipment-listing MoU.",
    competition: "BioRender and equipment registries are static directories. Large rental firms (Excedr) lease new equipment rather than share existing assets.",
    advantage: "Insurance and IoT-tracking layer that makes inter-lab sharing institutionally acceptable — the missing trust layer.",
    team: [
      { name: "Lena Fischer", role: "Founder & CEO", detail: "TU Berlin, biotech engineering" },
      { name: "Paul Weber", role: "Co-founder & CTO", detail: "TU Berlin, computer science" }
    ],
    useOfFunds: "40% platform and IoT hardware, 25% insurance partnerships, 20% pilot labs, 15% operations.",
    milestones: [
      { name: "90-researcher survey", done: true },
      { name: "4-lab MoU", done: true },
      { name: "Insurance partnership", done: false }
    ],
    evidence: [
      { type: "Surveys", description: "90 researchers surveyed; 68% willing to share.", status: "Under review", notes: "Survey instrument review in progress." },
      { type: "Supporting documents", description: "4-lab MoU and equipment list.", status: "Needs clarification", notes: "MoU signatures incomplete on one page." }
    ]
  }
];

const OPPORTUNITIES = [
  { id: "campus-innovation-fund", title: "Campus Innovation Fund — Fall Cycle", org: "University Venture Partners", category: "Grants", deadline: "Sep 30, 2026", eligibility: "Student-led startups with a working prototype", desc: "Non-dilutive grants up to $25,000 for student startups with validated problem statements. Includes 8 weeks of structured mentorship and access to the university technology transfer office.", perks: ["$25K non-dilutive grant", "8-week mentorship", "TTO support"] },
  { id: "founders-fellowship", title: "Founders Fellowship — Spring Cohort", org: "Campus Founders Lab", category: "Incubators", deadline: "Oct 15, 2026", eligibility: "Full-time students with an idea in early validation", desc: "A 12-week part-time incubator for student founders. Weekly build sessions, office hours with operating partners, and a demo day in front of 40+ early-stage investors.", perks: ["12-week program", "Weekly office hours", "Demo day"] },
  { id: "greentech-challenge", title: "GreenTech Challenge 2026", org: "Climate Action Alliance", category: "Competitions", deadline: "Sep 12, 2026", eligibility: "Student teams building climate solutions", desc: "National competition for student climate ventures. Regional finals, then a national showcase with $50,000 in prizes and introductions to climate-focused VCs.", perks: ["$50K prize pool", "VC introductions", "Regional events"] },
  { id: "hack-the-valley", title: "Hack the Valley — Fall Hackathon", org: "Hack the Valley Collective", category: "Hackathons", deadline: "Oct 2, 2026", eligibility: "Open to all students; teams of 2–5", desc: "48-hour hackathon focused on campus life and sustainability. Prizes include prototyping budgets and fast-track admission into partner incubators.", perks: ["48-hour build", "Prototyping budget", "Incubator fast-track"], type: "hackathon", applicationMode: "external", applicationUrl: "https://hackthevalley.dev/register" },
  { id: "agriseed-accelerator", title: "AgriSeed Accelerator", org: "Nourish Ventures", category: "Accelerators", deadline: "Nov 1, 2026", eligibility: "AgriTech startups with early validation", desc: "12-week accelerator for student AgriTech ventures in emerging markets. $50,000 investment for 8% equity, plus field access across partner farmer networks.", perks: ["$50K investment", "Field access", "12-week program"] },
  { id: "student-angel-network", title: "Student Angel Network — Deal Day", org: "Student Angel Network", category: "Investors", deadline: "Rolling", eligibility: "Quality Gate Passed startups seeking $50K–$500K", desc: "A network of 200+ angel investors focused exclusively on student founders. Monthly deal days where qualified startups pitch directly to the network.", perks: ["200+ angels", "Monthly deal days", "$50K–$500K checks"] },
  { id: "climate-launchpad", title: "Climate Launchpad National Finals", org: "ClimateLaunchpad", category: "Competitions", deadline: "Oct 20, 2026", eligibility: "Clean-tech startups with an idea or prototype", desc: "The world's largest green business ideas competition. National finals lead to a global finale with €1M+ in total prizes and coaching from climate investors.", perks: ["€1M+ prize pool", "Global finale", "Investor coaching"] },
  { id: "summer-research-grant", title: "Undergraduate Research Grant", org: "National Science Alliance", category: "Grants", deadline: "Dec 1, 2026", eligibility: "Undergraduates pursuing research-backed ventures", desc: "Grants up to $15,000 for undergraduates building research-backed ventures, including prototype materials and user-study costs.", perks: ["$15K grant", "Prototype funding", "User-study budget"] },
  { id: "founder-office-hours", title: "Founder Office Hours — Monthly", org: "Venture Connect Partners", category: "Startup Programs", deadline: "Monthly (next: Sep 5)", eligibility: "Any founder in the Venture Connect pipeline", desc: "Monthly 1:1 office hours with operating partners covering pricing, fundraising, and go-to-market. Open to founders at any stage of the quality gate journey.", perks: ["1:1 sessions", "Operators, not bankers", "Monthly availability"] },
  { id: "fintech-sandbox", title: "FinTech Sandbox Fellowship", org: "FinTech Sandbox", category: "Accelerators", deadline: "Oct 30, 2026", eligibility: "FinTech startups with a compliant-ready approach", desc: "A 10-week fellowship offering regulatory sandbox access, data partnerships, and mentorship from payments and banking operators.", perks: ["Regulatory sandbox", "Data partnerships", "10-week program"] },
  { id: "healthtech-bootcamp", title: "HealthTech Innovators Bootcamp", org: "MedFuture Institute", category: "Hackathons", deadline: "Sep 18, 2026", eligibility: "Student teams addressing campus health challenges", desc: "Weekend bootcamp pairing students with clinicians to build health solutions for campus communities. Fast-track into MediMind-style pilot programs.", perks: ["Clinician pairing", "Weekend format", "Pilot fast-track"], type: "hackathon", applicationMode: "external", applicationUrl: "https://medfuture.example/bootcamp/register" },
  { id: "women-in-tech-demo", title: "Women in Tech Demo Day", org: "SheBuilds Collective", category: "Startup Programs", deadline: "Nov 12, 2026", eligibility: "Student startups with at least one female founder", desc: "A curated demo day for women-led student startups, with pitch coaching, warm investor introductions, and a $20,000 top prize.", perks: ["Pitch coaching", "Investor intros", "$20K top prize"] },
  { id: "agritech-accelerator-2026", title: "AgriTech Student Accelerator 2026", org: "Example Incubator", category: "Incubators", deadline: "Oct 10, 2026", eligibility: "Student founders with early AgriTech prototypes", desc: "A 12-week accelerator for student AgriTech ventures. Cohort access to field partners, prototyping budget, and a demo day with agri-investors. Selected teams receive $25,000 and workspace.", perks: ["$25K support", "12-week cohort", "Demo day"] },
  { id: "campus-climate-fund-2026", title: "Campus Climate Fund 2026", org: "Meridian Capital", category: "Investors", deadline: "Sep 30, 2026", eligibility: "Student founders with climate ventures", desc: "Pre-seed funding opportunity from Meridian Capital for student climate startups. Rolling review after the Venture Connect Quality Gate; selected founders receive $10K–$50K via SAFE plus quarterly check-ins.", perks: ["$10K–$50K investment", "SAFE terms", "Rolling review"] },
  { id: "pre-seed-sprint-q4", title: "Pre-Seed Sprint Q4", org: "Meridian Capital", category: "Accelerators", deadline: "Nov 20, 2026", eligibility: "Pre-seed startups with early revenue", desc: "A 6-week sprint for pre-seed startups: weekly operating sessions, metrics review, and a closing investment committee. Draft listing — publishing soon.", perks: ["6-week sprint", "Operating sessions", "Committee access"] }
];

/* Enrich seed opportunities with the two-sided opportunity schema */
const OPPORTUNITY_EXTRA = {
  "campus-innovation-fund": { sector: "Other", stage: "Prototype", location: "On-campus", funding: "$25,000 grant", equity: "None", duration: "8 weeks", startDate: "Oct 20, 2026", status: "published", views: 486, createdBy: "University Venture Partners" },
  "founders-fellowship": { sector: "Other", stage: "Idea", location: "Hybrid", funding: "Program + mentorship", equity: "None", duration: "12 weeks", startDate: "Jan 12, 2027", status: "published", views: 412, createdBy: "Campus Founders Lab" },
  "greentech-challenge": { sector: "ClimateTech", stage: "Idea", location: "Remote", funding: "$50,000 prize pool", equity: "None", duration: "3 months", startDate: "Sep 25, 2026", status: "published", views: 601, createdBy: "Climate Action Alliance" },
  "hack-the-valley": { sector: "Other", stage: "Idea", location: "On-campus", funding: "Prototyping budget", equity: "None", duration: "48 hours", startDate: "Oct 2, 2026", status: "published", views: 355, createdBy: "Hack the Valley Collective", type: "hackathon", applicationMode: "external", applicationUrl: "https://hackthevalley.dev/register", teamRequirements: "Teams of 2–5", eventDate: "Oct 2, 2026" },
  "agriseed-accelerator": { sector: "AgriTech", stage: "Prototype", location: "Remote", funding: "$50,000 for 8%", equity: "8%", duration: "12 weeks", startDate: "Nov 15, 2026", status: "published", views: 389, createdBy: "Nourish Ventures" },
  "student-angel-network": { sector: "Other", stage: "MVP", location: "Remote", funding: "$50K–$500K checks", equity: "Negotiable", duration: "Rolling", startDate: "Rolling", status: "published", views: 524, createdBy: "Student Angel Network" },
  "climate-launchpad": { sector: "ClimateTech", stage: "Idea", location: "Remote", funding: "€1M+ prize pool", equity: "None", duration: "4 months", startDate: "Oct 25, 2026", status: "published", views: 447, createdBy: "ClimateLaunchpad" },
  "summer-research-grant": { sector: "DeepTech", stage: "Idea", location: "On-campus", funding: "$15,000 grant", equity: "None", duration: "10 weeks", startDate: "Jun 2027", status: "published", views: 268, createdBy: "National Science Alliance" },
  "founder-office-hours": { sector: "Other", stage: "Idea", location: "Online", funding: "None — free", equity: "None", duration: "1 hour sessions", startDate: "Monthly", status: "published", views: 340, createdBy: "Venture Connect Partners" },
  "fintech-sandbox": { sector: "FinTech", stage: "MVP", location: "Remote", funding: "Sandbox + data access", equity: "None", duration: "10 weeks", startDate: "Nov 30, 2026", status: "published", views: 296, createdBy: "FinTech Sandbox" },
  "healthtech-bootcamp": { sector: "HealthTech", stage: "Idea", location: "On-campus", funding: "Pilot fast-track", equity: "None", duration: "Weekend", startDate: "Sep 18, 2026", status: "published", views: 231, createdBy: "MedFuture Institute", type: "hackathon", applicationMode: "external", applicationUrl: "https://medfuture.example/bootcamp/register", teamRequirements: "Student teams", eventDate: "Sep 18, 2026" },
  "women-in-tech-demo": { sector: "Other", stage: "Idea", location: "Hybrid", funding: "$20,000 top prize", equity: "None", duration: "6 weeks", startDate: "Nov 12, 2026", status: "published", views: 318, createdBy: "SheBuilds Collective" },
  "agritech-accelerator-2026": { sector: "AgriTech", stage: "Prototype", location: "Mumbai, India / Hybrid", funding: "$25,000 + workspace", equity: "6%", duration: "12 weeks", startDate: "Nov 1, 2026", status: "published", views: 214, createdBy: "Example Incubator" },
  "campus-climate-fund-2026": { sector: "ClimateTech", stage: "Idea", location: "Remote", funding: "$10K–$50K via SAFE", equity: "SAFE", duration: "Rolling", startDate: "Oct 15, 2026", status: "published", views: 173, createdBy: "Meridian Capital" },
  "pre-seed-sprint-q4": { sector: "Other", stage: "Early Revenue", location: "Online", funding: "Committee access", equity: "Negotiable", duration: "6 weeks", startDate: "Dec 1, 2026", status: "draft", views: 0, createdBy: "Meridian Capital" }
};
OPPORTUNITIES.forEach(o => { Object.assign(o, OPPORTUNITY_EXTRA[o.id] || {}); if (!o.status) o.status = "published"; if (!o.applicationMode) o.applicationMode = "internal"; });

const OPP_CATEGORIES = ["Incubators", "Accelerators", "Investors", "Hackathons", "Competitions", "Grants", "Startup Programs"];

const DEFAULT_MESSAGES = {
  "verra-solar": {
    startupId: "verra-solar",
    partner: { name: "Sofia Reyes", role: "Founder, Verra Solar" },
    items: [
      { from: "partner", text: "Hi Nikhil, thanks for marking Verra Solar as interested! Happy to share our feasibility study from the California pilot campus.", time: "Mon, 9:41 AM" },
      { from: "me", text: "Thanks Sofia — that would be great. Can you also send the co-op ownership structure doc?", time: "Mon, 10:05 AM" },
      { from: "partner", text: "Sending both now. We also have updated numbers on the 22% instability reduction if you want the raw telemetry.", time: "Mon, 10:12 AM" }
    ]
  },
  "medimind": {
    startupId: "medimind",
    partner: { name: "Ethan Brooks", role: "Founder, MediMind" },
    items: [
      { from: "partner", text: "Hi Nikhil — following up on the validation study we discussed. The 94% triage accuracy figure now covers 312 simulated intakes.", time: "Tue, 2:20 PM" },
      { from: "me", text: "Great progress. What does the pilot timeline look like for spring go-live?", time: "Tue, 3:02 PM" },
      { from: "partner", text: "We're targeting a January soft launch with the campus health center. Happy to walk you through the integration plan.", time: "Tue, 3:14 PM" }
    ]
  },
  "vc-advisor": {
    startupId: null,
    partner: { name: "Rhea Kapoor", role: "VC Advisor, Venture Connect" },
    items: [
      { from: "partner", text: "Hi Aarav, your pitch deck landed well with the review committee. Two things to sharpen before the founder interview: pricing page depth and the co-op channel math.", time: "Fri, 11:20 AM" },
      { from: "me", text: "Thanks Rhea! I'll update the pricing section tonight. Should I also add the pilot cost breakdown?", time: "Fri, 11:48 AM" },
      { from: "partner", text: "Yes — the committee specifically asked for pilot cost per farm. Also book your interview slot: Sep 4 works on our side.", time: "Fri, 12:03 PM" }
    ]
  },
  "campus-fund": {
    startupId: null,
    partner: { name: "Campus Innovation Fund", role: "Incubator Partner" },
    items: [
      { from: "me", text: "Hello! We'd love to apply for the Fall cycle with EcoHarvest. Could you confirm the eligibility requirements?", time: "Wed, 4:30 PM" },
      { from: "partner", text: "Hi Aarav — absolutely. Student-led teams with a working prototype qualify. The Fall cycle deadline is Sep 30. Happy to review your workspace before you submit.", time: "Wed, 5:02 PM" }
    ]
  }
};

const AUTO_REPLIES = {
  "verra-solar": "Thanks — I'll get that over to you by end of day. Also happy to set up a walkthrough of the module design if useful.",
  "medimind": "Appreciate the quick reply. I'll send the integration plan and we can schedule a deep-dive next week.",
  "vc-advisor": "Noted. I'll flag your updates to the committee and confirm the interview slot shortly.",
  "campus-fund": "Great — looking forward to reviewing your workspace. Let us know if you need a template."
};

const DEFAULT_NOTIFICATIONS = [
  { icon: "scan", tone: "success", text: "EcoHarvest passed the Automated Quality Check — 12/12 checks green.", time: "2h ago", read: false },
  { icon: "eye", tone: "violet", text: "Meridian Capital viewed your startup profile.", time: "5h ago", read: false },
  { icon: "briefcase", tone: "info", text: "New opportunity: AgriSeed Accelerator is accepting applications until Nov 1.", time: "1d ago", read: true },
  { icon: "shield", tone: "violet", text: "Quality Gate: your Pitch Review is scheduled for this week.", time: "2d ago", read: true }
];

/* Fictional portfolio (investor profile) */
const DEMO_INVESTOR = {
  name: "Nikhil Rao",
  org: "Meridian Capital",
  focus: "Pre-seed student ventures with early validation",
  sectors: ["ClimateTech", "FinTech", "HealthTech"],
  stage: "Pre-seed / Seed",
  geography: "India, Southeast Asia",
  ticket: "$25K – $250K",
  portfolio: ["SolvKart", "Nimbus Labs", "RootMetric"],
  bio: "Early-stage investor focused on student founders with working pilots. Previously led programs at a national innovation foundation; angel in 14 startups across climate and fintech."
};

/* ============================================================
   AUTHENTICATION — option lists, demo accounts, profiles
   ============================================================ */

const FOUNDER_TYPES = ["Student Founder", "Student Team", "Early-stage Founder"];
const INDUSTRIES = ["AI", "AgriTech", "FinTech", "HealthTech", "EdTech", "ClimateTech", "SaaS", "DeepTech", "Hardware", "Other"];
const STARTUP_STAGES = ["Idea Stage", "Prototype", "MVP", "Early Revenue"];
const INVESTOR_SECTORS = ["AI", "FinTech", "AgriTech", "HealthTech", "EdTech", "ClimateTech", "DeepTech", "SaaS", "Consumer", "Hardware", "Robotics", "Other"];
const INVESTOR_STAGES = ["Idea Stage", "Pre-Seed", "Seed", "Series A", "Series B+", "MVP Stage", "Early Revenue"];
const TICKET_SIZES = ["₹1L–₹10L", "₹10L–₹50L", "₹50L–₹1Cr", "₹1Cr+", "Custom"];
const GEOGRAPHIES = ["India", "Andhra Pradesh", "South India", "India + Global", "Global"];
const INCUBATOR_ORG_TYPES = ["College Incubator", "Government Incubator", "Private Incubator", "University Incubator", "Corporate Incubator", "Independent Incubator"];
const INCUBATOR_SECTORS = ["AI", "AgriTech", "FinTech", "HealthTech", "Health", "EdTech", "ClimateTech", "DeepTech", "SaaS", "Hardware", "Other"];
const INCUBATOR_STAGES = ["Idea Stage", "Pre-Seed", "MVP", "Early Revenue"];
const SUPPORT_TYPES = ["Mentorship", "Funding", "Workspace", "Technical Support", "Business Development", "Market Access", "Networking", "Prototype Support", "Other"];
const ORGANIZER_TYPES = ["College", "University", "Company", "Startup", "Community", "Government Organization", "NGO", "Independent Organizer"];
const HACKATHON_DOMAINS = ["AI", "Web Development", "Hardware", "Robotics", "FinTech", "AgriTech", "ClimateTech", "HealthTech", "Other"];
const AUTH_LOCATIONS = ["India", "Global", "Other"];

const DEMO_ACCOUNTS = [
  { email: "aarav@example.com", password: "demo1234", name: "Aarav Mehta", role: "founder" },
  { email: "nikhil@meridian.example", password: "demo1234", name: "Nikhil Rao", role: "investor" },
  { email: "hello@exampleincubator.io", password: "demo1234", name: "Priya Nair", role: "incubator" },
  { email: "events@hackvalley.dev", password: "demo1234", name: "Rahul Verma", role: "organizer" }
];

const DEMO_INCUBATOR = {
  name: "Priya Nair",
  email: "hello@exampleincubator.io",
  phone: "+91 98200 11223",
  org: "Example Incubator",
  orgType: "Independent Incubator",
  website: "exampleincubator.io",
  location: "Mumbai, India",
  sectors: ["AgriTech", "ClimateTech"],
  stages: ["Idea Stage", "Pre-Seed", "MVP"],
  support: ["Mentorship", "Workspace", "Funding", "Market Access"],
  duration: "12 weeks",
  funding: "$25,000 + workspace",
  equity: "6%",
  description: "An independent incubator for student ventures in agriculture and climate. Runs cohort programs with field partners and a demo day for early-stage investors."
};

const DEMO_ORGANIZER = {
  name: "Rahul Verma",
  email: "events@hackvalley.dev",
  phone: "+91 99000 44556",
  org: "Hack the Valley Collective",
  orgType: "Community",
  website: "hackthevalley.dev",
  location: "Bangalore, India",
  about: "A student-run community organizing 48-hour hackathons focused on campus life and sustainability across India.",
  domains: ["AI", "Web Development", "ClimateTech", "FinTech"]
};

/* ============================================================
   INTERNAL VENTURE CONNECT REVIEW SYSTEM
   The Quality Gate pipeline — internal, not a founder feature.
   ============================================================ */

const INTERNAL_STAGES = [
  { key: "submitted", name: "Application Submitted", icon: "send", group: "Pipeline" },
  { key: "auto-check", name: "Automated Quality Check", icon: "scan", group: "Quality control" },
  { key: "vc-review", name: "Venture Connect Review", icon: "shield", group: "Review" },
  { key: "pitch-review", name: "Pitch Review", icon: "present", group: "Review" },
  { key: "interview", name: "Founder Interview", icon: "users", group: "Review" },
  { key: "validation", name: "Evidence / Validation Verification", icon: "verify", group: "Verification" },
  { key: "gate", name: "Quality Gate Decision", icon: "trophy", group: "Decision" },
  { key: "unlocked", name: "Unlocked for Investor / Incubator Review", icon: "eye", group: "Access" }
];

/* Founder-facing status mapping (simple statuses only — the internal
   Quality Gate pipeline is never exposed as a founder-controlled flow) */
function founderAppStatus(app) {
  if (!app) return { label: "Application Submitted", tone: "info" };
  if (typeof Store !== "undefined" && Store.applicationStatus) {
    const lifecycleStatus = Store.applicationStatus(app);
    if (lifecycleStatus === "Editing Window Open" || lifecycleStatus === "Updated — Under Review") return { label: lifecycleStatus, tone: "info" };
    if (lifecycleStatus === "Review Target Reached") return { label: lifecycleStatus, tone: "warning" };
    if (lifecycleStatus === "Clarification Requested") return { label: lifecycleStatus, tone: "warning" };
    if (lifecycleStatus === "Approved for Organization Review") return { label: lifecycleStatus, tone: "success" };
    if (lifecycleStatus === "Not Approved") return { label: lifecycleStatus, tone: "danger" };
  }
  if (app.rejected) return { label: "Not Selected", tone: "danger" };
  if (app.needsRevision) return { label: "Needs Revision", tone: "warning" };
  const st = app.stage;
  if (st >= 6) return app.gate && app.gate.decision === "passed"
    ? { label: "Approved for Investor/Incubator Review", tone: "success" }
    : { label: "Under Review", tone: "info" };
  if (st === 5) return { label: "Validation Review", tone: "info" };
  if (st === 4) return { label: "Interview", tone: "info" };
  if (st === 3) return { label: "Pitch Review", tone: "info" };
  if (st === 0) return { label: "Application Submitted", tone: "info" };
  return { label: "Under Venture Connect Review", tone: "info" };
}

const INTERNAL_USER = {
  name: "Venture Connect Review",
  org: "Venture Connect",
  role: "Quality Control",
  bio: "Internal quality-control team. Reviews every application before it reaches investors and incubators."
};

const SEED_APPLICATIONS = [
  {
    id: "app-ecoharvest-agri",
    startupId: "ecoharvest",
    opportunityId: "agritech-accelerator-2026",
    submitted: "2026-08-24",
    lastUpdate: "Aug 26, 2026",
    stage: 3,
    needsRevision: false,
    rejected: false,
    vcReview: { decision: "approved", notes: "Problem and validation are strong. Pricing page and co-op channel math flagged — founder updated both. Application is credible for pre-seed.", reviewedAt: "Aug 25, 2026" },
    pitch: {
      scores: { quality: null, problem: null, solution: null, market: null, communication: null, businessModel: null, evidence: null },
      decision: null,
      notes: ""
    },
    interview: { scheduled: "Sep 4, 2026 · 10:00 AM", completed: false, notes: "", decision: null },
    evidenceNotes: {},
    gate: { decision: null, notes: "", decidedAt: null }
  },
  {
    id: "app-fieldpilot-climate",
    startupId: "fieldpilot",
    opportunityId: "campus-climate-fund-2026",
    submitted: "2026-08-10",
    lastUpdate: "Aug 20, 2026",
    stage: 7,
    needsRevision: false,
    rejected: false,
    vcReview: { decision: "approved", notes: "Clear water-savings claim backed by pilot data. Approved for next stage.", reviewedAt: "Aug 12, 2026" },
    pitch: {
      scores: { quality: 84, problem: 88, solution: 85, market: 78, communication: 82, businessModel: 76, evidence: 86 },
      decision: "pass",
      notes: "Strong command of field economics. Co-op distribution plan is the differentiator."
    },
    interview: { scheduled: "Aug 18, 2026 · 4:00 PM", completed: true, notes: "Held. Team is execution-focused; water-meter verification plan confirmed.", decision: "pass" },
    evidenceNotes: { "Pilot results": "Meter data cross-checked with farm records — verified." },
    gate: { decision: "passed", notes: "All verification checks complete. Quality Gate passed.", decidedAt: "Aug 20, 2026" }
  },
  {
    id: "app-paypulse-climate",
    startupId: "paypulse",
    opportunityId: "campus-climate-fund-2026",
    submitted: "2026-08-12",
    lastUpdate: "Aug 22, 2026",
    stage: 7,
    needsRevision: false,
    rejected: false,
    vcReview: { decision: "approved", notes: "Regulatory-first wedge is compelling. Approved.", reviewedAt: "Aug 14, 2026" },
    pitch: {
      scores: { quality: 80, problem: 83, solution: 79, market: 76, communication: 85, businessModel: 82, evidence: 74 },
      decision: "pass",
      notes: "Clear path to licensing; unit economics need monitoring."
    },
    interview: { scheduled: "Aug 20, 2026 · 11:30 AM", completed: true, notes: "Held. Compliance timeline realistic.", decision: "pass" },
    evidenceNotes: { "Pilot results": "Transaction log audited — verified." },
    gate: { decision: "passed", notes: "Quality Gate passed.", decidedAt: "Aug 22, 2026" }
  },
  {
    id: "app-sustaincart-green",
    startupId: "sustaincart",
    opportunityId: "greentech-challenge",
    submitted: "2026-08-22",
    lastUpdate: "Aug 25, 2026",
    stage: 1,
    needsRevision: true,
    rejected: false,
    vcReview: { decision: null, notes: "" },
    pitch: { scores: { quality: null, problem: null, solution: null, market: null, communication: null, businessModel: null, evidence: null }, decision: null, notes: "" },
    interview: { scheduled: "", completed: false, notes: "", decision: null },
    evidenceNotes: {},
    gate: { decision: null, notes: "", decidedAt: null }
  }
];
