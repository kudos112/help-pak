import React from "react";
import Router from "next/router";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "~/redux/auth/auth.selector";

const Wrapper = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated] = checkUserAuthentication();
    if (isAuthenticated) return <WrappedComponent {...props} />;
    else return <GoToLogin />;
  };
};

export default Wrapper;

const checkUserAuthentication = () => {
  // const dispatch = useDispatch();
  // const isLoggedIn = useState(false);
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));
  React.useEffect(() => {
    // dispatch(getUserDetails());
  }, []);
  return [isLoggedIn];
};

const GoToLogin = () => {
  React.useEffect(() => {
    Router.push("/account/login");
  }, []);

  return <React.Fragment />;
};
