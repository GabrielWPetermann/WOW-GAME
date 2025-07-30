import { create } from 'zustand';
import { Mission, UserMission } from '@/types';

interface MissionState {
  missions: Mission[];
  userMissions: UserMission[];
  isLoading: boolean;
  setMissions: (missions: Mission[]) => void;
  setUserMissions: (userMissions: UserMission[]) => void;
  updateMissionProgress: (missionId: string, progress: number) => void;
  completeMission: (missionId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  missions: [],
  userMissions: [],
  isLoading: false,

  setMissions: (missions: Mission[]) => {
    set({ missions });
  },

  setUserMissions: (userMissions: UserMission[]) => {
    set({ userMissions });
  },

  updateMissionProgress: (missionId: string, progress: number) => {
    const userMissions = get().userMissions.map((userMission) =>
      userMission.missionId === missionId
        ? { ...userMission, progress, status: 'in_progress' as const }
        : userMission
    );
    set({ userMissions });
  },

  completeMission: (missionId: string) => {
    const userMissions = get().userMissions.map((userMission) =>
      userMission.missionId === missionId
        ? { 
            ...userMission, 
            status: 'completed' as const, 
            completedAt: new Date().toISOString() 
          }
        : userMission
    );
    set({ userMissions });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
