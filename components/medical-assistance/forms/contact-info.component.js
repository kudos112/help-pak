import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import styles from "./forms.module.scss";

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
      <CustomInput
        title="City"
        value={data.city}
        error={errors.city}
        required
        placeholder="City"
        onChange={(e) => handleData("city", e.target.value)}
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
