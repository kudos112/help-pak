import styles from "./custom-button.module.scss";

const CustomButton = ({ backgroundColor, title }) => {
  return <div className={styles.btn}>{title}</div>;
};

export default CustomButton;
