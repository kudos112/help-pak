import axios from "axios";
import {errorNotification} from "~/components/fundamentals/notification/notification";

// const xAppToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiRENHUyIsImlhdCI6MTYwNzg2NDcwMX0.F_3ZTAs_7MbboyzrNCkg0oOyV3yIacP81wee8LPTHJw`;

let baseDomain = "https://backend-helpak.herokuapp.com";
if (process.env.NODE_ENV === "development")
  baseDomain = "http://localhost:5000";

export const appName = "helpak_client";

export const customHeaders = {
  Accept: "application/json",
  "content-type": "application/json",
};

export const baseUrl = `${baseDomain}`;

const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

instance.defaults.timeout = 4000;

instance.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      alert(
        "You're offline, Check your connection to use this application further"
      );
    }
    const accessToken = localStorage.getItem(`${appName}_accessToken`) || null;
    if (accessToken) config.headers["Authorization"] = "bearer " + accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error?.config;
    if (
      error?.response?.status === 401 &&
      originalRequest.url === `${baseUrl}/v1/auth/refresh-tokens`
    ) {
      errorNotification(" Log in again", "Your session has expired");
      router.push("/login");
      return Promise.reject(error);
    }

    if (
      originalRequest.url !== `${baseUrl}/v1/auth/login` ||
      originalRequest.url !== `${baseUrl}/v1/auth/logout`
    )
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken =
          localStorage.getItem(`${appName}_refreshToken`) || null;
        return axios
          .post(`${baseUrl}/v1/auth/refresh-tokens`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              let tokens = res.data;
              let _tokens = {
                accessToken: tokens.access.accessToken,
                refreshToken: tokens.refresh.refreshToken,
              };
              localStorage.removeItem(`${appName}_accessToken`);
              localStorage.removeItem(`${appName}_refreshToken`);
              for (const key of Object.keys(_tokens))
                localStorage.setItem(`${appName}_${key}`, _tokens[key]);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem(`${appName}_accessToken`) ||
                null;
              return axios(originalRequest);
            }
          });
      }
    return Promise.reject(error);
  }
);

export default instance;

export const getError = (error) => {
  if (error?.response) {
    if (error?.response?.data?.data?.errorMessage) {
      return `${error.response.data.data.errorMessage}`;
    } else if (error?.response?.data?.message) {
      return `${error.response.data.message}`;
    } else {
      return error?.response;
    }
  }
  if (error?.message) {
    return error.message;
  } else if (error?.request) {
    if (typeof error?.request === "string") return error.request;
    return `Error occured, try again soon`;
  }

  return `Error occured, try again soon`;
};
