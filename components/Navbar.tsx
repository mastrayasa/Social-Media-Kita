import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    HStack,
    Icon,
    Link,
    Popover, Container,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    useColorMode,
    Avatar,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { useSession, signOut } from "next-auth/react"
import NextLink from 'next/link'
import { FaMoon, FaRegSun } from 'react-icons/fa';
export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const { data: session } = useSession()
    const { colorMode, toggleColorMode } = useColorMode()
    const color = useColorModeValue('white', 'gray.300')
    return (
        <Box borderBottom={1} bg={useColorModeValue('blue.600', 'blue.900')}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}>
            <Box maxW={'4xl'} mx={'auto'}>
                <Flex
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    align={'center'}>
                    <Flex
                        flex={{ base: 1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}>
                        <IconButton color={'white'}
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            _hover={{
                                bg: useColorModeValue('blue.700', 'gray.600')
                            }}

                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                        <Text as={NextLink} href={'/'}
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={color}>
                            Social Media Kita
                        </Text>

                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    {!session &&
                        <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={2}>
                            <Button
                                as={NextLink}
                                fontSize={'sm'}
                                fontWeight={400}
                                color={color}
                                _hover={{
                                    color: 'white'
                                }}
                               //  colorScheme={'gray'}
                                variant={'ghost'}
                                href={'/auth/signin'}>
                                Sign In
                            </Button>
                            <Button
                                as={NextLink}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                variant={'solid'}
                                colorScheme={'gray'}
                                fontWeight={400}
                                href={'/auth/signup'}
                            >
                                Sign Up
                            </Button>

                            <IconButton aria-label='Toggle color mode' icon={colorMode === 'light' ? <FaMoon /> : <FaRegSun />} onClick={toggleColorMode} />

                        </Stack>
                    }


                    {session &&
                        <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={2}>
                            <HStack display={{ base: 'none', md: 'flex' }}>
                                <Avatar
                                    boxSize="36px"
                                    name={session.user?.name ? session.user?.name : 'Noname'}
                                    src={session.user?.image ? session.user?.image : ''}
                                    borderRadius={"full"} />

                                <Button
                                    color={'white'}
                                    as={'a'}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                >
                                    {session.user?.name}
                                </Button>
                            </HStack>


                            <Button
                                color={'white'}
                                as={'a'} onClick={() => signOut()}
                                fontSize={'sm'}
                                fontWeight={400}
                                variant={'link'}
                                href={'#'}>
                                Keluar
                            </Button>

                            <IconButton aria-label='Toggle color mode' icon={colorMode === 'light' ? <FaMoon /> : <FaRegSun />} onClick={toggleColorMode} />

                        </Stack>
                    }

                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('white', 'gray.200');
    const linkHoverColor = useColorModeValue('white', 'white');
    const linkHoverBg = useColorModeValue('blue.500','blue.800');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                as={NextLink}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: linkHoverBg,
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            as={NextLink}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={NextLink}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link as={NextLink} key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Video',
        href: '/video',
    },
    {
        label: 'Tranding',
        href: '#',
    },
    {
        label: 'Game',
        href: '#',
    },
    {
        label: 'Group',
        href: '#',
    },
];
