import {Button} from "@chakra-ui/react";
import styles from "./custom-button.module.scss";

const CustomButton = ({title, onClick, loading, disable, ...props}) => {
  return (
    <div className={styles.btn}>
      <Button
        isLoading={loading || false}
        loadingText="wait"
        sx={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          curser: "pointer",
          width: "100%",
        }}
        _hover={{backgroundColor: "transparent"}}
        _focus={{backgroundColor: "transparent", border: "none"}}
        _active={{backgroundColor: "white", color: "black"}}
        role="button"
        tabIndex={0}
        p={2}
        onClick={onClick}
        isDisabled={disable || false}
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
