import {FormControl, FormLabel} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import styles from "./forms.module.scss";
import options from "~/utils/data/campTypes.options";

const Introduction = ({data, handleData, errors}) => {
  return (
    <div className={styles.inputContainer}>
      <FormControl mt={4} mb={4}>
        <FormLabel size="sm">Select Camp Type</FormLabel>
        <Select
          instanceId="123"
          options={options}
          selectedValue={data.campType}
          onChange={(item) => {
            handleData("campType", item.value);
          }}
        />
        {data.campType}
      </FormControl>
      <CustomInput
        title="Name"
        value={data.name}
        name="name"
        type="name"
        error={errors.name}
        required
        placeholder="name"
        onChange={(e) => handleData("name", e.target.value)}
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
