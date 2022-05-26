import {Heading} from "@chakra-ui/react";
import {useState} from "react";
import Stepper from "~/components/common/stepper/stepper";
import ContactInfo from "~/components/medical-assistance/forms/contact-info.component";
import Imagesinfo from "~/components/medical-assistance/forms/images.component";
import Introduction from "~/components/medical-assistance/forms/intoduction.component";
import Timings from "~/components/medical-assistance/forms/timings.component";
import ShowData from "~/components/medical-assistance/show-data.component";
import {validatePropery} from "~/validations/medical-assistance.validation";
import styles from "./request.module.scss";
import AuthenticationWrapper from "~/repositories/AuthHoc";

const MedicalAssistanceRequest = () => {
  const [data, setData] = useState({
    name: "ABdul Quddous",
    email: "quddoux112@gmail.com",
    serviceType: "",
    phoneNo: "3121213456",
    city: "Lahore",
    fullAddress: "kjkdfkdjfkjd",
    description: "kjdfksjfdkj",
    startTime: "",
    endTime: "",
    fullDay: false,
    workingDays: [],
    tags: [],
    images: "",
  });

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    serviceType: "",
    contactNo: "",
    city: "",
    streetAddress: "",
    description: "",
    startTime: "",
    endTime: "",
    workingDays: "",
    tags: "",
    images: "",
  });

  const handleError = (key, value) => {
    setErrors({...errors, [key]: value});
  };

  const handleData = (key, value) => {
    validatePropery(key, value, handleError);
    setData({...data, [key]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteImages = () => {
    setFiles([]);
    setData({...data, images: ""});
  };

  const introduction = (
    <Introduction
      data={data}
      handleData={handleData}
      setFiles={setFiles}
      // images={images}
      setData={setData}
      errors={errors}
    />
  );
  const timing = (
    <Timings
      data={data}
      handleData={handleData}
      // setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );
  const contactInfo = (
    <ContactInfo
      data={data}
      handleData={handleData}
      // setImages={setImages}
      // images={images}
      setData={setData}
      errors={errors}
    />
  );
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "you can upload upto four images and size limit of each upto 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      setFiles(acceptedFiles);
      const imagesName = acceptedFiles.map((file) => file.name).join(", ");
      setData({...data, images: imagesName});
    }
  };
  const imagesInfo = (
    <Imagesinfo
      data={data}
      handleData={handleData}
      setFiles={setFiles}
      files={files}
      // images={images}
      handleDeleteImages={handleDeleteImages}
      setData={setData}
      onDrop={onDrop}
      errors={errors}
    />
  );

  const showData = (
    <ShowData
      data={data}
      handleData={handleData}
      setFiles={setFiles}
      files={files}
      setData={setData}
      errors={errors}
    />
  );

  const steps = [
    {label: "Introduction", content: introduction},
    {label: "Images", content: imagesInfo},
    {label: "Timings", content: timing},
    {label: "Contact Information", content: contactInfo},
    {label: "Confirmation", content: showData},
  ];

  return (
    <div className={styles.page}>
      <Heading m={8} className={styles.heading}>
        Want to add your publish your medical assistance service
      </Heading>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <Stepper className={styles.stepper} steps={steps} />
      </form>
    </div>
  );
};

export default AuthenticationWrapper(MedicalAssistanceRequest);
