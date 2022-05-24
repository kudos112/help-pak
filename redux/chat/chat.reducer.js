import actionTypes from "./chat.actionTypes";

export const initState = {
  conversations: null,
  selectedConversation: {},
};

function ChatReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_CHATS_SUCCESS:
      return {
        ...state,
        ...{conversations: action.chats},
      };
    case actionTypes.GET_SELECTED_CHAT:
      return {
        ...state,
        ...{selectedConversation: action.conversation},
      };
    default:
      return state;
  }
}

export default ChatReducer;
