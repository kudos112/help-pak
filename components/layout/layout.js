import NavBar from "../nav-bar/nav-bar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
