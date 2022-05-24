import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import styles from "./custom-input.module.scss";
const CustomInput = ({title, placeholder, required, error, ...props}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <FormControl isRequired={required} isInvalid={error || false}>
          <FormLabel color={"customGray"} fontSize={"0.9rem"}>
            {title}
          </FormLabel>
          <Input
            height={"2.5rem"}
            mb={2}
            fontSize={"1rem"}
            borderColor="gray.300"
            bg="white"
            boxSizing="border"
            placeholder={placeholder}
            _focus={{
              border: "2px solid #15803d",
            }}
            {...props}
          />
          <FormErrorMessage mt={-1} mb={2}>
            {error}
          </FormErrorMessage>
        </FormControl>
      </div>
    </div>
  );
};

export default CustomInput;
