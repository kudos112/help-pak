import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { isUserAuthenticated, getUserInfo } from "~/store/auth/selectors";
// import { getUserDetails } from "~/store/userInfo/action";
// import { getUserInfoLoading } from "~/store/userInfo/selectors";
import Router from "next/router";
const Wrapper = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated] = checkUserAuthentication();
    if (isAuthenticated) return <WrappedComponent {...props} />;
    else return <GoToLogin />;
  };
};

export default Wrapper;

const checkUserAuthentication = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useState(false);
  React.useEffect(() => {
    // dispatch(getUserDetails());
  }, []);
  //   const isAuthenticated = useSelector(isUserAuthenticated);
  //   const userInfoLoading = useSelector(getUserInfoLoading);

  return [isLoggedIn];
};

const GoToLogin = () => {
  React.useEffect(() => {
    Router.push("/account/login");
  }, []);

  return <React.Fragment />;
};
