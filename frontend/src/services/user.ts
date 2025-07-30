import { apiService } from './api';
import { 
  User, 
  Mission, 
  UserMission, 
  Level, 
  XPCalculation,
  ApiResponse,
  PaginatedResponse 
} from '@/types';

export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    return apiService.get('/users/profile');
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put('/users/profile', data);
  },

  async getUserMissions(): Promise<ApiResponse<UserMission[]>> {
    return apiService.get('/users/missions');
  },

  async startMission(missionId: string): Promise<ApiResponse<UserMission>> {
    return apiService.post(`/users/missions/${missionId}/start`);
  },

  async updateMissionProgress(
    missionId: string, 
    progress: number
  ): Promise<ApiResponse<UserMission>> {
    return apiService.patch(`/users/missions/${missionId}/progress`, { progress });
  },

  async completeMission(missionId: string): Promise<ApiResponse<UserMission>> {
    return apiService.post(`/users/missions/${missionId}/complete`);
  },

  async getXPCalculation(): Promise<ApiResponse<XPCalculation>> {
    return apiService.get('/users/xp-calculation');
  },

  async getLevels(): Promise<ApiResponse<Level[]>> {
    return apiService.get('/users/levels');
  },

  async getUserStats(): Promise<ApiResponse<{
    totalMissions: number;
    completedMissions: number;
    currentStreak: number;
    longestStreak: number;
    totalXP: number;
    level: number;
  }>> {
    return apiService.get('/users/stats');
  },
};

export const missionService = {
  async getAllMissions(params?: {
    page?: number;
    limit?: number;
    category?: string;
    difficulty?: string;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<Mission>>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const url = `/missions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(url);
  },

  async getMission(id: string): Promise<ApiResponse<Mission>> {
    return apiService.get(`/missions/${id}`);
  },

  async createMission(data: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Mission>> {
    return apiService.post('/missions', data);
  },

  async updateMission(id: string, data: Partial<Mission>): Promise<ApiResponse<Mission>> {
    return apiService.put(`/missions/${id}`, data);
  },

  async deleteMission(id: string): Promise<ApiResponse<null>> {
    return apiService.delete(`/missions/${id}`);
  },
};
