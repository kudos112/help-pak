import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  create: "v1/ngos/",
  get: "v1/ngos",
  patch: "v1/ngos",
  delete: "/v1/ngos",
  getByUserId: "v1/ngos/user",
};

class NgoRepository {
  async createNgo(payload) {
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

  async updateNgo(id, payload) {
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

  async getNgoById(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteNgoById(id) {
    try {
      const request = await Repository.delete(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getNgoByUserId(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.getByUserId}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getNgos(name, city, reason, bankName, page) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.get}?published=true&name=${name}&city=${city}&page=${page}`
      );
      // if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return data;
    } catch (error) {
      throw getError(error);
    }
  }
  // async getYourNgoItems() {
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

export default new NgoRepository();
