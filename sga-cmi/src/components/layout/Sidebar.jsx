import { Box, Flex, Heading, Icon, Image, Link, Spacer, Text, Stack, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaChartPie, FaClipboardCheck, FaQuoteRight, FaUsers, FaVest, FaCog } from "react-icons/fa";
import { RiBook3Fill, RiComputerFill, RiHomeSmile2Line, RiMapPin4Fill, RiUserStarFill } from "react-icons/ri";
import { MdGrade, MdMonetizationOn, MdScience, MdSettings, MdTableChart } from "react-icons/md";
import { FcPieChart } from "react-icons/fc";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import logo from '../../assets/img/logo.svg'

export const NavItem = (props) => {

    const bgActiveLinkColor = useColorModeValue("gray.800", "gray.800");

    const { icon, iconSize, children, isSelected, ...rest } = props;

    return (
        <Flex
            align="center"
            py="7px"
            borderRadius={'lg'}
            px={"4px"}
            cursor="pointer"
            _hover={{
                bg: bgActiveLinkColor,
            }}
            _activeLink={{
                color: isSelected ? "purple.500" : "inherit",
            }}
            role="group"
            transition=".1s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mx="4"
                    ml={{ base: "1", md: "3" }}
                    fontSize="23px"
                    as={icon}
                    color={isSelected ? "purple.500" : "inherit"}
                    {...rest}
                />
            )}
            {children}
        </Flex>
    );
};

function Sidebar({ isOpen }) {

    const { user } = useSelector(state => state.auth);

    const activeLinkcolor = useColorModeValue("white", "white");
    const bgActiveLinkColor = useColorModeValue("gray.800", "gray.800");

    const listIcons = [
        {
            icon: RiHomeSmile2Line,
            name: "RiHome5Fill",
        },
        {
            icon: FaUsers,
            name: "FaUsers",
        },
        {
            icon: RiUserStarFill,
            name: "RiUserStarFill",
        },
        {
            icon: FaChalkboardTeacher,
            name: "FaChalkboardTeacher",
        },
        {
            icon: MdMonetizationOn,
            name: "MdMonetizationOn",
        },
        {
            icon: RiComputerFill,
            name: "RiComputerFill",
        },
        {
            icon: RiBook3Fill,
            name: "RiBook3Fill",
        },
        {
            icon: MdTableChart,
            name: "MdTableChart",
        },
        {
            icon: FaVest,
            name: "FaVest",
        },
        {
            icon: FaClipboardCheck,
            name: "FaClipboardCheck",
        },
        {
            icon: MdGrade,
            name: "MdGrade",
        },
        {
            icon: FaQuoteRight,
            name: "FaQuoteRight",
        },
        {
            icon: MdSettings,
            name: "MdSettings",
        },
        {
            icon: RiMapPin4Fill,
            name: "RiMapPin4Fill",
        },
        {
            icon: MdScience,
            name: "MdScience",
        },
        {
            icon: FcPieChart,
            name: "FcPieChart",
        },
        {
            icon: FaChartPie,
            name: "FaChartPie",
        },
    ]

    function getIconosNames(name) {
        const icon = listIcons.find((item) => item.name === name);
        return icon.name;
    }

    function getIconIcons(icono) {
        const icon = listIcons.find((item) => item.name === icono);
        return icon.icon;
    }

    const thirdListItem = [
        {
            title: "Configuraciones",
            path: "/condifguraciones",
            icon: FaCog
        }
    ]

    return (
        <Box
            w={{ base: isOpen ? "0" : "0", lg: "280px" }}
            display={{
                base: isOpen ? "block" : "none",
            }}
            bgColor="primary.1000"
            _dark={{
                bgColor: "primary.1000",
                color: "white",
                borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            borderRight='0.1px solid rgba(0, 0, 0, 0.02)'
            color="white"
            pos="fixed"
            top="0"
            left="0"
            bottom="0"
            h="calc(100vh - 0rem)"
            overflow="hidden"
            overflowY="auto"
            zIndex="0"
            transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
            transition="width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
            sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('#909090', '#717171'),
                    borderRadius: '24px',
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb:active': {
                    backgroundColor: useColorModeValue('#909090', '#717171'),
                },
                '&::-webkit-scrollbar-track': {
                    borderRadius: '24px',
                },
            }}
        >
            <Flex
                direction="column"
                as="nav"
                fontSize="15px"
                px={4}
                py={2}
                aria-label="Main Navigation"
                h="100%"
            >
                <Flex
                    direction="row"
                    px={1.5}
                    py={4}
                    mb={2}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Stack alignItems={'center'} direction='row' spacing={4} w="full">
                        <Box
                            w="40px"
                            h="40px"
                            borderRadius="lg"
                            borderColor={'gray.700'}
                            borderWidth="1px"
                            p={'4px'}
                        >
                            <Image
                                src={logo}
                                alt="logo"
                                w="full"
                                alignSelf={'center'}
                                h="full"
                                objectFit="cover"
                            />
                        </Box>
                        <Stack direction="column" spacing={0}>
                            <Heading
                                fontSize="16px"
                                fontWeight="bold"
                                color="white"
                                alignSelf={'start'}
                                justifySelf={'start'}
                                textAlign="start"
                            >
                                SGA
                            </Heading>
                            <Text
                                fontSize="14px"
                                color="gray.400"
                                _dark={{
                                    color: "gray.400"
                                }}
                                alignSelf={'start'}
                                justifySelf={'start'}
                                textAlign="start"
                            >
                                {user?.usuario?.modalidad}
                            </Text>
                        </Stack>
                    </Stack>                    
                </Flex>
                {
                    user?.menu?.map((item, index) => {

                        const isSelected = item.path === window.location.pathname;

                        return (
                            <Link
                                key={index}
                                as={NavLink}
                                to={item.path}
                                fontSize={'15px'}
                                fontWeight={'semibold'}color={'gray.400'}
                                _dark={{
                                    color: 'gray.400',
                                }}
                                borderRadius={'lg'}
                                mb={1}
                                _activeLink={{
                                    color: activeLinkcolor,
                                    bg: bgActiveLinkColor,
                                    _dark: {
                                        color: 'white'
                                    }
                                }}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <NavItem isSelected={isSelected} iconSize={item.iconSize} icon={item.icono === getIconosNames(item.icono) ? getIconIcons(item.icono) : AddIcon}>{item.titulo}</NavItem>
                            </Link>
                        )
                    })
                }

                <Spacer />

                <Stack
                    bottom={0}
                    direction="column"
                    as="nav"
                    fontSize="12px"
                    aria-label="Main Navigation"
                >
                    {
                        thirdListItem.map((item, index) => {
                            const isSelected = item.path === window.location.pathname;
                            return (
                                <Link
                                    key={index}
                                    as={NavLink}
                                    to={item.path}
                                    fontSize={'15px'}
                                    fontWeight={600}
                                    color={'gray.400'}
                                    _dark={{
                                        color: 'gray.400',
                                    }}
                                    borderRadius={'lg'}
                                    mb={1}
                                    _activeLink={{
                                        color: activeLinkcolor,
                                        bg: bgActiveLinkColor,
                                        _dark: {
                                            color: 'purple.600'
                                        }
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <NavItem isSelected={isSelected} icon={item?.icon}>{item?.title}</NavItem>
                                </Link>
                            )
                        })
                    }
                </Stack>
            </Flex>
        </Box>
    );
}

export default Sidebar;