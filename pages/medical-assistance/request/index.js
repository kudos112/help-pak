import styles from "./request.module.scss";
import CustomInput from "~/components/custom-input/custom-input.component";
import CustomTextArea from "~/components/custom-textarea/custom-textarea.component";
import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import {useState} from "react";
import {Heading} from "@chakra-ui/react";
import Authenticated from "~/repositories/AuthHoc";

const MedicalAssistanceRequest = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contactNo: "",
    city: "",
    streetAddress: "",
    description: "",
    tags: [],
    images: ["qwertyuioplasdfghjk", "1234567890qwertyuioasdfghjkzxcvbnm"],
  });

  const handleData = async (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  setLoading(true);
    //  dispatch(loginRequest(data, handleLoading));
  };

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles) {
      warningNotification("warning", "upload files under 2 mb size");
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              setImages([url]);
              setData({...data, [imgName]: acceptedFiles[0].name});
            }
          });
        }
      });
    }
  };

  return (
    <div className={styles.page}>
      <Heading className={styles.heading}>
        Want to add your publish your medical assistance service
      </Heading>
      <div className={styles.container}>
        <form
          className={styles.container}
          style={{width: "100%"}}
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
                onChange={(e) => handleData("name", e.target.value)}
              />
              <CustomInput
                title="Email"
                required
                placeholder="Email"
                onChange={(e) => handleData("email", e.target.value)}
              />
              <CustomInput
                title="Contact No"
                required
                placeholder="03099091509"
                onChange={(e) => handleData("contactNo", e.target.value)}
              />
              <CustomInput
                required
                title="City"
                placeholder="city name"
                onChange={(e) => handleData("city", e.target.value)}
              />
              <CustomInput
                required
                title="Full Address"
                placeholder="full address plus nearest landmark"
                onChange={(e) => handleData("streetAddress", e.target.value)}
              />
            </div>
            <div className={styles.rightDiv}>
              <CustomTextArea
                required
                title="Description"
                placeholder="Write Description here"
                onChange={(e) => handleData("description", e.target.value)}
              />

              <FileUploader
                title="Attach Images"
                placeholder={data.images.toString() || "click to add images"}
                accept={["image/jpeg", "image/png"]}
                image={true}
                maxSize={2000000}
                onDrop={(selectedFiles) => alert(JSON.stringify(selectedFiles))}
              />
            </div>
          </div>
          <CustomButton title="Request to Add Medical Service" type="submit" />;
        </form>
      </div>
    </div>
  );
};

export default Authenticated(MedicalAssistanceRequest);
