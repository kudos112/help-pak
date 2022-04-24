import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Colors from "~/public/colors";

export default function CarouselCard({data}) {
  const {name, images, serviceType, description, providerName, city} = data;
  return (
    <Flex m={2} py={{base: 2, md: 4, lg: 6, sm: 2}} justify="center">
      <div>
        <Box
          maxW={"350px"}
          minW={"150px"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          sx={{
            curser: "pointer",
          }}
        >
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Image src={images[0]} layout={"fill"} />
          </Box>
          <Stack
            maxH={"200px"}
            overflow={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: Colors.lightGreen,
                borderRadius: "24px",
              },
            }}
          >
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {serviceType || ""}
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {name || ""}
            </Heading>
            <Text color={"gray.500"}>{description || ""}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar alt={"Provider"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{providerName}</Text>
              <Text color={"gray.500"}>{city}</Text>
            </Stack>
          </Stack>
        </Box>
      </div>
    </Flex>
  );
}
