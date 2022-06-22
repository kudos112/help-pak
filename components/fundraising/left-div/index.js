import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomSelect from "~/components/fundamentals/custom-select";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import { cities } from "~/utils/data/cities";
import reasons from "~/utils/data/fundraisingsTypes.options";

const LeftDiv = ({data, handleData, errors, update}) => {
  return (
    <>
      <CustomInput
        title="Fundraising Title"
        type="text"
        required
        disabled={update}
        onChange={(e) => {
          handleData("name", e.target.value);
        }}
        value={data.name}
        error={errors.name}
        placeholder={"Orphans need shelter and clothes"}
      />
      <CustomSelect
        label="Fundraising Reason"
        options={reasons}
        value={data.reason}
        onChange={(item) => {
          handleData("reason", item?.value || "");
        }}
        required
        error={errors.reason}
        placeholder="type or select reason"
        instanceId="123"
      />

      <CustomTextArea
        title="Description"
        required
        error={errors.description}
        value={data.description}
        placeholder="type here the description of item"
        onChange={(e) => {
          handleData("description", e.target.value || "");
        }}
      />
      <CustomInput
        title="Contact Email"
        type="email"
        required
        onChange={(e) => {
          handleData("email", e.target.value);
        }}
        value={data.email}
        error={errors.name}
        placeholder={"email"}
      />
      <CustomInput
        title="Contact Number"
        type="number"
        value={data.phoneNo}
        required
        onChange={(e) => {
          handleData("phoneNo", e.target.value);
        }}
        error={errors.name}
        placeholder={"03123456789"}
      />
      <CustomSelect
        label="City"
        options={cities}
        value={data.city}
        onChange={(item) => {
          handleData("city", item?.value || "");
        }}
        required
        error={errors.city}
        placeholder="type or select city"
        instanceId="123"
      />
    </>
  );
};

export default LeftDiv;
