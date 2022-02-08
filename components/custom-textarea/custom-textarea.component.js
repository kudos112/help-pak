import { Textarea } from "@chakra-ui/react";
import styles from "./custom-textarea.module.scss";
const CustomTextArea = ({ title, placeholder, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};

export default CustomTextArea;
