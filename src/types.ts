export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'boy' | 'girl' | 'other';
}

export interface GrowthRecord {
  id: string;
  date: string;
  height: number; // cm
  weight: number; // kg
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
