export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  level: number;
  currentXP: number;
  totalXP: number;
  character?: Character;
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  sprite: string;
  accessories: CharacterAccessory[];
  createdAt: string;
  updatedAt: string;
}

export interface CharacterAccessory {
  id: string;
  type: 'hair' | 'eyes' | 'clothes' | 'weapon' | 'hat';
  item: string;
  color?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  deadline?: string;
  progress?: number;
  maxProgress?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Level {
  level: number;
  requiredXP: number;
  title: string;
  description: string;
  rewards: LevelReward[];
}

export interface LevelReward {
  id: string;
  type: 'badge' | 'title' | 'character_item' | 'special';
  name: string;
  description: string;
  icon?: string;
}

export interface UserMission {
  id: string;
  userId: string;
  missionId: string;
  mission: Mission;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
  startedAt?: string;
  completedAt?: string;
}

export interface AuthUser {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  firstName: string;
  lastName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface XPCalculation {
  currentLevel: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressPercentage: number;
  nextLevel: Level;
}
