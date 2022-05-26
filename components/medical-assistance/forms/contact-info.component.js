import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import styles from "./forms.module.scss";
import {cities} from "~/utils/data/cities";
import CustomSelect from "~/components/fundamentals/custom-select";

const ContactInfo = ({data, handleData, errors}) => {
  return (
    <div className={styles.inputContainer}>
      <CustomInput
        title="Phone Number"
        name="phone No"
        type="number"
        value={data.phoneNo}
        error={errors.phoneNo}
        required
        placeholder="03xx-xxxxxxx"
        onChange={(e) => handleData("phoneNo", e.target.value)}
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
        title="Full Address"
        value={data.fullAddress}
        error={errors.fullAddress}
        required
        placeholder="full address"
        onChange={(e) => handleData("fullAddress", e.target.value)}
      />
    </div>
  );
};

export default ContactInfo;
