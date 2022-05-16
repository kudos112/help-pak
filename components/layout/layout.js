import NavBar from "../partial-components/nav-bar/nav-bar.component";

const Layout = ({children}) => {
  return (
    <div style={{display: "flex"}}>
      <div
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        <NavBar />
      </div>
      <div style={{width: "100%", marginTop: "60px"}}>{children}</div>
    </div>
  );
};

export default Layout;
