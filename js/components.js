window.renderLeaderboard = function() {
    const sorted = [...window.ambassadors].sort((a,b) => b.points - a.points);
    const container = document.getElementById('leaderboardList');
    if(!container) return;
    container.innerHTML = sorted.map((a, idx) => `
        <li class="leaderboard-item">
            <div><span class="rank">${idx+1}</span> <strong>${a.name}</strong> ${idx===0 ? '👑' : ''}</div>
            <div><span class="badge">${a.points} pts</span> ${a.badges.slice(0,2).join(', ')}</div>
        </li>
    `).join('');
};

window.renderTasks = function() {
    const container = document.getElementById('taskContainer');
    if(!container) return;
    container.innerHTML = `<h3><i class="fas fa-check-circle"></i> Available Challenges</h3>`;
    window.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.innerHTML = `
            <div><strong>${task.title}</strong><br><span class="text-small">➕ ${task.points} points | ${task.proofRequired}</span></div>
            <div>
                <input type="text" id="proof_${task.id}" placeholder="Paste link / proof" style="width:180px; margin-right:8px;">
                <button class="submit-task" data-id="${task.id}" data-points="${task.points}">Submit ✅</button>
            </div>
        `;
        container.appendChild(taskDiv);
    });
    
    document.querySelectorAll('.submit-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(btn.getAttribute('data-id'));
            const points = parseInt(btn.getAttribute('data-points'));
            const proofInput = document.getElementById(`proof_${taskId}`);
            const proofValue = proofInput.value.trim();
            if (!proofValue) {
                window.showToast("📎 Please provide proof link!", "#e67e22");
                return;
            }
            window.showToast(`✅ Task verified! +${points} points awarded to ${window.currentUser.name}`, "#27ae60");
            const ambassadorIndex = window.ambassadors.findIndex(a => a.name === window.currentUser.name);
            if(ambassadorIndex !== -1) {
                window.ambassadors[ambassadorIndex].points += points;
                window.ambassadors[ambassadorIndex].streak += 1;
                window.currentUser.points = window.ambassadors[ambassadorIndex].points;
                window.currentUser.streak = window.ambassadors[ambassadorIndex].streak;
                window.activities.unshift(`🎉 ${window.currentUser.name} completed "${window.tasks.find(t=>t.id===taskId).title}" +${points} pts`);
                if(window.activities.length > 8) window.activities.pop();
                if(window.ambassadors[ambassadorIndex].points >= 2000 && !window.ambassadors[ambassadorIndex].badges.includes("🏅 Elite Ambassador")) {
                    window.ambassadors[ambassadorIndex].badges.push("🏅 Elite Ambassador");
                    window.showToast("🌟 New Badge Unlocked: Elite Ambassador!", "#f39c12");
                }
                if(window.ambassadors[ambassadorIndex].streak >= 7 && !window.ambassadors[ambassadorIndex].badges.includes("🔥 Streak Master")) {
                    window.ambassadors[ambassadorIndex].badges.push("🔥 Streak Master");
                    window.showToast("🔥 Badge Unlocked: Streak Master!", "#e67e22");
                }
            }
            window.updateAllUI();
            proofInput.value = "";
        });
    });
};

window.updateAllUI = function() {
    window.renderLeaderboard();
    window.renderTasks();
    window.updateDashboardStats();
    window.updateActivityFeed();
    window.updateGamificationWidget();
    window.updateHomeStats();
    window.saveToLocalStorage();
};