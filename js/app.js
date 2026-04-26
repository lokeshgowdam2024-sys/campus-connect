function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId + 'Page').classList.add('active-page');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if(btn.getAttribute('data-page') === pageId) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    if(pageId === 'dashboard') window.updateDashboardStats();
    if(pageId === 'leaderboard') window.renderLeaderboard();
    if(pageId === 'tasks') window.renderTasks();
    if(pageId === 'home') window.updateHomeStats();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = btn.getAttribute('data-page');
        if(page) switchPage(page);
    });
});

const exploreBtn = document.getElementById('exploreDemoBtn');
if(exploreBtn) {
    exploreBtn.addEventListener('click', () => switchPage('dashboard'));
}

const demoLoginBtn = document.getElementById('demoLoginBtn');
if(demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
        const demo = window.ambassadors.find(a => a.name === "Aditya Sharma");
        if(demo) {
            window.currentUser = { id: demo.id, name: demo.name, role: "ambassador", points: demo.points, streak: demo.streak };
        }
        window.showToast(`Welcome back, ${window.currentUser.name}! You have ${window.currentUser.points} points.`, "#2c5282");
        window.updateGamificationWidget();
        switchPage('dashboard');
    });
}

const managerLoginBtn = document.getElementById('managerLoginBtn');
if(managerLoginBtn) {
    managerLoginBtn.addEventListener('click', () => {
        window.showToast("Manager View Active — you can see all ambassador analytics and leaderboard.", "#1E3C72");
        switchPage('dashboard');
        window.updateDashboardStats();
        window.renderLeaderboard();
    });
}

window.loadFromLocalStorage();
window.updateAllUI();