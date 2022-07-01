import {PhoneIcon} from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import styles from "./custom-input.module.scss";
const CustomPhoneNoInput = ({
  title,
  placeholder,
  required,
  error,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <FormControl isRequired={required} isInvalid={error || false}>
          <FormLabel color={"customGray"} fontSize={"0.9rem"}>
            {title}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Flex pl={4} align="center">
                  <Text>(+92)</Text>
                </Flex>
              }
            />
            <Input
              pl={14}
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
          </InputGroup>

          <FormErrorMessage mt={-1} mb={2}>
            {error}
          </FormErrorMessage>
        </FormControl>
      </div>
    </div>
  );
};

export default CustomPhoneNoInput;
