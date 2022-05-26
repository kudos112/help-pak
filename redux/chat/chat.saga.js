import ChatService from "@/repositories/ChatRepository";
import {all, call, cancel, put, takeEvery} from "redux-saga/effects";
import {errorNotification} from "~/components/fundamentals/notification/notification";
import {getChatsSuccess, getSelectedChatSuccess} from "./chat.actions";
import actionTypes from "./chat.actionTypes";

function* getChatsSaga(action) {
  try {
    const data = yield call(ChatService.getConversationsByUserId);
    yield put(getChatsSuccess(data));
    if (action && action.callback) action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification(
        "Error",
        typeof error === "string"
          ? error
          : "Working on this minor update, try again soon"
      );
    }
  } finally {
    yield cancel();
  }
}

// function* getSelectedChatSaga(action) {
//   try {
//     const data = yield call(ChatService.getMessagesByCoversationId, action.id);
//     yield put(getSelectedChatSuccess(data));
//     action.callback();
//   } catch (error) {
//     if (action && action.callback) {
//       action.callback();
//       errorNotification("Error", error);
//     }
//   } finally {
//     yield cancel();
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery(actionTypes.GET_CHATS_REQUEST, getChatsSaga),
    // takeEvery(actionTypes.GET_SELECTED_CHAT, getSelectedChatSaga),
  ]);
}
