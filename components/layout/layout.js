import NavBar from "../nav-bar/nav-bar.component";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
