import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  create: "v1/fundraising/",
  get: "v1/fundraising",
  patch: "v1/fundraising",
  delete: "/v1/fundraising",
  getByUserId: "v1/fundraising/user",
};

class FundraisingRepository {
  async createFundraising(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}/${routes.create}`,
        payload
      );
      // if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return {
        message: data.message,
        description: data.description,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async updateFundraising(id, payload) {
    try {
      const request = await Repository.patch(
        `${baseUrl}/${routes.patch}/${id}`,
        payload
      );
      return request;
    } catch (error) {
      throw getError(error);
    }
  }

  async getFundraisingById(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteFundraisingById(id) {
    try {
      const request = await Repository.delete(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getFundraisingByUserId(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getByUserId}/${id}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getFundraisings(name, city, reason, bankName) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.get}?enabled=true&deleted=false&name=${name}&city=${city}&reason=${reason}`
      );
      // if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return data;
    } catch (error) {
      throw getError(error);
    }
  }
  // async getYourFundraisingItems() {
  //   try {
  //     const request = await Repository.get(`${baseUrl}/${routes.get}`);
  //     // if (request == undefined) throw new Error("Your session is expired");
  //     const {data} = request;
  //     return data;
  //   } catch (error) {
  //     throw getError(error);
  //   }
  // }
}

export default new FundraisingRepository();
