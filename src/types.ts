export interface User {
  id: string;
  name: string;
  role: 'parent' | 'guardian';
  avatar?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'boy' | 'girl' | 'other';
  bloodType?: string;
  allergies?: string[];
}

export interface GrowthRecord {
  id: string;
  date: string;
  height: number; // cm
  weight: number; // kg
}

export interface ToyUsage {
  id: string;
  toyName: string;
  minutes: number;
  lastUsed: string;
  icon: string;
}

export interface CarStatus {
  connected: boolean;
  model: string;
  location: string;
  temperature: number;
  childInCar: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'medical' | 'education' | 'play' | 'milestone';
}

export interface UsageStats {
  totalMinutes: number;
  limitMinutes: number;
  apps: { name: string; minutes: number; icon: string }[];
}

export interface Recommendation {
  title: string;
  content: string;
  category: 'health' | 'education' | 'activity' | 'milestone';
}
