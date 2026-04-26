import type { Ambassador, Task, Activity, User } from '../types';

export const ambassadors = ref<Ambassador[]>([
  { id: 1, name: "Aditya Sharma", points: 1250, streak: 5, badges: ["🚀 Rising Star", "🤝 Social Butterfly"] },
  { id: 2, name: "Neha Verma", points: 980, streak: 3, badges: ["📸 Content Creator"] },
  { id: 3, name: "Rahul Mehta", points: 2140, streak: 12, badges: ["🏆 Top Performer", "🔥 Streak Master"] },
  { id: 4, name: "Priya K.", points: 560, streak: 2, badges: [] },
  { id: 5, name: "Anjali Singh", points: 1870, streak: 7, badges: ["💪 Referral King"] }
]);

export const activities = ref<Activity[]>([
  { id: "1", message: "Aditya completed 'Social Media Post' +50 pts", timestamp: new Date(), type: 'task' },
  { id: "2", message: "Rahul referred 3 new signups +150 pts", timestamp: new Date(), type: 'referral' },
  { id: "3", message: "Neha uploaded story proof +30 pts", timestamp: new Date(), type: 'task' }
]);

export const tasks = ref<Task[]>([
  { id: 1, title: "Share Instagram Story", points: 30, proofRequired: "Screenshot URL", category: 'social', status: 'pending' },
  { id: 2, title: "Refer a Friend", points: 100, proofRequired: "Referral email", category: 'referral', status: 'pending' },
  { id: 3, title: "Write Campus Blog", points: 80, proofRequired: "Blog link", category: 'content', status: 'pending' },
  { id: 4, title: "Create Brand Reel", points: 120, proofRequired: "Video link", category: 'creative', status: 'pending' }
]);

export const currentUser = ref<User>({
  id: 1,
  name: "Aditya Sharma",
  role: "ambassador",
  points: 1250,
  streak: 5
});

function saveToLocalStorage() {
  localStorage.setItem('cc_ambassadors', JSON.stringify(ambassadors.value));
  localStorage.setItem('cc_activities', JSON.stringify(activities.value));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('cc_ambassadors');
  if (stored) {
    ambassadors.value = JSON.parse(stored);
    const actStored = localStorage.getItem('cc_activities');
    if (actStored) activities.value = JSON.parse(actStored);
    const current = ambassadors.value.find(a => a.name === currentUser.value.name);
    if (current) {
      currentUser.value.points = current.points;
      currentUser.value.streak = current.streak;
    }
  }
}

export function addPoints(userId: number, points: number, taskTitle: string) {
  const ambassador = ambassadors.value.find(a => a.id === userId);
  if (ambassador) {
    ambassador.points += points;
    ambassador.streak += 1;
    
    if (ambassador.points >= 2000 && !ambassador.badges.includes("🏅 Elite Ambassador")) {
      ambassador.badges.push("🏅 Elite Ambassador");
      showToast("🌟 New Badge Unlocked: Elite Ambassador!");
    }
    if (ambassador.streak >= 7 && !ambassador.badges.includes("🔥 Streak Master")) {
      ambassador.badges.push("🔥 Streak Master");
      showToast("🔥 Badge Unlocked: Streak Master!");
    }
    
    activities.value.unshift({
      id: Date.now().toString(),
      message: `${ambassador.name} completed "${taskTitle}" +${points} pts`,
      timestamp: new Date(),
      type: 'task'
    });
    
    if (activities.value.length > 10) activities.value.pop();
    saveToLocalStorage();
  }
}

export function getTotalPoints(): number {
  return ambassadors.value.reduce((sum, a) => sum + a.points, 0);
}

loadFromLocalStorage();