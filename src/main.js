import "./style.css";

const ui = {
  page: "experience",
  dark: localStorage.getItem("cc_theme") === "dark",
  mobileMenu: false,
  loading: false,
  confetti: false,
  showModal: false,
  modalType: null
};

let pointerBound = false;

const platform = {
  me: {
    id: 1,
    name: "Aditya Sharma",
    role: "Campus Ambassador",
    campus: "IIT Delhi",
    points: 1250,
    streak: 5,
    wallet: 420,
    avatar: "https://ui-avatars.com/api/?background=4f46e5&color=fff&bold=true&name=Aditya+Sharma",
    badges: ["Rising Star", "Social Butterfly"],
    email: "aditya.sharma@iitd.ac.in",
    joined: "Jan 2025",
    rank: "Top 3%"
  },
  ambassadors: [
    { id: 1, name: "Aditya Sharma", level: "Gold", points: 1250, avatar: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Aditya+Sharma", badges: ["Rising Star", "Social Butterfly"] },
    { id: 2, name: "Rahul Mehta", level: "Diamond", points: 2140, avatar: "https://ui-avatars.com/api/?background=0f766e&color=fff&name=Rahul+Mehta", badges: ["Top Performer", "Streak Master"] },
    { id: 3, name: "Anjali Singh", level: "Platinum", points: 1870, avatar: "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Anjali+Singh", badges: ["Referral King"] },
    { id: 4, name: "Neha Verma", level: "Silver", points: 980, avatar: "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=Neha+Verma", badges: ["Content Creator"] },
    { id: 5, name: "Priya Kapoor", level: "Bronze", points: 560, avatar: "https://ui-avatars.com/api/?background=be185d&color=fff&name=Priya+Kapoor", badges: [] }
  ],
  feed: [
    { actor: "Rahul", detail: "closed 3 referrals in 20 mins", score: "+150", time: "2m ago", kind: "referral" },
    { actor: "Aditya", detail: "won weekly social sprint", score: "+90", time: "12m ago", kind: "social" },
    { actor: "Neha", detail: "posted campaign reel", score: "+120", time: "1h ago", kind: "creative" },
    { actor: "Anjali", detail: "completed blog challenge", score: "+80", time: "2h ago", kind: "content" }
  ],
  tasks: [
    { id: 1, title: "Instagram Story Sprint", proof: "Story link", points: 30, difficulty: "Easy", category: "social", participants: 26 },
    { id: 2, title: "Referral Blitz", proof: "Referral screenshot", points: 100, difficulty: "Medium", category: "referral", participants: 19 },
    { id: 3, title: "Campus Blog Push", proof: "Published URL", points: 80, difficulty: "Hard", category: "content", participants: 14 },
    { id: 4, title: "Brand Reel Weekend", proof: "Video URL", points: 120, difficulty: "Expert", category: "creative", participants: 9 }
  ],
  campaigns: [
    { name: "Launchwave 3.0", progress: 68, vibe: "from-indigo-500 to-purple-500", active: "2.4k reach", eta: "6 days left" },
    { name: "Referral Storm", progress: 82, vibe: "from-emerald-500 to-teal-500", active: "312 signups", eta: "2 days left" },
    { name: "Creator Clash", progress: 39, vibe: "from-pink-500 to-rose-500", active: "89 submissions", eta: "11 days left" }
  ],
  events: [
    { date: "Mon", title: "Campaign War Room", by: "Program Manager", status: "Live" },
    { date: "Wed", title: "Influencer AMA Session", by: "Growth Team", status: "Upcoming" },
    { date: "Fri", title: "Weekly Leaderboard Reveal", by: "Automation Bot", status: "Scheduled" }
  ],
  rewards: [
    { title: "Premium Hoodie", cost: 450, stock: "12 left" },
    { title: "Creator Toolkit", cost: 300, stock: "34 left" },
    { title: "Early Internship Pass", cost: 700, stock: "5 left" }
  ],
  announcements: [
    "New referral multiplier active this weekend",
    "Top 10 ambassadors get private mentoring",
    "Double points on reels for next 24 hours"
  ],
  squads: [
    { name: "North Ninjas", members: 22, momentum: 84, theme: "from-cyan-400 to-blue-500" },
    { name: "Creator Collective", members: 18, momentum: 73, theme: "from-violet-400 to-purple-500" },
    { name: "Referral Raiders", members: 20, momentum: 91, theme: "from-emerald-400 to-teal-500" }
  ],
  academyTracks: [
    { title: "Growth Fundamentals", lessons: 12, completed: 67 },
    { title: "Content Machine", lessons: 9, completed: 42 },
    { title: "Community Building", lessons: 14, completed: 58 }
  ],
  integrations: [
    { name: "Notion Sync", status: "Connected", latency: "120ms" },
    { name: "Email Automation", status: "Healthy", latency: "95ms" },
    { name: "Rewards API", status: "Connected", latency: "88ms" },
    { name: "Proof Validator", status: "Stable", latency: "102ms" }
  ],
  automationRules: [
    "Auto-award points on proof validation",
    "Trigger reminder if task inactive for 48h",
    "Push leaderboard recap every Friday",
    "Alert manager on sudden drop in engagement"
  ],
  weeklyGoals: [
    { name: "Reach 300 referrals", progress: 76 },
    { name: "Publish 120 content tasks", progress: 51 },
    { name: "Maintain 80% retention", progress: 63 }
  ]
};

const tabs = [
  { id: "experience", label: "Experience" },
  { id: "mission", label: "Mission Control" },
  { id: "tasks", label: "Tasks" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "community", label: "Community" },
  { id: "studio", label: "Studio" }
];

const tones = {
  social: "from-cyan-400 to-blue-500",
  referral: "from-emerald-400 to-teal-500",
  content: "from-violet-400 to-purple-500",
  creative: "from-pink-400 to-rose-500"
};

function notify(message, isError = false) {
  const node = document.createElement("div");
  node.className = `xp-toast ${isError ? "xp-toast-error" : ""}`;
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2300);
}

