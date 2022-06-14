import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import styles from "./custom-textarea.module.scss";
const CustomTextArea = ({title, error, required, placeholder, ...props}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <FormControl mb={2} isRequired={required} isInvalid={error || false}>
          <FormLabel color={"customGray"} fontSize={"0.9rem"}>
            {title}
          </FormLabel>
          <Textarea
            bg="white"
            borderRadius="5px"
            borderColor="gray.300"
            placeholder={placeholder}
            size="sm"
            _focus={{
              border: "2px solid #15803d",
            }}
            {...props}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </div>
    </div>
  );
};

export default CustomTextArea;
