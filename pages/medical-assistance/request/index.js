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

const MedicalAssistanceRequest = () => {
  const [data, setData] = useState({
    name: "Kudos Pharmacy",
    email: "quddoux112@gmail.com",
    serviceType: "pharmaceutical",
    phoneNo: "123456789",
    city: "Lahore",
    fullAddress: "CUI, Lahore Campus",
    description:
      "Any student can get free first aid treatment and medicines from here",
    startTime: "null",
    endTime: "null",
    fullDay: false,
    workingDays: [1, 2],
    tags: [],
    images: [],
  });
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

  const introduction = (
    <Introduction
      data={data}
      handleData={handleData}
      setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );
  const timing = (
    <Timings
      data={data}
      handleData={handleData}
      setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );
  const contactInfo = (
    <ContactInfo
      data={data}
      handleData={handleData}
      setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );
  const imagesInfo = (
    <Imagesinfo
      data={data}
      handleData={handleData}
      setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );

  const showData = (
    <ShowData
      data={data}
      handleData={handleData}
      setImages={setImages}
      images={images}
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

export default MedicalAssistanceRequest;
