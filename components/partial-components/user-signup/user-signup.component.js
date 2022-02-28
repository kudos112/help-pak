import { useState } from "react";
import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/custom-input/custom-input.component";
import { warningNotification } from "~/components/notification/notification";
import { uploadImage } from "~/utils/image-uploader/upload-images.util";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";

const UserSignUp = ({ userType = "INDIVIDUAL" }) => {
  const [data, setData] = useState({
    name: "",
    frontSideImage: "",
    backSideImage: "",
    phoneNo: "",
    email: "",
    password: "",
    imagesUrl: [],
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "upload only one image and size limit of 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              console.log("url: ", url);
              setData({ ...data, imagesUrl: [...data.imagesUrl, url] });
              setData({ ...data, [imgName]: acceptedFiles[0].name });
            }
          });
        }
      });
    }
  };

  return (
    <div className="signup">
      <CustomInput
        title="Enter Your Name"
        placeholder="name"
        type="name"
        name="name"
        onChange={(e) => handleData("name", e.target.value)}
      />

      <FileUploader
        title={"Attach Image of Front Side of CNIC"}
        placeholder={
          data.frontSideImage ? data.frontSideImage : "Click here to upload"
        }
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
        }
      />
      <FileUploader
        title="Attach Image of Back Side of CNIC"
        placeholder={
          data.backSideImage ? data.backSideImage : "Click here to upload"
        }
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles, "backSideImage")
        }
      />
      <CustomInput
        title="Enter Your PhoneNo"
        placeholder="phone number"
        onChange={(e) => handleData("phoneNo", e.target.value)}
      />
      <CustomInput
        title="Enter Your Email"
        placeholder="email"
        type="email"
        name="email"
        onChange={(e) => handleData("email", e.target.value)}
      />
      <CustomInput
        title="Enter Your password"
        placeholder="password"
        name="password"
        type="password"
        onChange={(e) => handleData("password", e.target.value)}
      />
      <CustomButton
        onClick={() => {
          // dispatch( register() );
          console.log(data);
        }}
        title="Create Account"
      />
    </div>
  );
};

export default UserSignUp;
