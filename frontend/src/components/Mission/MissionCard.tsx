'use client';

import {
  Box,
  Card,
  CardBody,
  Text,
  Badge,
  Progress,
  Button,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FiTarget, FiClock, FiStar, FiPlay, FiCheck } from 'react-icons/fi';
import { Mission, UserMission } from '@/types';
import { getDifficultyColor, getMissionStatusColor, formatXP } from '@/utils/gameUtils';
import { useMissions } from '@/hooks/useMissions';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

interface MissionCardProps {
  mission: Mission;
  userMission?: UserMission;
  onStart?: () => void;
  onComplete?: () => void;
}

export default function MissionCard({ 
  mission, 
  userMission, 
  onStart, 
  onComplete 
}: MissionCardProps) {
  const { startMission, completeMission } = useMissions();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleStart = async () => {
    const result = await startMission(mission.id);
    if (result.success && onStart) {
      onStart();
    }
  };

  const handleComplete = async () => {
    const result = await completeMission(mission.id);
    if (result.success && onComplete) {
      onComplete();
    }
  };

  const getStatusButton = () => {
    if (!userMission) {
      return (
        <Button
          leftIcon={<FiPlay />}
          colorScheme="purple"
          size="sm"
          onClick={handleStart}
        >
          Iniciar
        </Button>
      );
    }

    switch (userMission.status) {
      case 'in_progress':
        if (userMission.progress >= 100) {
          return (
            <Button
              leftIcon={<FiCheck />}
              colorScheme="green"
              size="sm"
              onClick={handleComplete}
            >
              Completar
            </Button>
          );
        }
        return (
          <Button
            variant="outline"
            size="sm"
            isDisabled
          >
            Em Progresso
          </Button>
        );
      case 'completed':
        return (
          <Button
            leftIcon={<FiCheck />}
            colorScheme="green"
            size="sm"
            isDisabled
          >
            Concluída
          </Button>
        );
      default:
        return (
          <Button
            leftIcon={<FiPlay />}
            colorScheme="purple"
            size="sm"
            onClick={handleStart}
          >
            Iniciar
          </Button>
        );
    }
  };

  const progressPercentage = userMission?.progress || 0;

  return (
    <MotionCard
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <CardBody>
        <VStack align="stretch" spacing={4}>
          {/* Header */}
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiTarget} color="purple.500" />
              <Badge colorScheme={getDifficultyColor(mission.difficulty)}>
                {mission.difficulty.toUpperCase()}
              </Badge>
              <Badge colorScheme={getMissionStatusColor(userMission?.status || 'pending')}>
                {userMission?.status?.toUpperCase() || 'DISPONÍVEL'}
              </Badge>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FiStar} color="yellow.400" />
              <Text fontWeight="bold" color="yellow.400">
                {formatXP(mission.xpReward)} XP
              </Text>
            </HStack>
          </HStack>

          {/* Title and Description */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {mission.title}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {mission.description}
            </Text>
          </Box>

          {/* Progress Bar (if mission is started) */}
          {userMission && userMission.status !== 'pending' && (
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Progresso
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {progressPercentage}%
                </Text>
              </HStack>
              <Progress
                value={progressPercentage}
                colorScheme={progressPercentage >= 100 ? 'green' : 'purple'}
                borderRadius="md"
                size="sm"
              />
            </Box>
          )}

          {/* Deadline (if exists) */}
          {mission.deadline && (
            <HStack spacing={2} color="gray.500">
              <Icon as={FiClock} />
              <Text fontSize="sm">
                Prazo: {new Date(mission.deadline).toLocaleDateString('pt-BR')}
              </Text>
            </HStack>
          )}

          {/* Category */}
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Categoria:
            </Text>
            <Badge variant="subtle" colorScheme="blue">
              {mission.category}
            </Badge>
          </HStack>

          {/* Action Button */}
          <Box pt={2}>
            {getStatusButton()}
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
}
