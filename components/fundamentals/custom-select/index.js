import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import Select from "react-select";

const CustomSelect = ({
  label,
  required,
  value,
  options,
  onChange,
  error,
  ...props
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 40,
      minHeight: 40,
    }),
  };
  return (
    <FormControl mb={2} isRequired={required} isInvalid={error || false}>
      <FormLabel color={"customGray"} fontSize={"0.9rem"}>
        {label}
      </FormLabel>
      <Select
        allowCreateWhileLoading
        isClearable
        backspaceRemovesValue
        blurInputOnSelect
        instanceId="123"
        placeholder="type or select city"
        defaultInputValue={value}
        options={options}
        onChange={onChange}
        styles={customStyles}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomSelect;
