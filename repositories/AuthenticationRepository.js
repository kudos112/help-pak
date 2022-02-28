import Repository, { baseUrl } from "./genericRepository";
// import { getOsType } from "./utils";
// const randomstring = require("randomstring");

const routes = {
  register: "v1/auth/register",
  login: "/v1/auth/login",
  logout: "/v1/auth/logout",
  refreshTokens: "/v1/auth/refresh-tokens",
  sendVerifyEmail: "/v1/auth/send-verification-email",
  verifyEmail: "/v1/auth/verify-email",
  forgetPassword: "/v1/auth/forgot-password",
  resetPassword: "/v1/auth/reset-password",
};

// const deviceToken = randomstring.generate();

class AuthenticationRepository {
  async register(payload) {
    try {
      console.log("going to hit register end point", payload);
      const postObject = { ...payload };
      const request = await Repository.post(
        `${baseUrl}/${routes.register}`,
        postObject
      );
      //   console.log("Query registered");
      //   console.log(request);
      //     const xAuthToken = request.data.tokens["x-auth-token"];
      //     const refreshToken = request.data.["x-refresh-token"];

      //      return {
      //       tokens: { xAuthToken, refreshToken },
      //       payload: request.data,
      //     };
    } catch (error) {
      console.log("Query not error registered");
      // throw getError(error);
    }
  }
  async login(payload) {
    try {
      const postObject = { ...payload };
      const request = await Repository.post(
        `${baseUrl}${routes.login}`,
        postObject
      );
      const { data } = request;
      return {
        tokens: data.tokens,
        user: data.user,
      };
    } catch (error) {
      throw error;
    }
  }
  //   async logout() {
  //     try {
  //       const val = await Repository.post(`${baseUrl}${routes.logout}`, {
  //         deviceToken,
  //       });
  //     } catch (error) {
  //       throw getError(error);
  //     }
  //   }
  //   async sendotp({ email }) {
  //     try {
  //       return await Repository.post(`${baseUrl}${routes.generateoptp}`, {
  //         email,
  //       });
  //     } catch (error) {
  //       throw getError(error);
  //     }
  //   }
  //   async verifyOtp({ email, otp }) {
  //     try {
  //       return await Repository.post(`${baseUrl}${routes.verifyotp}`, {
  //         email,
  //         otp,
  //       });
  //     } catch (error) {
  //       throw getError(error);
  //     }
  //   }
  //   async newpassword({ email, newPassword }) {
  //     try {
  //       return await Repository.post(`${baseUrl}${routes.changepassword}`, {
  //         email,
  //         newPassword,
  //       });
  //     } catch (error) {
  //       throw getError(error);
  //     }
  //   }
}

export default new AuthenticationRepository();
