import NavBar from "../partial-components/nav-bar/nav-bar.component";
import styles from "./layout.module.scss";

const Layout = ({children}) => {
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Layout;
