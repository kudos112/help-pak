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
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";

export default function CarouselCard({data}) {
  const {name, images, serviceType, providerName, city} = data;
  return (
    <Link
      href={"/medical-assistance/[mid]"}
      as={`/medical-assistance/${data.id}`}
      passHref
    >
      <Flex
        py={{base: 2, md: 4, lg: 4, sm: 2}}
        justify="center"
        css={{
          curser: "pointer",
        }}
      >
        <div style={{cursor: "pointer"}}>
          <Box
            w={"250px"}
            minW={"100px"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            sx={{
              curser: "pointer",
            }}
          >
            <Box
              h={"210px"}
              bg={"gray.100"}
              mt={-6}
              mx={-6}
              mb={4}
              pos={"relative"}
            >
              <Image src={images[0]} layout={"fill"} />
            </Box>
            <Stack spacing={3}>
              <Tooltip label={serviceType}>
                <Text isTruncated>
                  <Tag
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={700}
                    fontSize={"11px"}
                    letterSpacing={0.7}
                  >
                    {serviceType || ""}
                  </Tag>
                </Text>
              </Tooltip>
              <Heading
                color={useColorModeValue("customGray", "white")}
                fontSize={"lg"}
                fontFamily={"body"}
              >
                {name || ""}
              </Heading>
              {/* <Text
                fontSize={"14px"}
                color={"gray.500"}
                overflow={"scroll"}
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
                {description || ""}
              </Text> */}
            </Stack>
            <Stack mt={2} direction={"row"} spacing={4} align={"center"}>
              <Avatar alt={"Provider"} size={"sm"} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontSize={"14px"} fontWeight={600}>
                  {providerName}
                </Text>
                <Text fontSize={"12px"} color={"gray.500"}>
                  {city}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </div>
      </Flex>
    </Link>
  );
}
