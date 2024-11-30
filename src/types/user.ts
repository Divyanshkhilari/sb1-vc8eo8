export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}