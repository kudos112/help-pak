import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  create: "v1/medical-camp/",
  get: "v1/medical-camp",
  patch: "/v1/medical-camp",
  delete: "/v1/medical-camp",
  getByUserId: "v1/medical-camp/getcamps",
};

class MedicalServiceRepository {
  async createMedicalCamp(payload) {
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

  async getMedicalCampById(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.get}/${id}`);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async getMedicalCampByUserId(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.getByUserId}/${id}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getMedicalCamps(name, city, campType) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.get}?enabled=true&deleted=false&name=${name}&city=${city}&campType=${campType}`
      );
      // if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return data;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new MedicalServiceRepository();