function sortedBoard() {
  return [...platform.ambassadors].sort((a, b) => b.points - a.points);
}

function badge(index) {
  return index === 0 ? "1st" : index === 1 ? "2nd" : index === 2 ? "3rd" : `#${index + 1}`;
}

function pageSkeleton() {
  return `
    <main class="xp-wrap py-10">
      <div class="xp-panel p-8 animate-pulse mb-5"><div class="xp-skel h-8 w-72 mb-3"></div><div class="xp-skel h-4 w-96"></div></div>
      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        ${Array.from({ length: 4 }).map(() => `<div class="xp-panel p-6 animate-pulse"><div class="xp-skel h-4 w-28 mb-4"></div><div class="xp-skel h-9 w-16"></div></div>`).join("")}
      </div>
    </main>
  `;
}

function ticker() {
  const text = [...platform.announcements, ...platform.announcements].join("  •  ");
  return `
    <section class="xp-ticker">
      <div class="xp-ticker-track">${text}</div>
    </section>
  `;
}

function hero() {
  return `
    <section class="xp-hero">
      <p class="xp-kicker">Campus Ambassador Command Center</p>
      <h1>Not just dashboards.<br/>This is <span>growth gameplay</span>.</h1>
      <p>Launch campaigns, run events, reward performers, and build campus momentum from one dramatic interface.</p>
      <div class="flex flex-wrap gap-3 mt-7">
        <button id="goMission" class="xp-btn">Open Mission Control</button>
        <button data-page="tasks" class="xp-btn xp-btn-soft">Start a Challenge</button>
      </div>
      <div class="xp-hero-grid">
        <article><h3>2.4k</h3><p>Active Reach</p></article>
        <article><h3>87%</h3><p>Weekly Completion</p></article>
        <article><h3>312</h3><p>Referrals This Sprint</p></article>
      </div>
    </section>
  `;
}

