import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomSelect from "~/components/fundamentals/custom-select";
import CustomTextArea from "~/components/fundamentals/custom-textarea/custom-textarea.component";
import {cities} from "~/utils/data/cities";
import reasons from "~/utils/data/fundraisingsTypes.options";

const LeftDiv = ({data, handleData, errors, update}) => {
  return (
    <>
      <CustomInput
        title="NGO Name"
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
      <CustomInput
        title="Registration Number"
        type="text"
        required
        onChange={(e) => {
          handleData("regNo", e.target.value);
        }}
        disabled
        value={data.regNo}
        error={errors.regNo}
        placeholder={"registration number"}
      />
      <CustomTextArea
        title="Background"
        required
        error={errors.background}
        value={data.background || ""}
        placeholder="how NGO started or what is main idea behind it"
        onChange={(e) => {
          handleData("background", e.target.value || "");
        }}
      />
      <CustomTextArea
        title="Vision"
        required
        error={errors.vision}
        value={data.vision || ""}
        placeholder="purpose or what is your goal or services"
        onChange={(e) => {
          handleData("vision", e.target.value || "");
        }}
      />
      <CustomInput
        title="Email"
        type="email"
        required
        onChange={(e) => {
          handleData("email", e.target.value);
        }}
        value={data.email}
        error={errors.email}
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
        error={errors.phoneNo}
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
      <CustomInput
        title="Complete Address"
        required
        value={data.fullAddress}
        error={errors.fullAddress}
        onChange={(e) => {
          handleData("fullAddress", e.target.value);
        }}
        placeholder={"house no, street, hometown "}
      />
    </>
  );
};

export default LeftDiv;
