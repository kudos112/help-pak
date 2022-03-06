import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/custom-input/custom-input.component";

const NgoSignUp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [images, setImages] = useState(["123", "123"]);
  const [data, setData] = useState({
    name: "Abdul Quddous",
    frontSideImage: "123",
    phoneNo: "123456789",
    email: "quddoux112@gmail.com",
    password: "helpak@test123",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 2) {
      console.log(images);
      errorNotification("Error", "Please Upload both images");
    } else {
      const payload = {
        userType,
        name: data.name,
        email: data.email,
        password: data.password,
        images,
        phoneNo: data.phoneNo,
      };
      console.log(payload);
      setLoading(true);
    }
    dispatch(userSignUpRequest(payload, handleLoading));
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
        title="Enter NGO Name"
        placeholder="ngo name"
        value={data.name}
        type="name"
        name="name"
      />

      <CustomInput
        title="Enter Reg No"
        placeholder="VSWA/ICT/494 etc"
        type="name"
        name="name"
      />
      <FileUploader
        title="Attach authentication Certificate"
        placeholder="Click here to upload"
        accept={["image/jpeg", "image/png", "pdf"]}
        maxFiles={1}
        image={true}
        maxSize={2000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
        }
      />

      <CustomInput title="Enter Your PhoneNo" placeholder="phone number" />
      <CustomInput
        title="Enter Your Email"
        placeholder="email"
        type="email"
        name="email"
      />
      <CustomInput
        title="Enter Your password"
        placeholder="password"
        name="password"
        type="password"
      />
      <CustomButton
        onClick={() => {
          dispatch(register());
          notification({
            title: "submitted",
          });
        }}
        title="Create Account"
      />
    </div>
  );
};

export default NgoSignUp;
