import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  chakra,
  VisuallyHidden,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";

import {FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";
import {socialLinks} from "~/links";

const Logo = (props) => {
  return (
    <Box w={50}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-75 -40 120 80">
        <path fill="#fff" d="M-75-40H45v80H-75z" />
        <path fill="#01411C" d="M-45-40h90v80h-90z" />
        <circle r="24" fill="#fff" />
        <circle
          r="22"
          cx="-7"
          cy="-40"
          fill="#01411C"
          transform="rotate(-41.634 45 -40)"
        />
        <path
          fill="#fff"
          d="M8.751-17.959l10.11 11.373L3.997-9.844l13.94-6.1-7.692 13.129z"
        />
      </svg>
    </Box>
  );
};

const SocialButton = ({children, label, href}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      color="customGray"
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("customGreen", "customGreen"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({children}) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{sm: "1fr 1fr", md: "2fr 1fr 1.3fr 1.3fr 1.3fr"}}
          spacing={8}
        >
          <Stack spacing={6}>
            <Stack direction="row">
              <Logo color={useColorModeValue("gray.700", "white")} />
              <Heading fontSize={25} color="customGray">
                Help
              </Heading>
              <Heading fontSize={25} color="customGreen">
                Pakistan
              </Heading>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Fundraising</ListHeader>
            <Link href={"#"}>Request Fundraise</Link>
            <Link href={"#"}>Fundraisings</Link>
            {/* <Link href={"#"}>Tutorials</Link>
            <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>Releases</Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Old Item Donation</ListHeader>
            <Link href={"/donation-items"}>Available Old Items</Link>
            <Link href={"/donation-items/request"}>Request Donation</Link>
            {/* <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact</Link>
            <Link href={"#"}>Partners</Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Medical Camps</ListHeader>
            <Link href={"/medical-camp"}>Available Medical Camps</Link>
            <Link href={"/medical-camp/request"}>Organize Camp</Link>
            {/* <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Status</Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Free Medical Services</ListHeader>
            <Link href={"/medical-assistance"}>Available Medical Servcies</Link>
            <Link href={"/medical-assistance/request"}>
              List Your Medical Service
            </Link>
            {/* <Link href={"#"}>Dribbble</Link> */}
            {/* <Link href={"#"}>Instagram</Link> */}
            {/* <Link href={"#"}>LinkedIn</Link> */}
          </Stack>
        </SimpleGrid>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{base: "column", md: "row"}}
          spacing={4}
          justify={{md: "space-between"}}
          align={{md: "center"}}
        >
          <Text>© Help Pakistan. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Facebook"} href={socialLinks.facebook}>
              <FaFacebook color="white" />
            </SocialButton>
            <SocialButton label={"Twitter"} href={socialLinks.twitter}>
              <FaTwitter color="white" />
            </SocialButton>
            <SocialButton label={"Instagram"} href={socialLinks.instagram}>
              <FaInstagram color="white" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
