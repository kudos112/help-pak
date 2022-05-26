import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import styles from "./forms.module.scss";
import options from "~/utils/data/serviceType.options";
import CustomSelect from "~/components/fundamentals/custom-select";

const Introduction = ({data, handleData, errors}) => {
  return (
    <div className={styles.inputContainer}>
      <FormControl mt={4} mb={4}>
        <FormLabel>Select Service Type</FormLabel>
        <CustomSelect
          instanceId="123"
          options={options}
          onChange={(item) => {
            handleData("serviceType", item?.value || "");
          }}
          placeholder="Select Service Type"
          value={data.serviceType}
        />
        <FormErrorMessage>{errors?.serviceType || ""}</FormErrorMessage>
      </FormControl>
      <CustomInput
        title="Service Name"
        value={data.name}
        name="name"
        type="name"
        error={errors.name}
        required
        placeholder="name"
        onChange={(e) => handleData("name", e.target.value)}
      />
      <CustomInput
        title="Email"
        required
        value={data.email}
        error={errors.email}
        placeholder="Email"
        onChange={(e) => handleData("email", e.target.value)}
      />
      <CustomTextArea
        required
        title="Description"
        value={data.description}
        error={errors.description}
        placeholder="Write Description here"
        onChange={(e) => handleData("description", e.target.value)}
      />
    </div>
  );
};

export default Introduction;
