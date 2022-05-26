import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  sendMessage: "v1/email/",
};

class EmailRepository {
  async sendMessage(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}/${routes.sendMessage}`,
        payload
      );
      return request;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new EmailRepository();
