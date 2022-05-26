import {EmailIcon} from "@chakra-ui/icons";
import {Avatar, Button, Flex, Text} from "@chakra-ui/react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setSelectedConversation} from "~/redux/chat/chat.actions";
// import UserRepository from "~/repositories/UserRepository";

export default function index({conversation, currentUser}) {
  const [friend, setFriend] = useState({});
  const dispatch = useDispatch();
  useEffect(async () => {
    setFriend(conversation.members.find((m) => m.id !== currentUser.id));
  }, []);
  return (
    <Link href={"/messages/[uid]"} as={`/messages/${friend.id}`} passHref>
      <Flex
        onClick={() => dispatch(setSelectedConversation(conversation))}
        direction="column"
        w={{base: "320px", md: "500px"}}
      >
        <Flex
          justifyContent="space-between"
          bg="white"
          p={2}
          borderRadius="30px"
          w="100%"
          mb="15px"
          _hover={{
            bg: "gray.200",
            cursor: "pointer",
          }}
        >
          <Flex align="center">
            <Avatar alt={"Sender"} mr={3} size={"md"} />
            <Flex direction="column">
              <Text fontSize="sm" color={"customGray"} fontWeight="bold">
                {friend.name}
              </Text>
              <Text fontSize="xs" color="gray.500" fontWeight="400">
                {friend.userType}
              </Text>
            </Flex>
          </Flex>
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text
              fontSize="lg"
              fontWeight="600"
              color="teal.300"
              alignSelf="center"
            >
              <EmailIcon />
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Link>
  );
}
