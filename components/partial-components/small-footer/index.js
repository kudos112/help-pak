import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import Link from "next/link";
import {FaInstagram, FaTwitter, FaFacebook} from "react-icons/fa";

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
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("#15803D", "whiteAlpha.200"),
        color: "white",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{base: "column", md: "row"}}
        spacing={4}
        justify={{base: "center", md: "space-between"}}
        align={{base: "center", md: "center"}}
      >
        <Text>© 2022 Help Pakistan. All rights reserved</Text>

        <Stack direction={"row"} spacing={6}>
          <Link href={"/contact-us"}>Write About Us</Link>
          <Text>Social Links</Text>
          <SocialButton label={"Facebook"} href={"#"}>
            <FaFacebook />
          </SocialButton>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
