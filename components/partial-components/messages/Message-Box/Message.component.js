import {Flex, Text} from "@chakra-ui/react";
import React from "react";

export default function Message({text, status, own}) {
  return (
    <Flex p={1} justify={own ? "flex-end" : "flex-start"}>
      <Text
        p={2}
        color="white"
        borderRadius={"10px"}
        bg={own ? "customGray" : "customGreen"}
      >
        {text}
      </Text>
      {/* {status === false && "error"}
      {status === true && "sent"} */}
    </Flex>
  );
}
