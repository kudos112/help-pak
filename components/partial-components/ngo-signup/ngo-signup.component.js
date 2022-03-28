import {useState} from "react";
import {useDispatch} from "react-redux";
import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import styles from "./ngo-signup.module.scss";
import CustomInput from "~/components/custom-input/custom-input.component";
import {Spinner} from "@chakra-ui/react";
import {
  errorNotification,
  warningNotification,
} from "~/components/notification/notification";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";
import {uploadImage} from "~/utils/image-uploader/upload-images.util";
import {ngoSignUpRequest} from "~/redux/auth/auth.actions";

const NgoSignUp = ({userType = "NGO"}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [images, setImages] = useState(["123"]);
  const [data, setData] = useState({
    name: "Abdul Quddous",
    certImg: "",
    phoneNo: "123456789",
    email: "quddoux119@gmail.com",
    password: "helpak@test123",
    regNo: "12345678",
  });

  const handleData = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    console.log("handle submit button pressed");
    e.preventDefault();
    if (images.length < 1) {
      errorNotification("Error", "Please Upload certificate image");
    } else {
      const payload = {
        userType,
        name: data.name,
        email: data.email,
        password: data.password,
        images,
        regNo: data.regNo,
        phoneNo: data.phoneNo,
      };
      console.log(payload);
      setLoading(true);
      dispatch(ngoSignUpRequest(payload, handleLoading));
    }
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
              setImages([url]);
              setData({...data, [imgName]: acceptedFiles[0].name});
            }
          });
        }
      });
    }
  };

  return (
    <div className={styles.signup}>
      {loading ? (
        <div className={styles.spinner}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="lightGreen"
            color="green"
            size="xl"
          />
        </div>
      ) : (
        <form style={{width: "100%"}} onSubmit={(e) => handleSubmit(e)}>
          <CustomInput
            title="Enter NGO Name"
            placeholder="ngo name"
            value={data.name}
            type="name"
            name="name"
            required
            onChange={(e) => handleData("name", e.target.value)}
          />

          <CustomInput
            title="Enter Reg No"
            placeholder="VSWA/ICT/494 etc"
            type="name"
            required
            name="name"
            value={data.regNo}
            onChange={(e) => handleData("regNo", e.target.value)}
          />
          <FileUploader
            title="Attach authentication Certificate"
            placeholder={data.certImg ? data.certImg : "Click here to upload"}
            accept={["image/jpeg", "image/png", "pdf"]}
            maxFiles={1}
            image={true}
            maxSize={2000000}
            onDrop={(acceptedFiles, rejectedFiles) =>
              onDrop(acceptedFiles, rejectedFiles, "certImg")
            }
          />

          <CustomInput
            title="Enter Your PhoneNo"
            placeholder="phone number"
            value={data.phoneNo}
            onChange={(e) => handleData("phoneNo", e.target.value)}
          />
          <CustomInput
            title="Enter Your Email"
            placeholder="email"
            type="email"
            value={data.email}
            required
            name="email"
            onChange={(e) => handleData("email", e.target.value)}
          />
          <CustomInput
            title="Enter Your password"
            placeholder="password"
            name="password"
            required
            value={data.password}
            type="password"
            onChange={(e) => handleData("password", e.target.value)}
          />
          <CustomButton type="submit" title="Create Account" />
        </form>
      )}
    </div>
  );
};

export default NgoSignUp;
