import CustomButton from "~/components/custom-button/custom-button.component";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/custom-input/custom-input.component";

const NgoSignUp = () => {
  return (
    <div className="signup">
      <CustomInput
        title="Enter NGO Name"
        placeholder="ngo name"
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
        maxSize={2000000}
        onDrop={(acceptedFiles, rejectedFiles) => {
          console.log(acceptedFiles);
          console.log(rejectedFiles);
          errorNotification("file submitted", "successfully");
          successNotification("file submitted", "successfully");
          infoNotification("file submitted", "successfully");
          warningNotification("file submitted", "successfully");
        }}
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
