import { Users, Trophy, TrendingUp, Activity, Zap } from 'lucide';

export function Dashboard(totalAmbassadors: number, totalPoints: number, completionRate: number, activities: any[]): string {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div class="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 text-white mb-8">
        <h2 class="text-3xl font-bold mb-2 flex items-center gap-3"><span class="w-8 h-8">📊</span> Ambassador Analytics</h2>
        <p class="opacity-80">Track engagement, completion rates, and top contributors in real-time.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        ${[
          { icon: Users, value: totalAmbassadors, label: 'Total Ambassadors', gradient: 'from-violet-500 to-purple-600' },
          { icon: Trophy, value: totalPoints, label: 'Total Points Earned', gradient: 'from-amber-500 to-orange-600' },
          { icon: TrendingUp, value: completionRate + '%', label: 'Completion Rate', gradient: 'from-emerald-500 to-teal-600' }
        ].map(stat => `
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3">
              ${stat.icon({ class: 'w-6 h-6 text-white' })}
            </div>
            <div class="text-3xl font-bold text-gray-900">${stat.value}</div>
            <div class="text-gray-500 text-sm">${stat.label}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><span class="w-5 h-5">🔥</span> Recent Activity Feed</h3>
        <div class="space-y-3">
          ${activities.slice(0, 5).map(act => `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"><span class="text-primary-600">⚡</span></div>
              <span class="text-gray-700">${act.message}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}