'use client';

import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Text,
  Progress,
  VStack,
  HStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function DashboardOverview() {
  const [stats] = useState({
    totalMissions: 5,
    completedMissions: 2,
    inProgressMissions: 2,
    currentStreak: 3,
  });

  // Mock user data
  const user = {
    firstName: 'Jogador',
    username: 'player1',
    totalXP: 1250,
  };

  // Mock level calculation
  const userLevel = {
    level: 3,
    currentXP: 250,
    xpForCurrentLevel: 1000,
    xpForNextLevel: 1500,
    progressPercentage: 50,
    nextLevel: {
      title: 'Aventureiro',
      description: 'A aventura está apenas começando!',
    },
  };

  const formatXP = (xp: number): string => {
    if (xp >= 1000000) {
      return `${(xp / 1000000).toFixed(1)}M`;
    }
    if (xp >= 1000) {
      return `${(xp / 1000).toFixed(1)}K`;
    }
    return xp.toString();
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Welcome Section */}
        <Card>
          <CardBody>
            <HStack spacing={4}>
              <VStack align="start" spacing={1}>
                <Heading size="md">
                  Bem-vindo, {user?.firstName}! 👋
                </Heading>
                <Text color="gray.500">
                  Continue sua jornada épica e alcance novos níveis!
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Text>📈</Text>
                    <Text>Nível Atual</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="purple.500">
                  {userLevel?.level || 1}
                </StatNumber>
                <StatHelpText>
                  {formatXP(user?.totalXP || 0)} XP Total
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Text>🎯</Text>
                    <Text>Missões Completas</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="green.500">
                  {stats.completedMissions}
                </StatNumber>
                <StatHelpText>
                  de {stats.totalMissions} totais
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Text>⭐</Text>
                    <Text>Em Progresso</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="yellow.500">
                  {stats.inProgressMissions}
                </StatNumber>
                <StatHelpText>
                  missões ativas
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Text>🏆</Text>
                    <Text>Sequência</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="orange.500">
                  {stats.currentStreak}
                </StatNumber>
                <StatHelpText>
                  dias consecutivos
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Progress to Next Level */}
        {userLevel && (
          <Card>
            <CardHeader>
              <Heading size="md">Progresso para o Próximo Nível</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" w="full">
                  <Text>Nível {userLevel.level}</Text>
                  <Text>Nível {userLevel.level + 1}</Text>
                </HStack>
                <Progress
                  value={userLevel.progressPercentage}
                  colorScheme="purple"
                  size="lg"
                  w="full"
                  borderRadius="md"
                />
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    {formatXP(userLevel.currentXP)} XP
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {userLevel.progressPercentage.toFixed(1)}%
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {formatXP(userLevel.xpForNextLevel - userLevel.xpForCurrentLevel)} XP
                  </Text>
                </HStack>
                {userLevel.nextLevel && (
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Próximo: <Text as="span" fontWeight="bold">{userLevel.nextLevel.title}</Text>
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {userLevel.nextLevel.description}
                    </Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Recent Missions */}
        <Card>
          <CardHeader>
            <Heading size="md">Missões em Destaque</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Box p={3} bg="gray.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="green.500">
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Primeira Missão Completa</Text>
                    <Text fontSize="sm" color="gray.500">Complete sua primeira missão no sistema</Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">✅ Concluída</Text>
                    <Text fontSize="sm" fontWeight="bold" color="purple.500">100 XP</Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p={3} bg="gray.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="yellow.500">
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Explorar Dashboard</Text>
                    <Text fontSize="sm" color="gray.500">Navegue por todas as seções do dashboard</Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Text fontSize="sm" fontWeight="bold" color="yellow.500">🔄 Em Progresso</Text>
                    <Text fontSize="sm" fontWeight="bold" color="purple.500">150 XP</Text>
                  </VStack>
                </HStack>
                <Progress value={75} size="sm" colorScheme="yellow" mt={2} borderRadius="md" />
              </Box>

              <Box p={3} bg="gray.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.500">
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Criar Personagem</Text>
                    <Text fontSize="sm" color="gray.500">Customize seu avatar 8-bit</Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">📋 Disponível</Text>
                    <Text fontSize="sm" fontWeight="bold" color="purple.500">200 XP</Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}
