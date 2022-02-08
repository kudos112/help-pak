import styles from "./custom-button.module.scss";

const CustomButton = ({ title, onClick, ...props }) => {
  return (
    <button
      className={styles.btn}
      role="button"
      tabIndex={0}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
};

export default CustomButton;
