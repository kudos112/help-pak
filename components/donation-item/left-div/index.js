import {Flex} from "@chakra-ui/react";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomSelect from "~/components/fundamentals/custom-select";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import categories from "~/utils/data/itemCategories.options";
import conditionOptions from "~/utils/data/itemCondition.options";

const LeftDiv = ({data, handleData, errors}) => {
  return (
    <>
      <CustomInput
        title="Name"
        type="name"
        required
        onChange={(e) => {
          handleData("name", e.target.value);
        }}
        value={data.name}
        error={errors.name}
        placeholder={"Wooden Double Bed"}
      />
      <CustomSelect
        label="Category"
        options={categories}
        error={errors.category}
        onChange={(item) => {
          handleData("category", item?.value || "");
        }}
        value={data.category}
        required
        placeholder="type or select category of item"
        instanceId="123"
      />
      <Flex mb={2} w={"100%"}>
        <CustomSelect
          label="Condition"
          error={errors.condition}
          options={conditionOptions}
          onChange={(item) => {
            handleData("condition", item?.value || "");
          }}
          value={data.condition}
          required
          placeholder="type or select condition"
          instanceId="123"
        />
      </Flex>
      <CustomTextArea
        title="Description"
        required
        error={errors.description}
        value={data.description}
        placeholder="type here the description of item"
        onChange={(e) => {
          handleData("description", e.target.value || "");
        }}
      />{" "}
    </>
  );
};

export default LeftDiv;
