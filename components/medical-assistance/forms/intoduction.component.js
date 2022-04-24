import {FormControl, FormLabel} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import styles from "./forms.module.scss";

const Introduction = ({data, handleData, errors}) => {
  const options = [
    {label: "Mental health care", value: "Mental health care"},
    {label: "Dental care", value: "Dental care"},
    {
      label: "Laboratory and diagnostic care",
      value: "Laboratory and diagnostic care",
    },
    {label: "Substance abuse treatment", value: "Substance abuse treatment"},
    {label: "Preventative care", value: "Preventative care"},
    {
      label: "Physical and occupational therapy",
      value: "Physical and occupational therapy",
    },
    {label: "Nutritional support", value: "Nutritional support"},
    {label: "Pharmaceutical care", value: "Pharmaceutical care"},
    {label: "Transportation", value: "Transportation"},
    {label: "Prenatal care", value: "Prenatal care"},
  ];

  return (
    <div className={styles.inputContainer}>
      <FormControl mt={4} mb={4}>
        <FormLabel>Select Service Type</FormLabel>
        <Select
          options={options}
          onChange={(item) => {
            handleData("serviceType", item.value);
          }}
        />
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
