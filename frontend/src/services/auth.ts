import { apiService } from './api';
import { 
  AuthUser, 
  LoginCredentials, 
  RegisterCredentials, 
  ApiResponse 
} from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    return apiService.post('/auth/login', credentials);
  },

  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthUser>> {
    return apiService.post('/auth/register', credentials);
  },

  async logout(): Promise<ApiResponse<null>> {
    return apiService.post('/auth/logout');
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiService.post('/auth/refresh');
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiService.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<ApiResponse<null>> {
    return apiService.post('/auth/reset-password', { token, password });
  },

  async verifyEmail(token: string): Promise<ApiResponse<null>> {
    return apiService.post('/auth/verify-email', { token });
  },

  async googleAuth(token: string): Promise<ApiResponse<AuthUser>> {
    return apiService.post('/auth/google', { token });
  },

  async githubAuth(code: string): Promise<ApiResponse<AuthUser>> {
    return apiService.post('/auth/github', { code });
  },
};
