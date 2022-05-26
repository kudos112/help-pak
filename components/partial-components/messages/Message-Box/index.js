import {RepeatIcon} from "@chakra-ui/icons";
import {Avatar, Box, Button, Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {AiOutlineSend} from "react-icons/ai";
import {connect} from "react-redux";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import {errorNotification} from "~/components/fundamentals/notification/notification";
import {selectUser} from "~/redux/auth/auth.selector";
import {selectSelectedConversation} from "~/redux/chat/chat.selector";
import ChatRepository from "~/repositories/ChatRepository";
import UserRepository from "~/repositories/UserRepository";
// import { io } from "socket.io-client";
import socket from "~/sockets";
import Message from "./Message.component";

const MessageBox = ({conversation, currentUser}) => {
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const {query = {}} = useRouter();
  const [sent, setSent] = useState(null);
  // const socket = useRef();
  const scrollRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("arrival Message: ", arrivalMessage);
    console.log("conversation: ", conversation);
    console.log(
      conversation?.members?.some((m) => m.id === arrivalMessage?.senderId)
    );
    arrivalMessage &&
      conversation?.members?.some((m) => m.id === arrivalMessage?.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    fetchFriend();
    socket?.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        deleted: false,
      });
    });
  }, []);

  const fetchFriend = async () => {
    if (query.uid) {
      const response = await UserRepository.getUserById(query.uid);
      if (response.status === 200) setFriend(response.data);
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"});
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (socket != null) {
      socket?.emit("addUser", currentUser?.id);
      socket?.emit("removeNotification", currentUser?.id);
      socket?.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [currentUser, friend]);

  useEffect(async () => {
    if (friend) {
      fetchConversations();
    }
  }, [friend]);

  const fetchConversations = async () => {
    if (conversation) {
      setLoading(true);
      const response = await ChatRepository.getMessagesByCoversationId(
        conversation.id
      );
      if (response.status === 200) setMessages(response.data);
      setLoading(false);
    } else errorNotification("Failed", "unable to fetch your chat");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      senderId: currentUser.id,
      text: newMessage,
      conversationId: conversation.id,
    };

    socket.emit("sendMessage", {
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: friend.id,
      text: newMessage,
    });

    setMessages((prev) => [...prev, payload]);
    setNewMessage("");
    const response = await ChatRepository.sendMessage(payload);
    if (response.status === 200) setSent(true);
    else setSent(false);
  };

  return (
    <Flex
      direction="column"
      h={"85vh"}
      gap="20px"
      // border="1px solid gray"
      mb={10}
      p="3"
      w={{base: "100%", md: "100%", lg: "800px"}}
    >
      <Flex
        flex={"0.15"}
        direction="row"
        borderBottom={"1px"}
        align="center"
        justify={"space-between"}
        p="1"
        pb={2}
      >
        <Flex direction="row" align="center">
          <Avatar size="md" />
          <Text ml="10px" fontSize={20}>
            {friend?.name || "Loading..."}
          </Text>
        </Flex>
        <Box w={"100px"}>
          <Button
            leftIcon={<RepeatIcon />}
            bg={"customGreen"}
            isLoading={loading}
            loadingText={"loading..."}
            color="white"
            _hover={{color: "customGray", backgroundColor: "lightGreen"}}
            onClick={() => fetchConversations()}
          >
            Refresh
          </Button>
        </Box>
      </Flex>
      <Flex
        flex="1"
        direction="column"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
      >
        {/* <CustomButton title="Load More" /> */}
        {messages.map((msg, index) => (
          <div key={index} ref={scrollRef}>
            <Message
              text={msg.text}
              key={index}
              own={msg?.senderId === currentUser?.id}
              status={sent}
            />
          </div>
        ))}
        {messages.length === 0 && (
          <Flex align="center" justify={"center"}>
            Send first message to {friend?.name || "loading..."}
          </Flex>
        )}
      </Flex>

      <form onSubmit={handleSubmit}>
        <Flex flex={0.2} align="center" gap="20px" h="40px">
          <CustomInput
            autoFocus
            placeholder="Write Message Here!"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Box
            as="button"
            type="submit"
            color="customGray"
            _hover={{color: "customGreen"}}
            // onClick={handleSubmit}
          >
            <AiOutlineSend fontSize="35px" />
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    conversation: selectSelectedConversation(state),
    currentUser: selectUser(state),
  };
};

export default connect(mapStateToProps)(MessageBox);
