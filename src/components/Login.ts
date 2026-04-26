import { LogIn, Briefcase, GraduationCap } from 'lucide';

export function Login(onAmbassadorLogin: () => void, onManagerLogin: () => void): string {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div class="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl p-8 text-white text-center mb-8">
        <h2 class="text-3xl font-bold mb-2 flex items-center justify-center gap-3"><span class="w-8 h-8">🔐</span> Demo Access</h2>
        <p>Click below to simulate login (pre-filled demo ambassador).</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 card-hover">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎓</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Ambassador Demo</h3>
          <p class="text-gray-500 mb-4">Login as Aditya Sharma and submit tasks</p>
          <button id="ambassadorDemoBtn" class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium w-full transition-all">Login as Ambassador</button>
        </div>
        
        <div class="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 card-hover">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">👔</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Manager Demo</h3>
          <p class="text-gray-500 mb-4">View analytics, leaderboard, and insights</p>
          <button id="managerDemoBtn" class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium w-full transition-all">Login as Manager</button>
        </div>
      </div>
      
      <div class="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
        <p class="text-blue-700">💡 This is a prototype — credentials not required. Try task submission & see real-time points update!</p>
      </div>
    </div>
  `;
}