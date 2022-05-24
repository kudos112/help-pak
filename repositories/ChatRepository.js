import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  createConversation: "v1/chat/start-conversation",
  getMessages: "v1/chat/get-messages",
  getConversations: "v1/chat/get-conversations",
  sendMessage: "v1/chat/send-message",
};

class ChatRepository {
  async createConversation(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}/${routes.createConversation}`,
        payload
      );
      return {
        request,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async getMessagesByCoversationId(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getMessages}/${id}`
      );
      return request;
    } catch (error) {
      throw getError(error);
    }
  }

  async getConversationsByUserId(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getConversations}/${id}`
      );
      // if (request == undefined) throw new Error("Your session is expired");
      //   const {data} = request;
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async sendMessage(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}/${routes.sendMessage}`,
        payload
      );
      // if (request == undefined) throw new Error("Your session is expired");
      return request;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new ChatRepository();
