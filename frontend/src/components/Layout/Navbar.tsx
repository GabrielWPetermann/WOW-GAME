'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Progress,
  Badge,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiHome, FiTarget, FiTrendingUp, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { calculateLevel, formatXP } from '@/utils/gameUtils';
import { useRouter } from 'next/navigation';

const Links = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Missões', href: '/missions', icon: FiTarget },
  { name: 'Níveis', href: '/levels', icon: FiTrendingUp },
  { name: 'Perfil', href: '/profile', icon: FiUser },
];

const NavLink = ({ children, href, icon: Icon }: { children: React.ReactNode; href: string; icon: any }) => {
  const router = useRouter();
  
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => router.push(href)}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Icon size={16} />
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const userLevel = user ? calculateLevel(user.totalXP) : null;

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4} shadow="sm">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="xl" color="purple.500">
              WOW Game
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href} icon={link.icon}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode} variant="ghost" mr={3}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {user && userLevel && (
              <Box mr={4} display={{ base: 'none', md: 'block' }}>
                <HStack spacing={3}>
                  <Box textAlign="right">
                    <Text fontSize="sm" fontWeight="medium">
                      Nível {userLevel.level}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatXP(userLevel.currentXP)} / {formatXP(userLevel.xpForNextLevel - userLevel.xpForCurrentLevel)} XP
                    </Text>
                  </Box>
                  <Box w="100px">
                    <Progress
                      value={userLevel.progressPercentage}
                      size="sm"
                      colorScheme="purple"
                      borderRadius="md"
                    />
                  </Box>
                </HStack>
              </Box>
            )}

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`}
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUser />} onClick={() => router.push('/profile')}>
                  <Box>
                    <Text fontWeight="medium">{user?.firstName} {user?.lastName}</Text>
                    <Text fontSize="sm" color="gray.500">@{user?.username}</Text>
                  </Box>
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href} icon={link.icon}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
