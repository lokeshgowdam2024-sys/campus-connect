export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  toast.className = `fixed bottom-6 right-6 ${colors[type]} text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in text-sm font-medium`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

export function formatDate(date: Date): string {
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.floor((date.getTime() - Date.now()) / 86400000),
    'day'
  );
}

export function calculateRank(points: number): string {
  if (points >= 2000) return 'Diamond';
  if (points >= 1500) return 'Platinum';
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}