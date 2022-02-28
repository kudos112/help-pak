import axios from "axios";

// // const xAppToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiRENHUyIsImlhdCI6MTYwNzg2NDcwMX0.F_3ZTAs_7MbboyzrNCkg0oOyV3yIacP81wee8LPTHJw`;

const baseDomain = "http://localhost:5000";

export const appName = "helpak_client";

export const customHeaders = {
  Accept: "application/json",
  "content-type": "application/json",
  // //   "x-app-token": xAppToken,
};

export const baseUrl = `${baseDomain}`;

const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

// instance.interceptors.request.use(
//   (config) => {
//     if (!config.doNotUseAuth) {
//       const _xAuthToken = localStorage.getItem(`${appName}_xAuthToken`) || null;
//       if (_xAuthToken) config.headers["x-auth-token"] = _xAuthToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;

// export const serializeQuery = (query) => {
//   return Object.keys(query)
//     .map(
//       (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
//     )
//     .join("&");
// };

// export const getError = (error) => {
//   if (error.response) {
//     if (error?.response?.data?.data?.errorMessage) {
//       return `${error.response.data.data.errorMessage}`;
//     } else if (error?.response?.data?.message) {
//       return `${error.response.data.message}`;
//     } else {
//       return error.response;
//     }
//   } else if (error.request) {
//     return error.request;
//   } else {
//     return `${error}`;
//   }
// };
