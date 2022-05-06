import {Spinner} from "@chakra-ui/react";
import {useState} from "react";
import styles from "./user-signup.module.scss";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import {
  errorNotification,
  warningNotification,
} from "~/components/fundamentals/notification/notification";
import {uploadImage} from "~/utils/image-uploader/upload-images.util";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";
import {useDispatch} from "react-redux";
import {userSignUpRequest} from "~/redux/auth/auth.actions";

const UserSignUp = ({userType = "INDIVIDUAL"}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "Abdul Quddous",
    frontSideImage: "",
    backSideImage: "",
    phoneNo: "123456789",
    email: "quddoux112@gmail.com",
    password: "helpak@test123",
  });

  const handleData = (key, value) => {
    setData({...data, [key]: value});
  };

  const deleteImage = () => {};

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length > 2 || images.length < 2) {
      errorNotification("Error", "Please Upload both images");
      return;
    } else {
      const payload = {
        userType,
        name: data.name,
        email: data.email,
        password: data.password,
        images,
        phoneNo: data.phoneNo,
      };
      setLoading(true);
      dispatch(userSignUpRequest(payload, handleLoading));
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
              setImages([...images, `${url}`]);
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
            title="Enter Your Name"
            placeholder="name"
            type="name"
            name="name"
            value={data.name}
            required
            onChange={(e) => handleData("name", e.target.value)}
          />

          <FileUploader
            title={"Attach Image of Front Side of CNIC"}
            placeholder={
              data.frontSideImage ? data.frontSideImage : "Click here to upload"
            }
            image={true}
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
            image={true}
            accept={["image/jpeg", "image/png", "image/bmp"]}
            maxFiles={1}
            maxSize={1000000}
            onDrop={(acceptedFiles, rejectedFiles) =>
              onDrop(acceptedFiles, rejectedFiles, "backSideImage")
            }
          />
          <CustomInput
            title="Enter Your PhoneNo"
            value={data.phoneNo}
            placeholder="phone number"
            required
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
            value={data.password}
            required
            type="password"
            onChange={(e) => handleData("password", e.target.value)}
          />
          <CustomButton type="submit" title="Create Account" />
        </form>
      )}
    </div>
  );
};

export default UserSignUp;