function modalHTML() {
  if (!ui.showModal) return "";
  
  if (ui.modalType === "campaign") {
    return `
      <div class="xp-modal-backdrop" id="modalBackdrop">
        <div class="xp-modal">
          <h3 class="text-xl font-bold mb-4">Create New Campaign</h3>
          <input type="text" id="campaignName" class="xp-input w-full mb-3" placeholder="Campaign Name">
          <input type="text" id="campaignGoal" class="xp-input w-full mb-3" placeholder="Goal (e.g., 10k reach)">
          <div class="flex gap-3">
            <button id="confirmCampaign" class="xp-btn flex-1">Create</button>
            <button id="closeModal" class="xp-btn xp-btn-soft flex-1">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  
  if (ui.modalType === "rule") {
    return `
      <div class="xp-modal-backdrop" id="modalBackdrop">
        <div class="xp-modal">
          <h3 class="text-xl font-bold mb-4">Create Automation Rule</h3>
          <input type="text" id="ruleName" class="xp-input w-full mb-3" placeholder="Rule Name">
          <select id="ruleTrigger" class="xp-input w-full mb-3">
            <option value="task_complete">Task Completed</option>
            <option value="streak_milestone">Streak Milestone</option>
            <option value="points_milestone">Points Milestone</option>
          </select>
          <div class="flex gap-3">
            <button id="confirmRule" class="xp-btn flex-1">Create Rule</button>
            <button id="closeModal" class="xp-btn xp-btn-soft flex-1">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  
  if (ui.modalType === "squad") {
    return `
      <div class="xp-modal-backdrop" id="modalBackdrop">
        <div class="xp-modal">
          <h3 class="text-xl font-bold mb-4">Launch New Squad</h3>
          <input type="text" id="squadName" class="xp-input w-full mb-3" placeholder="Squad Name">
          <input type="text" id="squadTheme" class="xp-input w-full mb-3" placeholder="Squad Theme (e.g., Creators)">
          <div class="flex gap-3">
            <button id="confirmSquad" class="xp-btn flex-1">Launch Squad</button>
            <button id="closeModal" class="xp-btn xp-btn-soft flex-1">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  
  if (ui.modalType === "profile") {
    return `
      <div class="xp-modal-backdrop" id="modalBackdrop">
        <div class="xp-modal xp-modal-profile">
          <div class="text-center">
            <img src="${platform.me.avatar}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500">
            <h3 class="text-xl font-bold">${platform.me.name}</h3>
            <p class="text-indigo-400 text-sm">${platform.me.role}</p>
            <p class="text-gray-400 text-sm">${platform.me.campus}</p>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-4 p-4 bg-gray-800/30 rounded-xl">
            <div><span class="text-gray-400 text-xs">Points</span><p class="font-bold">${platform.me.points}</p></div>
            <div><span class="text-gray-400 text-xs">Streak</span><p class="font-bold">${platform.me.streak} days</p></div>
            <div><span class="text-gray-400 text-xs">Wallet</span><p class="font-bold">${platform.me.wallet} pts</p></div>
            <div><span class="text-gray-400 text-xs">Rank</span><p class="font-bold">${platform.me.rank}</p></div>
          </div>
          <div class="mt-4">
            <p class="text-gray-400 text-xs">Email: ${platform.me.email}</p>
            <p class="text-gray-400 text-xs">Joined: ${platform.me.joined}</p>
          </div>
          <div class="flex gap-3 mt-4">
            <button id="closeModal" class="xp-btn flex-1">Close</button>
          </div>
        </div>
      </div>
    `;
  }
  
  return "";
}

function experiencePage() {
  const top = sortedBoard().slice(0, 4);
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      ${ticker()}
      ${hero()}

      <section class="grid lg:grid-cols-12 gap-4">
        <article class="xp-panel p-6 lg:col-span-8">
          <div class="flex items-center justify-between mb-4"><h3 class="xp-title">Active Campaigns</h3><button id="createCampaignBtn" class="xp-link">Create Campaign +</button></div>
          <div class="space-y-4">
            ${platform.campaigns.map((c) => `
              <div class="xp-campaign">
                <div class="flex items-start justify-between mb-2"><div><h4>${c.name}</h4><p>${c.active}</p></div><span>${c.eta}</span></div>
                <div class="xp-progress"><div class="bg-gradient-to-r ${c.vibe}" style="width:${c.progress}%"></div></div>
              </div>
            `).join("")}
          </div>
        </article>

        <aside class="xp-panel p-6 lg:col-span-4">
          <h3 class="xp-title mb-4">Live Feed</h3>
          <div class="space-y-3">
            ${platform.feed.map((f) => `
              <div class="xp-feed-row">
                <span class="xp-feed-dot bg-gradient-to-r ${tones[f.kind]}"></span>
                <div class="flex-1"><p><strong>${f.actor}</strong> ${f.detail}</p><small>${f.time}</small></div>
                <span class="xp-pill">${f.score}</span>
              </div>
            `).join("")}
          </div>
        </aside>
      </section>

      <section class="grid lg:grid-cols-3 gap-4">
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Events Calendar</h3>
          <div class="space-y-3">
            ${platform.events.map((e) => `
              <div class="xp-event">
                <span>${e.date}</span>
                <div><p>${e.title}</p><small>${e.by}</small></div>
                <em>${e.status}</em>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Rewards Store</h3>
          <div class="space-y-3">
            ${platform.rewards.map((r) => `
              <div class="xp-reward">
                <div><p>${r.title}</p><small>${r.stock}</small></div>
                <button class="xp-btn xp-btn-mini redeem" data-cost="${r.cost}" data-title="${r.title}">${r.cost} pts</button>
              </div>
            `).join("")}
          </div>
          <p class="mt-4 xp-muted">Wallet Balance: <strong>${platform.me.wallet}</strong> points</p>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Top Ambassadors</h3>
          <div class="space-y-3">
            ${top.map((u, i) => `
              <div class="xp-rank-row">
                <img src="${u.avatar}" alt="${u.name}">
                <div><p>${u.name}</p><small>${u.points} pts</small></div>
                <span>${badge(i)}</span>
              </div>
            `).join("")}
          </div>
        </article>
      </section>
    </main>
  `;
}

function missionPage() {
  const line = [32, 45, 56, 62, 74, 85, 93];
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      <section class="xp-panel p-8">
        <p class="xp-kicker">Mission Control</p>
        <h2 class="text-4xl font-black">Everything that powers momentum.</h2>
      </section>
      <section class="grid lg:grid-cols-2 gap-4">
        <article class="xp-panel p-6">
          <div class="flex justify-between items-center mb-4"><h3 class="xp-title">Growth Curve</h3><span class="xp-tag">Quarter View</span></div>
          <div class="xp-bars">${line.map((v) => `<div><span style="height:${v}%"></span></div>`).join("")}</div>
        </article>
        <article class="xp-panel p-6">
          <div class="flex justify-between items-center mb-4"><h3 class="xp-title">Funnel Stages</h3><span class="xp-tag">Live</span></div>
          <div class="space-y-4">
            ${[
              ["Prospects", 86, "from-cyan-400 to-blue-500"],
              ["Onboarded", 72, "from-indigo-400 to-violet-500"],
              ["Activated", 58, "from-violet-400 to-purple-500"],
              ["Advocates", 41, "from-pink-400 to-rose-500"]
            ].map((f) => `<div><div class="flex justify-between mb-1"><small>${f[0]}</small><small>${f[1]}%</small></div><div class="xp-progress"><div class="bg-gradient-to-r ${f[2]}" style="width:${f[1]}%"></div></div></div>`).join("")}
          </div>
        </article>
      </section>
      <section class="grid lg:grid-cols-3 gap-4">
        <article class="xp-panel p-6">
          <h3 class="xp-title">Automation Rules</h3>
          <ul class="xp-list" id="rulesList">
            ${platform.automationRules.map((rule) => `<li>${rule}</li>`).join("")}
          </ul>
          <button id="createRuleBtn" class="xp-btn mt-4 w-full">Create New Rule +</button>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title">Announcement Studio</h3>
          <p class="xp-muted mb-4">Broadcast updates to all ambassadors.</p>
          <textarea id="announcementText" class="xp-input min-h-[110px] w-full" placeholder="Write an update to all ambassadors..."></textarea>
          <button id="sendAnnouncement" class="xp-btn mt-3 w-full">Broadcast</button>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title">Weekly Goals</h3>
          <div class="space-y-3">
            ${platform.weeklyGoals.map((g) => `<div><div class="flex justify-between text-sm mb-1"><span>${g.name}</span><span>${g.progress}%</span></div><div class="xp-progress"><div class="bg-gradient-to-r from-emerald-400 to-teal-500" style="width:${g.progress}%"></div></div></div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `;
}

function tasksPage() {
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      <section class="xp-panel p-8"><p class="xp-kicker">Challenge Engine</p><h2 class="text-4xl font-black">Take missions. Drop proof. Stack points.</h2></section>
      <section class="grid lg:grid-cols-12 gap-4">
        <div class="lg:col-span-8 space-y-4">
          ${platform.tasks.map((t) => `
            <article class="xp-panel p-6 xp-task">
              <div class="flex justify-between items-start gap-4 mb-4">
                <div>
                  <div class="inline-flex items-center gap-2 mb-2"><span class="xp-chip bg-gradient-to-r ${tones[t.category]}"></span><small class="uppercase">${t.category}</small></div>
                  <h3>${t.title}</h3>
                  <p class="xp-muted text-sm">Proof required: ${t.proof}</p>
                </div>
                <div class="text-right"><strong class="text-3xl">+${t.points}</strong><p class="xp-muted text-xs">${t.difficulty}</p></div>
              </div>
              <div class="xp-progress mb-4"><div class="bg-gradient-to-r ${tones[t.category]}" style="width:${Math.min(95, t.participants * 3)}%"></div></div>
              <div class="flex flex-col sm:flex-row gap-3">
                <input id="proof_${t.id}" class="xp-input flex-1" placeholder="Paste ${t.proof}..." />
                <button class="xp-btn submit" data-id="${t.id}" data-points="${t.points}">Submit Mission</button>
              </div>
            </article>
          `).join("")}
        </div>
        <aside class="lg:col-span-4 space-y-4">
          <article class="xp-panel p-6">
            <h3 class="xp-title mb-4">Your Profile</h3>
            <div class="xp-profile" id="profileTrigger">
              <img src="${platform.me.avatar}" alt="${platform.me.name}">
              <div><p>${platform.me.name}</p><small>${platform.me.role} • ${platform.me.campus}</small></div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="xp-mini"><span>Points</span><strong>${platform.me.points}</strong></div>
              <div class="xp-mini"><span>Streak</span><strong>${platform.me.streak}d</strong></div>
            </div>
          </article>
          <article class="xp-panel p-6">
            <h3 class="xp-title mb-4">Badge Vault</h3>
            <div class="flex flex-wrap gap-2">${platform.me.badges.map((b) => `<span class="xp-badge">${b}</span>`).join("")}</div>
          </article>
        </aside>
      </section>
    </main>
  `;
}

function leaderboardPage() {
  const list = sortedBoard();
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      <section class="xp-panel p-8"><p class="xp-kicker">Leaderboard Arena</p><h2 class="text-4xl font-black">Compete. Rise. Get rewarded.</h2></section>
      <section class="xp-panel p-5 md:p-7">
        ${list.map((p, i) => `
          <div class="xp-board-row">
            <span class="xp-rank-badge">${badge(i)}</span>
            <div class="xp-user"><img src="${p.avatar}" alt="${p.name}"><div><p>${p.name}</p><small>${p.level}</small></div></div>
            <strong>${p.points}</strong>
            <div class="text-right">${(p.badges.length ? p.badges.slice(0, 2) : ["No badges"]).map((b) => `<span class="xp-badge ml-1">${b}</span>`).join("")}</div>
          </div>
        `).join("")}
      </section>
    </main>
  `;
}

function communityPage() {
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      <section class="xp-panel p-8">
        <p class="xp-kicker">Community Grid</p>
        <h2 class="text-4xl font-black">Build culture, not just campaigns.</h2>
      </section>
      <section class="grid lg:grid-cols-12 gap-4">
        <article class="xp-panel p-6 lg:col-span-7">
          <div class="flex justify-between items-center mb-4">
            <h3 class="xp-title">Squad Momentum</h3>
            <button id="createSquadBtn" class="xp-link">Launch New Squad +</button>
          </div>
          <div class="space-y-4" id="squadsList">
            ${platform.squads.map((s) => `
              <div class="xp-squad">
                <div class="flex items-center justify-between mb-2"><div><p>${s.name}</p><small>${s.members} active members</small></div><strong>${s.momentum}%</strong></div>
                <div class="xp-progress"><div class="bg-gradient-to-r ${s.theme}" style="width:${s.momentum}%"></div></div>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="xp-panel p-6 lg:col-span-5">
          <h3 class="xp-title mb-4">Campus Stories</h3>
          <div class="xp-story-grid">
            ${platform.ambassadors.slice(0, 4).map((a, idx) => `
              <div class="xp-story">
                <img src="${a.avatar}" alt="${a.name}">
                <div><p>${a.name}</p><small>${idx % 2 ? "Posted a reel" : "Hosted a meetup"}</small></div>
              </div>
            `).join("")}
          </div>
        </article>
      </section>
      <section class="grid lg:grid-cols-2 gap-4">
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Ambassador Academy</h3>
          <div class="space-y-4">
            ${platform.academyTracks.map((track) => `
              <div>
                <div class="flex justify-between text-sm mb-1"><span>${track.title}</span><span>${track.completed}%</span></div>
                <div class="xp-progress"><div class="bg-gradient-to-r from-indigo-400 to-fuchsia-500" style="width:${track.completed}%"></div></div>
                <small class="xp-muted">${track.lessons} lessons</small>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Community Perks</h3>
          <ul class="xp-list">
            <li>Private creator circle for top 25 performers</li>
            <li>Monthly networking sessions with founders</li>
            <li>Rapid feedback loops on submitted content</li>
            <li>Tier-based swag unlocks and referrals multiplier</li>
          </ul>
          <button id="createSquadBtn2" class="xp-btn mt-4 w-full">Launch New Squad</button>
        </article>
      </section>
    </main>
  `;
}

function studioPage() {
  return `
    <main class="xp-wrap py-8 pb-24 md:pb-8 space-y-6">
      <section class="xp-panel p-8">
        <p class="xp-kicker">Automation Studio</p>
        <h2 class="text-4xl font-black">Design workflows for zero-chaos operations.</h2>
      </section>
      <section class="grid lg:grid-cols-3 gap-4">
        <article class="xp-panel p-6 lg:col-span-2">
          <h3 class="xp-title mb-4">Workflow Canvas</h3>
          <div class="xp-flow">
            <div>Task Assigned</div>
            <span>→</span>
            <div>Proof Verified</div>
            <span>→</span>
            <div>Points Awarded</div>
            <span>→</span>
            <div>Badge Trigger</div>
            <span>→</span>
            <div>Leaderboard Sync</div>
          </div>
          <button id="createRuleBtnStudio" class="xp-btn mt-5">Create New Rule</button>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Quick Launch</h3>
          <div class="space-y-3">
            <button id="quickRecapBtn" class="xp-action">Run Weekly Recap Broadcast</button>
            <button id="quickInsightsBtn" class="xp-action">Generate Campus Insights PDF</button>
            <button id="quickRewardsBtn" class="xp-action">Open Reward Fulfillment Queue</button>
            <button id="quickBoostBtn" class="xp-action">Start 24h Double Points Boost</button>
          </div>
        </article>
      </section>
      <section class="grid lg:grid-cols-2 gap-4">
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Integrations Health</h3>
          <div class="space-y-3">
            ${platform.integrations.map((i) => `
              <div class="xp-int-row">
                <div><p>${i.name}</p><small>${i.status}</small></div>
                <span>${i.latency}</span>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="xp-panel p-6">
          <h3 class="xp-title mb-4">Announcements</h3>
          <div class="space-y-2">
            ${platform.announcements.map((a) => `<p class="xp-muted text-sm">📢 ${a}</p>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `;
}

function navHtml() {
  return tabs.map((t) => `<button data-page="${t.id}" class="xp-nav ${ui.page === t.id ? "active" : ""}">${t.label}</button>`).join("");
}

function mobileHtml() {
  return tabs.map((t) => `<button data-page="${t.id}" class="xp-tab ${ui.page === t.id ? "active" : ""}">${t.label}</button>`).join("");
}

function shell(content) {
  return `
    <div class="xp-app ${ui.dark ? "theme-dark" : "theme-light"}">
      <div class="xp-orb xp-orb-a"></div>
      <div class="xp-orb xp-orb-b"></div>
      <div class="xp-grid-overlay"></div>
      <div id="cursorGlow" class="xp-cursor-glow"></div>
      <header class="xp-top">
        <div class="xp-wrap h-16 flex items-center justify-between">
          <div class="xp-brand"><span>CC</span><div><p>Campus Connect</p><small>Ambassador OS</small></div></div>
          <nav class="hidden md:flex items-center gap-2">${navHtml()}</nav>
          <div class="flex items-center gap-2">
            <button id="theme" class="xp-icon">${ui.dark ? "🌙" : "☀️"}</button>
            <button id="menu" class="xp-icon md:hidden">☰</button>
          </div>
        </div>
      </header>
      ${ui.mobileMenu ? `<div class="xp-mobile-menu md:hidden">${navHtml()}</div>` : ""}
      <div class="xp-page">${content}</div>
      <nav class="xp-mobile-tabs md:hidden">${mobileHtml()}</nav>
      ${modalHTML()}
    </div>
  `;
}

function runConfetti() {
  const layer = document.createElement("div");
  layer.className = "xp-confetti";
  document.body.appendChild(layer);
  for (let i = 0; i < 80; i += 1) {
    const piece = document.createElement("div");
    piece.className = "xp-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.background = ["#22d3ee", "#6366f1", "#ec4899", "#f59e0b"][i % 4];
    layer.appendChild(piece);
  }
  setTimeout(() => layer.remove(), 2400);
}

function go(page) {
  ui.page = page;
  ui.mobileMenu = false;
  ui.loading = true;
  render();
  setTimeout(() => {
    ui.loading = false;
    render();
  }, 350);
}

function submitTask(id, points) {
  const input = document.getElementById(`proof_${id}`);
  const task = platform.tasks.find((t) => t.id === id);
  if (!task || !input || !input.value.trim()) {
    notify("Add proof first.", true);
    return;
  }
  const me = platform.ambassadors.find((a) => a.id === platform.me.id);
  if (!me) return;
  me.points += points;
  platform.me.points = me.points;
  platform.me.streak += 1;

  let unlocked = "";
  if (me.points >= 2000 && !me.badges.includes("Elite Ambassador")) {
    me.badges.push("Elite Ambassador");
    platform.me.badges.push("Elite Ambassador");
    unlocked = "Elite Ambassador";
  }
  if (platform.me.streak >= 7 && !me.badges.includes("Streak Master")) {
    me.badges.push("Streak Master");
    platform.me.badges.push("Streak Master");
    unlocked = "Streak Master";
  }
  platform.feed.unshift({ actor: "Aditya", detail: `completed ${task.title}`, score: `+${points}`, time: "just now", kind: task.category });
  if (platform.feed.length > 8) platform.feed.pop();
  input.value = "";

  if (unlocked) {
    ui.confetti = true;
    notify(`🎉 Badge unlocked: ${unlocked}! 🎉`);
  } else {
    notify(`✅ Mission submitted! +${points} points awarded.`);
  }
  render();
}

function redeem(cost, title) {
  if (platform.me.wallet < cost) {
    notify("Insufficient wallet points.", true);
    return;
  }
  platform.me.wallet -= cost;
  notify(`🎁 Redeemed: ${title}! Check your email for details.`);
  render();
}

function showModal(type) {
  ui.showModal = true;
  ui.modalType = type;
  render();
}

function hideModal() {
  ui.showModal = false;
  ui.modalType = null;
  render();
}

function createCampaign() {
  const name = document.getElementById("campaignName")?.value;
  const goal = document.getElementById("campaignGoal")?.value;
  if (!name || !goal) {
    notify("Please fill both fields", true);
    return;
  }
  platform.campaigns.unshift({
    name: name,
    progress: 0,
    vibe: "from-indigo-500 to-purple-500",
    active: goal,
    eta: "New"
  });
  notify(`🚀 Campaign "${name}" created successfully!`);
  hideModal();
  render();
}

function createRule() {
  const name = document.getElementById("ruleName")?.value;
  const trigger = document.getElementById("ruleTrigger")?.value;
  if (!name) {
    notify("Please enter a rule name", true);
    return;
  }
  platform.automationRules.unshift(`${name} (trigger: ${trigger})`);
  notify(`⚙️ Automation rule "${name}" created!`);
  hideModal();
  render();
}

function createSquad() {
  const name = document.getElementById("squadName")?.value;
  const theme = document.getElementById("squadTheme")?.value;
  if (!name) {
    notify("Please enter a squad name", true);
    return;
  }
  platform.squads.unshift({
    name: name,
    members: 1,
    momentum: 0,
    theme: theme === "Creators" ? "from-violet-400 to-purple-500" : "from-cyan-400 to-blue-500"
  });
  notify(`👥 Squad "${name}" launched! Invite members to grow.`);
  hideModal();
  render();
}

function sendAnnouncement() {
  const text = document.getElementById("announcementText")?.value;
  if (!text) {
    notify("Please write an announcement", true);
    return;
  }
  platform.announcements.unshift(text);
  notify(`📢 Announcement sent to all ${platform.ambassadors.length} ambassadors!`);
  document.getElementById("announcementText").value = "";
  render();
}

function quickAction(action) {
  const actions = {
    recap: "📊 Weekly recap broadcast sent to all ambassadors!",
    insights: "📄 Campus Insights PDF generated and downloaded!",
    rewards: "💰 Reward fulfillment queue opened. 5 pending rewards.",
    boost: "⚡ Double points activated for next 24 hours! 🎉"
  };
  notify(actions[action]);
  if (action === "boost") {
    ui.confetti = true;
    render();
    setTimeout(() => { ui.confetti = false; render(); }, 2400);
  }
}

function bind() {
  document.querySelectorAll("[data-page]").forEach((el) => el.addEventListener("click", () => go(el.getAttribute("data-page"))));

  const goMission = document.getElementById("goMission");
  if (goMission) goMission.onclick = () => go("mission");

  const theme = document.getElementById("theme");
  if (theme) {
    theme.onclick = () => {
      ui.dark = !ui.dark;
      localStorage.setItem("cc_theme", ui.dark ? "dark" : "light");
      render();
    };
  }

  const menu = document.getElementById("menu");
  if (menu) {
    menu.onclick = () => {
      ui.mobileMenu = !ui.mobileMenu;
      render();
    };
  }

  const profileTrigger = document.getElementById("profileTrigger");
  if (profileTrigger) profileTrigger.onclick = () => showModal("profile");

  const createCampaignBtn = document.getElementById("createCampaignBtn");
  if (createCampaignBtn) createCampaignBtn.onclick = () => showModal("campaign");
  
  const createRuleBtn = document.getElementById("createRuleBtn");
  if (createRuleBtn) createRuleBtn.onclick = () => showModal("rule");
  
  const createRuleBtnStudio = document.getElementById("createRuleBtnStudio");
  if (createRuleBtnStudio) createRuleBtnStudio.onclick = () => showModal("rule");
  
  const createSquadBtn = document.getElementById("createSquadBtn");
  if (createSquadBtn) createSquadBtn.onclick = () => showModal("squad");
  
  const createSquadBtn2 = document.getElementById("createSquadBtn2");
  if (createSquadBtn2) createSquadBtn2.onclick = () => showModal("squad");
  
  const sendAnnounceBtn = document.getElementById("sendAnnouncement");
  if (sendAnnounceBtn) sendAnnounceBtn.onclick = sendAnnouncement;
  
  const confirmCampaign = document.getElementById("confirmCampaign");
  if (confirmCampaign) confirmCampaign.onclick = createCampaign;
  
  const confirmRule = document.getElementById("confirmRule");
  if (confirmRule) confirmRule.onclick = createRule;
  
  const confirmSquad = document.getElementById("confirmSquad");
  if (confirmSquad) confirmSquad.onclick = createSquad;
  
  const closeModal = document.getElementById("closeModal");
  if (closeModal) closeModal.onclick = hideModal;
  
  const modalBackdrop = document.getElementById("modalBackdrop");
  if (modalBackdrop) modalBackdrop.onclick = (e) => { if (e.target === modalBackdrop) hideModal(); };
  
  const quickRecapBtn = document.getElementById("quickRecapBtn");
  if (quickRecapBtn) quickRecapBtn.onclick = () => quickAction("recap");
  
  const quickInsightsBtn = document.getElementById("quickInsightsBtn");
  if (quickInsightsBtn) quickInsightsBtn.onclick = () => quickAction("insights");
  
  const quickRewardsBtn = document.getElementById("quickRewardsBtn");
  if (quickRewardsBtn) quickRewardsBtn.onclick = () => quickAction("rewards");
  
  const quickBoostBtn = document.getElementById("quickBoostBtn");
  if (quickBoostBtn) quickBoostBtn.onclick = () => quickAction("boost");

  document.querySelectorAll(".submit").forEach((btn) => {
    btn.addEventListener("click", () => submitTask(Number(btn.getAttribute("data-id")), Number(btn.getAttribute("data-points"))));
  });

  document.querySelectorAll(".redeem").forEach((btn) => {
    btn.addEventListener("click", () => redeem(Number(btn.getAttribute("data-cost")), btn.getAttribute("data-title")));
  });

  setupMotionAndInteractivity();
}

function setupMotionAndInteractivity() {
  const panels = document.querySelectorAll(".xp-panel");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.1 });

  panels.forEach((panel, idx) => {
    panel.classList.add("xp-reveal");
    observer.observe(panel);
    if (idx < 14) {
      panel.classList.add("xp-tilt");
      panel.addEventListener("mousemove", (e) => {
        const rect = panel.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        panel.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
      });
      panel.addEventListener("mouseleave", () => {
        panel.style.transform = "";
      });
    }
  });

  if (!pointerBound) {
    pointerBound = true;
    document.addEventListener("mousemove", (e) => {
      const glow = document.getElementById("cursorGlow");
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;

  const pages = {
    experience: experiencePage,
    mission: missionPage,
    tasks: tasksPage,
    leaderboard: leaderboardPage,
    community: communityPage,
    studio: studioPage
  };

  app.innerHTML = shell(ui.loading ? pageSkeleton() : pages[ui.page]());
  bind();
  if (ui.confetti) {
    runConfetti();
    ui.confetti = false;
  }
}

render();