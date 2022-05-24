import {Flex, Heading} from "@chakra-ui/react";
import {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import Users from "~/components/partial-components/messages/user";
import {selectUser} from "~/redux/auth/auth.selector";
import {getChats} from "~/redux/chat/chat.actions";
import {selectConversations} from "~/redux/chat/chat.selector";

const index = ({conversations, currentUser}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchConservations();
  }, []);

  const fetchConservations = () => {
    dispatch(getChats(currentUser?.id));
  };

  return (
    <Flex m={4} ml={8} direction="column">
      <Heading color={"customGreen"}>Chats</Heading>

      <Flex
        w={"100%"}
        mt={8}
        p={3}
        align="center"
        justify="center"
        flex={2}
        gap="20px"
        h="100%"
      >
        {conversations == null ||
          (conversations.length === 0 && <Flex>No Chat Started yet</Flex>)}
        {Array.isArray(conversations) &&
          conversations.map((conversation, index) => (
            <div key={index}>
              <Users conversation={conversation} currentUser={currentUser} />
            </div>
          ))}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: selectConversations(state),
    currentUser: selectUser(state),
  };
};

export default connect(mapStateToProps)(index);
