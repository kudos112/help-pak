import styles from "./request.module.scss";
import CustomInput from "~/components/custom-input/custom-input.component";
import CustomTextArea from "~/components/custom-textarea/custom-textarea.component";
import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import Authenticated from "~/repositories/AuthHoc";

const MedicalAssistanceRequest = () => {
  const [data, setData] = useState({
    donationRequired: "",
    reason: "",
    frontSideCNIC: "",
    backSideCNIC: "",
    paymentMethods: [],
    description: "",
  });

  const handleData = async (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  setLoading(true);
    //  dispatch(loginRequest(data, handleLoading));
  };

  return (
    <div className={styles.page}>
      <Heading className={styles.heading}>
        Want to add your publish your medical assistance service
      </Heading>
      <div className={styles.container}>
        <form
          className={styles.container}
          style={{ width: "100%" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.inputContainer}>
            <div className={styles.leftDiv}>
              <CustomInput
                title="Service Name"
                name="name"
                type="name"
                required
                placeholder="name"
                //   onChange={(e) => handleData("donationRequired", e.target.value)}
              />
              <CustomInput
                title="Email"
                required
                placeholder="Email"
                // onChange={(e) => handleData("reason", e.target.value)}
              />
              <CustomInput
                title="Contact No"
                required
                placeholder="phone no"
                // onChange={(e) => handleData("reason", e.target.value)}
              />
              <CustomInput
                required
                title="Location"
                placeholder="full address"
                // onChange={(e) => handleData("reason", e.target.value)}
              />
              <CustomInput
                required
                title="Location"
                placeholder="full address"
                // onChange={(e) => handleData("reason", e.target.value)}
              />
            </div>
            <div className={styles.rightDiv}>
              <CustomTextArea
                required
                title="Description"
                placeholder="Write Description here"
                // onChange={(e) => handleData("description", e.target.value)}
              />

              <FileUploader
                title="Attach Images"
                placeholder="Drag or click to add"
                image={true}
                onDrop={(selectedFiles) => console.log(selectedFiles)}
              />
            </div>
          </div>
          <CustomButton title="Request to Add Medical Service" type="submit" />;
        </form>
      </div>
    </div>
  );
};

export default MedicalAssistanceRequest;
