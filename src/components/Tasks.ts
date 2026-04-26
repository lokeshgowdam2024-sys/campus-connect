import { Calendar, Sparkles, Upload } from 'lucide';

export function Tasks(tasks: any[], currentUser: any, onTaskSubmit: (taskId: number, points: number, proof: string) => void): string {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div class="bg-gradient-to-br from-primary-700 via-cyan-800 to-teal-900 rounded-3xl p-8 text-white mb-8">
        <h2 class="text-3xl font-bold mb-2 flex items-center gap-3"><span class="w-8 h-8">✅</span> Active Tasks & Challenges</h2>
        <p>Upload proof → Earn points → Climb leaderboard.</p>
      </div>
      
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Available Challenges</h3>
        <div class="space-y-3">
          ${tasks.map(task => `
            <div class="flex flex-wrap items-center justify-between p-4 bg-gray-50 rounded-xl gap-3">
              <div class="flex-1">
                <div class="font-medium text-gray-900">${task.title}</div>
                <div class="text-sm text-gray-500">+${task.points} points • ${task.proofRequired}</div>
              </div>
              <div class="flex gap-2">
                <input type="text" id="proof_${task.id}" placeholder="Paste link / proof" class="px-4 py-2 border border-gray-200 rounded-xl text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <button data-task-id="${task.id}" data-points="${task.points}" class="submit-task-btn bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
                  Submit
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">🏅 My Gamification Status</h3>
        <div class="flex flex-wrap gap-6">
          <div><span class="text-amber-600">🔥 Current Streak:</span> <span class="font-bold text-xl">${currentUser.streak}</span> days</div>
          <div><span class="text-amber-600">🏆 Badges Earned:</span> <span class="font-medium">${currentUser.badges?.join(', ') || 'No badges yet'}</span></div>
        </div>
      </div>
    </div>
  `;
}