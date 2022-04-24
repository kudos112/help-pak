import styles from "./request.module.scss";
import CustomInput from "../../../components/fundamentals/custom-input/custom-input.component";
import CustomTextArea from "../../../components/fundamentals/custom-textarea/custom-textarea.component";
import CustomButton from "../../../components/fundamentals/custom-button/custom-button.component";
import {Textarea} from "@chakra-ui/react";
import FileUploader from "../../../components/fundamentals/custom-fileuploader/file-upload.component";
import Dropzone from "react-dropzone";
import {useState} from "react";

const FundraisingRequest = () => {
  const [data, setData] = useState({
    donationRequired: "",
    reason: "",
    frontSideCNIC: "",
    backSideCNIC: "",
    paymentMethods: [],
    description: "",
  });

  const handleData = async (key, value) => {
    await setData({...data, [key]: value});
  };

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <span className={styles.gray}>Request</span>
        <span className={styles.green}>Fundraising</span>
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.leftDiv}>
            <CustomInput
              title="Donation Required"
              placeholder="40000 etc"
              onChange={(e) => handleData("donationRequired", e.target.value)}
            />
            <CustomInput
              title="Reason"
              placeholder="just two or three words"
              onChange={(e) => handleData("reason", e.target.value)}
            />
            <FileUploader
              title="Attach Front Side image of CNIC "
              placeholder="Drag or click to add"
              onDrop={(selectedFiles) => console.log(selectedFiles)}
            />
            <FileUploader
              title="Attach Back Side image of CNIC "
              placeholder="Drag or click to add"
              onDrop={(selectedFiles) => console.log(selectedFiles)}
            />
            <CustomInput
              title="Add Payment Methods"
              placeholder="Jazzcash, Easypaisa, Bank"
            />
          </div>
          <div className={styles.rightDiv}>
            <CustomTextArea
              title="Description"
              placeholder="Write Description here"
              onChange={(e) => handleData("description", e.target.value)}
            />
            <CustomInput title="Attach Images" placeholder="Attach Images" />
          </div>
        </div>
        <CustomButton title="Request for fundraise" />;
      </div>
    </div>
  );
};

export default FundraisingRequest;
