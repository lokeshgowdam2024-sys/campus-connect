import { Crown, Medal, TrendingUp } from 'lucide';

export function Leaderboard(ambassadors: any[]): string {
  const sorted = [...ambassadors].sort((a, b) => b.points - a.points);
  const medals = ['👑', '🥈', '🥉'];
  
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 text-white mb-8">
        <h2 class="text-3xl font-bold mb-2 flex items-center gap-3"><span class="w-8 h-8">🏆</span> Top Performers</h2>
        <p>Real-time points ranking. Top 3 get exclusive rewards!</p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="divide-y divide-gray-100">
          ${sorted.map((a, idx) => `
            <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 text-center">
                  ${idx < 3 ? `<span class="text-2xl">${medals[idx]}</span>` : `<span class="text-gray-400 font-medium">#${idx + 1}</span>`}
                </div>
                <div>
                  <div class="font-semibold text-gray-900">${a.name}</div>
                  <div class="text-xs text-gray-500">${a.badges.slice(0, 2).join(', ') || 'Rising star'}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="bg-primary-50 px-3 py-1 rounded-full">
                  <span class="text-primary-700 font-bold">${a.points}</span>
                  <span class="text-primary-500 text-sm"> pts</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}