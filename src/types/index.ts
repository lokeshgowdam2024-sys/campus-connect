export interface Ambassador {
  id: number;
  name: string;
  points: number;
  streak: number;
  badges: string[];
  avatar?: string;
}

export interface Task {
  id: number;
  title: string;
  points: number;
  proofRequired: string;
  category: 'social' | 'referral' | 'content' | 'creative';
  status: 'pending' | 'completed';
}

export interface Activity {
  id: string;
  message: string;
  timestamp: Date;
  type: 'task' | 'badge' | 'referral';
}

export interface User {
  id: number;
  name: string;
  role: 'ambassador' | 'manager';
  points: number;
  streak: number;
}