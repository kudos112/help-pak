import { Button } from "@chakra-ui/react";
import styles from "./custom-button.module.scss";

const CustomButton = ({ title, onClick, ...props }) => {
  return (
    <div className={styles.btn}>
      <Button
        sx={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          curser: "pointer",
          width: "100%",
        }}
        _hover={{ backgroundColor: "transparent" }}
        _focus={{ backgroundColor: "transparent", border: "none" }}
        role="button"
        tabIndex={0}
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
