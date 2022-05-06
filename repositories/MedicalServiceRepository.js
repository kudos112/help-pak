import Repository, {baseUrl, getError} from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  create: "v1/medicalassistance/",
  get: "v1/medicalassistance",
  patch: "/v1/medicalassistance",
  delete: "/v1/medicalassistance",
};

class MedicalServiceRepository {
  async createMedicalAssistance(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}/${routes.create}`,
        payload
      );
      if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return {
        message: data.message,
        description: data.description,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async getMedicalAssistanceById(id) {
    try {
      const request = await Repository.get(`${baseUrl}/${routes.get}/${id}`);
      console.log("In service", request);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getMedicalAssistances(name, city, serviceType) {
    try {
      const request = await Repository.get(
        `${baseUrl}/${routes.get}?name=${name}&city=${city}&serviceType=${serviceType}`
      );
      if (request == undefined) throw new Error("Your session is expired");
      const {data} = request;
      return data;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new MedicalServiceRepository();
