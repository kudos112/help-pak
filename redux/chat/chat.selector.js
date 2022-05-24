import {createSelector} from "reselect";

const selectConversation = (state) => state?.chat || {};

export const selectConversations = createSelector(
  [selectConversation],
  (data) => data.conversations
);

export const selectSelectedConversation = createSelector(
  [selectConversation],
  (chat) => chat.selectedConversation
);
