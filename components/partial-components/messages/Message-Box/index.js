import { Avatar, Box, Flex, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import { errorNotification } from "~/components/fundamentals/notification/notification";
import { selectUser } from "~/redux/auth/auth.selector";
import { selectSelectedConversation } from "~/redux/chat/chat.selector";
import ChatRepository from "~/repositories/ChatRepository";
import { baseUrl } from "~/repositories/genericRepository";
import UserRepository from "~/repositories/UserRepository";
import Message from "./Message.component";

const MessageBox = ({conversation, currentUser}) => {
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [online, setOnline] = useState();
  const {query = {}} = useRouter();
  const [sent, setSent] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.sender.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    
    fetchFriend();

     socket?.current = io(baseUrl);
    socket?.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: {senderId: data.senderId},
        text: data.text,
      });
    });
  }, [] );
  
  const fetchFriend = async () =>
  {
   if (query.uid) {
      const response = await UserRepository.getUserById(query.uid);
      if (response.status === 200) setFriend(response.data);
    } 
  }

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  useEffect(() => {
    if ( currentUser == null || friend == null )
    { }
  else
    {
      if ( socket != null )
      {
        socket?.current?.emit( "addUser", currentUser?.id )
        socket?.current?.on( "getUsers", ( users ) =>
        {
          users.forEach( ( user ) =>
          {
            if ( user.userId === friend?.id ) setOnline( true );
            else setOnline(false)
          } );
        } );
      }
    }
  }, [currentUser, friend]);

  useEffect(async () => {
    if (friend) {
      fetchConversations()
    }
  }, [ friend ] );
  
  const fetchConversations = async () =>
  {
   if (conversation) {
        const response = await ChatRepository.getMessagesByCoversationId(
          conversation.id
        );
        if (response.status === 200) setMessages(response.data);
      } else errorNotification("Failed", "unable to fetch your chat"); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sender: {
        senderId: currentUser?.id,
        senderName: currentUser?.name,
      },
      text: newMessage,
      conversationId: conversation.id,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUser.id,
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
        p="1"
        pb={2}
      >
        <Avatar size="md" />
        <Text ml="10px" fontSize={20}>
          {friend?.name || "Loading..."}
          {/* {online ? <Tag>Online</Tag>:<Tag>Offline</Tag>} */}
        </Text>
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
        {messages.map((msg, index) => (
          <div key={index} ref={scrollRef}>
            <Message
              text={msg.text}
              key={index}
              own={msg?.sender?.senderId === currentUser?.id}
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
