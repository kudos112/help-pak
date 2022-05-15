import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import styles from "./forms.module.scss";

const OrganizerInfo = ({data, handleData, errors}) => {
  return (
    <div className={styles.inputContainer}>
      <CustomInput
        title="Organizer Name"
        required
        name="name"
        type="name"
        value={data.email}
        error={errors.email}
        placeholder="Email"
        onChange={(e) => handleData("email", e.target.value)}
      />
      <CustomInput
        title="Organizer Email"
        name="phone No"
        type="number"
        value={data.phoneNo}
        error={errors.phoneNo}
        required
        placeholder="03xx-xxxxxxx"
        onChange={(e) => handleData("phoneNo", e.target.value)}
      />
    </div>
  );
};

export default OrganizerInfo;
