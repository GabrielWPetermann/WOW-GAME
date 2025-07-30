'use client';

import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import { Box } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box minH="100vh" bg="gray.50">
      <DashboardOverview />
    </Box>
  );
}
