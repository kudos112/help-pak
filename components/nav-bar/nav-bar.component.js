import styles from "./nav-bar.module.scss";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Spinner,
  Portal,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {connect, useDispatch} from "react-redux";

import Link from "next/link";
import {logOutRequest} from "~/redux/auth/auth.actions";
import {useState} from "react";
import {selectIsLoggedIn, selectUser} from "~/redux/auth/auth.selector";

const NavBar = ({user, isLoggedIn}) => {
  const {isOpen, onToggle} = useDisclosure();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white")}
        color={useColorModeValue("gray.600")}
        minH={"70px"}
        py={{base: 2}}
        px={{base: 8}}
        borderBottom={1}
        align={"center"}
      >
        <Flex
          flex={{base: 1, md: "auto"}}
          ml={{base: -2}}
          display={{base: "flex", md: "none"}}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{base: 1}} justify={{base: "center", md: "start"}}>
          <Link href="/" passHref>
            <div style={{cursor: "pointer"}}>
              <span className={styles.help}>Help</span>
              <span className={styles.pak}>Pak</span>
            </div>
          </Link>
          <Flex display={{base: "none", md: "flex"}} align={"center"} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{base: 1, md: 0}}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isLoggedIn ? (
            <Link href="/account/login" passHref>
              <Button
                fontSize={"sm"}
                fontWeight={500}
                color={"white"}
                bg={"#15803D"}
                _hover={{
                  bg: "#6B7280",
                }}
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} bg={"customGray"} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <p>{user.name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    setLoading(true);
                    dispatch(logOutRequest(handleLoading));
                  }}
                >
                  Logout
                  {loading && (
                    <Spinner
                      size="sm"
                      speed="0.65s"
                      emptyColor="lightGreen"
                      color="green"
                      ml={3}
                    />
                  )}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("#6B7280");
  const linkHoverColor = useColorModeValue("#15803D", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                fontSize={"md"}
                fontWeight={600}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <Link href={navItem.href ?? "#"} passHref>
                  {navItem.label}
                </Link>
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <Portal>
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              </Portal>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({label, href, subLabel}) => {
  return (
    <Link href={href} passHref>
      <ChakraLink
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{bg: useColorModeValue("#F6F9FA", "gray.900")}}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{color: "#15803D"}}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"} fontWeight={200}>
              {subLabel}
            </Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{opacity: "100%", transform: "translateX(0)"}}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"#F6F9FA"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </ChakraLink>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{md: "none"}}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({label, children, href}) => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Link href={`${href}`} passHref>
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Link>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{marginTop: "0!important"}}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <div key={child.label}>
                <Link href={child.href} passHref>
                  <ChakraLink py={2}>{child.label}</ChakraLink>
                </Link>
              </div>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Fundraising",
    children: [
      {
        label: "Create Fundraising Post",
        subLabel: "Collect ",
        href: "/fundraising/request",
      },
      {
        label: "Fundraising Posts",
        subLabel: "",
        href: "/fundraising",
      },
    ],
  },
  {
    label: "Medical Camps",
    children: [
      {
        label: "Create Medical Camps",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Medical Camps",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Old Item Donation",
    children: [
      {
        label: "Create donation request",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Available Old Items",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Medical Assistance",
    href: "/medical-assistance",
    children: [
      {
        label: "Medical Services",
        subLabel: "Checkout free medical services available",
        href: "/medical-assistance",
      },
      {
        label: "Add Medical Assistance",
        subLabel: "Request to list your medical assistance service",
        href: "/medical-assistance/request",
      },
    ],
  },
  {
    label: "Ngo",
    href: "#",
  },
  {
    label: "Messages",
    href: "#",
  },
];

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    isLoggedIn: selectIsLoggedIn(state),
  };
};

export default connect(mapStateToProps)(NavBar);
