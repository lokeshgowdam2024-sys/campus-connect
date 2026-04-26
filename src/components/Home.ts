import { Users, CheckSquare, Flame, ArrowRight } from 'lucide';

export function Home(ambassadorCount: number, tasksCompleted: number, totalPoints: number): string {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div class="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 rounded-3xl p-8 md:p-12 text-white mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">🚀 Automate. Engage. Scale.</h1>
        <p class="text-lg md:text-xl opacity-90 mb-6">Turn your campus ambassadors into a high-performance growth engine.</p>
        <button id="exploreBtn" class="bg-amber-400 hover:bg-amber-500 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg">
          Explore Dashboard <span class="w-4 h-4">→</span>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        ${[
          { icon: Users, value: ambassadorCount, label: 'Active Ambassadors', color: 'from-blue-500 to-blue-600' },
          { icon: CheckSquare, value: tasksCompleted, label: 'Tasks Completed', color: 'from-emerald-500 to-emerald-600' },
          { icon: Flame, value: (totalPoints / 1000).toFixed(1) + 'k', label: 'Total Points Earned', color: 'from-orange-500 to-red-500' }
        ].map(stat => `
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center">
                ${stat.icon({ class: 'w-6 h-6 text-white' })}
              </div>
            </div>
            <div class="text-3xl font-bold text-gray-900">${stat.value}</div>
            <div class="text-gray-500 text-sm mt-1">${stat.label}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Why Campus Connect?</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-3"><span class="text-emerald-500">✅</span><span>Automated task workflows & proof verification</span></div>
          <div class="flex items-start gap-3"><span class="text-emerald-500">✅</span><span>Real-time leaderboard & gamification</span></div>
          <div class="flex items-start gap-3"><span class="text-emerald-500">✅</span><span>Identify top performers & measure ROI</span></div>
          <div class="flex items-start gap-3"><span class="text-emerald-500">✅</span><span>Centralized hub — no more spreadsheets</span></div>
        </div>
      </div>
    </div>
  `;
}