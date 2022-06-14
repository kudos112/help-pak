import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  create: "v1/donation-item/",
  get: "v1/donation-item",
  patch: "v1/donation-item",
  delete: "/v1/donation-item",
  getByUserId: "v1/donation-item/user",
};

class DonationRepository {
  async createDonationItem(payload) {
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

  async updateDonationItem(id, payload) {
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

  async getDonationItemById(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteDonationItemById(id) {
    try {
      const request = await Repository.delete(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getDonationItemByUserId(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getByUserId}/${id}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getDonationItems(name, city, category, condition) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.get}?enabled=true&deleted=false&name=${name}&city=${city}&category=${category}&condition=${condition}`
      );
      // if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return data;
    } catch (error) {
      throw getError(error);
    }
  }
  // async getYourDonationItems() {
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

export default new DonationRepository();
