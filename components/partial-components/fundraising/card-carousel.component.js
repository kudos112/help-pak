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
import fundraising from "~/pages/fundraising";

export default function CarouselCard({data}) {
  const {name, images, reason, city, fundraiserName, amount, updatedAt} = data;

  return (
    <Link href={"/fundraising/[fid]"} as={`/fundraising/${data.id}`} passHref>
      <Flex
        py={{base: 2, md: 3, lg: 4, sm: 2}}
        justify="center"
        css={{
          curser: "pointer",
        }}
      >
        <div style={{cursor: "pointer"}}>
          <Box
            w={{md: "250px", lg: "250px", base: "300px"}}
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
              <Tooltip label={reason}>
                <Text isTruncated>
                  <Tag
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={700}
                    fontSize={"11px"}
                    letterSpacing={0.7}
                  >
                    {reason || ""}
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
              <Heading
                color={useColorModeValue("customGreen", "white")}
                fontSize={"sm"}
                fontFamily={"body"}
              >
                {`Amount Required: Rs.${amount}`}
              </Heading>
            </Stack>
            <Stack mt={2} direction={"row"} spacing={4} align={"center"}>
              <Avatar alt={"Provider"} size={"sm"} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontSize={"14px"} fontWeight={600}>
                  {fundraiserName}
                </Text>
                <Text fontSize={"12px"} color={"gray.500"}>
                  {city}
                </Text>
              </Stack>
            </Stack>
            <Text fontSize={"12px"} color={"gray.500"}>
              {updatedAt}
            </Text>
          </Box>
        </div>
      </Flex>
    </Link>
  );
}
