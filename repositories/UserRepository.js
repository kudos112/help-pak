import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  getUser: "v1/users",
};

class UserRepository {
  async getUserById(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getUser}/${id}`
      );
      return request;
    } catch (error) {
      throw getError(error);
    }
  }
}
export default new UserRepository();
