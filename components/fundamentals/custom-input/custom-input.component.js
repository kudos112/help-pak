import styles from "./custom-input.module.scss";
const CustomInput = ({title, placeholder, error, ...props}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>
        <input className={styles.input} placeholder={placeholder} {...props} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default CustomInput;
