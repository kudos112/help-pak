import {Flex, Heading} from "@chakra-ui/react";
import {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import Users from "~/components/partial-components/messages/user";
import {selectUser} from "~/redux/auth/auth.selector";
import {getChats} from "~/redux/chat/chat.actions";
import {selectConversations} from "~/redux/chat/chat.selector";
import AuthenticationWrapper from "~/repositories/AuthHoc";
import SmallFooter from "~/components/partial-components/small-footer";

const index = ({conversations, currentUser}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchConservations();
  }, []);

  const fetchConservations = () => {
    dispatch(getChats());
  };

  return (
    <>
      <Flex m={4} ml={8} direction="column" height={"77vh"}>
        <Heading color={"customGreen"}>Chats</Heading>
        {(conversations == null || conversations.length === 0) && (
          <Flex align="center" justify={"center"}>
            <Heading color="gray.400">No Chat Started yet</Heading>
          </Flex>
        )}
        <Flex
          w={"100%"}
          mt={8}
          p={3}
          align="center"
          // justify="center"
          direction="column"
          flex={2}
          gap="20px"
          h="100%"
        >
          {Array.isArray(conversations) &&
            conversations.map((conversation, index) => (
              <div key={index}>
                <Users conversation={conversation} currentUser={currentUser} />
              </div>
            ))}
        </Flex>
      </Flex>
      <SmallFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: selectConversations(state),
    currentUser: selectUser(state),
  };
};

export default AuthenticationWrapper(connect(mapStateToProps)(index));
