import { Handshake, LayoutDashboard, CheckSquare, Trophy, LogIn } from 'lucide';

export function Navbar(activePage: string, onNavigate: (page: string) => void): string {
  const navItems = [
    { id: 'home', label: 'Home', icon: Handshake },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'login', label: 'Login', icon: LogIn }
  ];

  return `
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
              <span class="text-white text-lg">🎓</span>
            </div>
            <span class="font-bold text-xl bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">Campus Connect</span>
          </div>
          <div class="flex gap-1">
            ${navItems.map(item => `
              <button 
                data-page="${item.id}"
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${activePage === item.id ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}"
              >
                ${activePage === item.id ? '' : ''}
                ${item.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </nav>
  `;
}