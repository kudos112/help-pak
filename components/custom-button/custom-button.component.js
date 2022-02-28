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
        }}
        _hover={{ backgroundColor: "transparent" }}
        _focus={{ backgroundColor: "transparent", border: "none" }}
        role="button"
        tabIndex={0}
        onClick={onClick}
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
