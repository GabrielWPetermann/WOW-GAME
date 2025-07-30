import { Level } from '@/types';

export const LEVELS: Level[] = [
  { level: 1, requiredXP: 0, title: 'Novato', description: 'Bem-vindo à jornada!', rewards: [] },
  { level: 2, requiredXP: 100, title: 'Aprendiz', description: 'Você está pegando o jeito!', rewards: [] },
  { level: 3, requiredXP: 250, title: 'Aventureiro', description: 'A aventura está apenas começando!', rewards: [] },
  { level: 4, requiredXP: 450, title: 'Explorador', description: 'Desbravando novos territórios!', rewards: [] },
  { level: 5, requiredXP: 700, title: 'Guerreiro', description: 'Força e determinação!', rewards: [] },
  { level: 6, requiredXP: 1000, title: 'Veterano', description: 'Experiência acumulada!', rewards: [] },
  { level: 7, requiredXP: 1350, title: 'Especialista', description: 'Conhecimento avançado!', rewards: [] },
  { level: 8, requiredXP: 1750, title: 'Mestre', description: 'Dominando as habilidades!', rewards: [] },
  { level: 9, requiredXP: 2200, title: 'Campeão', description: 'Entre os melhores!', rewards: [] },
  { level: 10, requiredXP: 2700, title: 'Lenda', description: 'Seu nome será lembrado!', rewards: [] },
];

export function calculateLevel(totalXP: number): {
  level: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressPercentage: number;
  nextLevel: Level | null;
} {
  let currentLevel = 1;
  let xpForCurrentLevel = 0;
  
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].requiredXP) {
      currentLevel = LEVELS[i].level;
      xpForCurrentLevel = LEVELS[i].requiredXP;
      break;
    }
  }

  const nextLevel = LEVELS.find(level => level.level === currentLevel + 1);
  const xpForNextLevel = nextLevel ? nextLevel.requiredXP : xpForCurrentLevel;
  
  const currentXP = totalXP - xpForCurrentLevel;
  const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = xpNeededForNext > 0 ? (currentXP / xpNeededForNext) * 100 : 100;

  return {
    level: currentLevel,
    currentXP,
    xpForCurrentLevel,
    xpForNextLevel,
    progressPercentage: Math.min(progressPercentage, 100),
    nextLevel,
  };
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'hard':
      return 'orange';
    case 'epic':
      return 'purple';
    default:
      return 'gray';
  }
}

export function getMissionStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'gray';
    case 'in_progress':
      return 'blue';
    case 'completed':
      return 'green';
    default:
      return 'gray';
  }
}
