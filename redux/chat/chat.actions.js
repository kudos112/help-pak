import actionTypes from "./chat.actionTypes";

export function getChats(id) {
  return {
    type: actionTypes.GET_CHATS_REQUEST,
    id,
  };
}

export function getChatsSuccess(chats) {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats,
  };
}

export function setSelectedConversation(conversation) {
  return {type: actionTypes.GET_SELECTED_CHAT, conversation};
}

// export function getSelectedMessagesSuccess(chat) {
//   return {
//     type: actionTypes.SUCCESS_GET_SELECTED_CHAT,
//     chat,
//   };
// }
