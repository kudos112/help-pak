import {Flex, useColorModeValue} from "@chakra-ui/react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {useRouter} from "next/router";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Flex
      color={"customGreen"}
      fontWeight={600}
      width={100}
      fontSize={"sm"}
      bg={useColorModeValue("White")}
      p={2}
      align="center"
      gap={2}
      rounded={"md"}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="8px"
      boxShadow="md"
      transition="transform 400ms box-shadow 400ms"
      _active={{
        transition: "translateY(4px) translateX(4px)",
        boxShadow: "#094c65 0px 0px",
      }}
      _focus={{
        boxShadow: "outline",
      }}
      px={3}
      py={2}
      onClick={() => router.back()}
    >
      <AiOutlineArrowLeft />
      <span>Go Back</span>
    </Flex>
  );
};

export default GoBackButton;
