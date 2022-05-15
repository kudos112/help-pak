import {Heading} from "@chakra-ui/react";
import {useState} from "react";
import Stepper from "~/components/common/stepper/stepper";
import ContactInfo from "~/components/medical-camp/forms/contact-info.component";
import Imagesinfo from "~/components/medical-camp/forms/images.component";
import Introduction from "~/components/medical-camp/forms/intoduction.component";
import Timings from "~/components/medical-camp/forms/timings.component";
import DoctorsInfo from "~/components/medical-camp/forms/doctorsInfo.component";
import ShowData from "~/components/medical-camp/forms/show-data.component";
// import {validatePropery} from "~/validations/medical-assistance.validation";
import styles from "./request.module.scss";
import {warningNotification} from "~/components/fundamentals/notification/notification";
import {validatePropery} from "~/validations/medical-camp.validation";

const MedicalCampRequest = () => {
  const [data, setData] = useState({
    name: "Medical Camp",
    email: "quddoux112@gmail.com",
    campType: "Awarness camp",
    phoneNo: "123456789",
    city: "Lahore",
    fullAddress: "CUI, Lahore Campus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
      " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    startDate: "07/10/2022",
    endDate: "",
    startTime: "08:00",
    endTime: "17:00",
    images: ["first image"],
  });
  const [images, setImages] = useState([
    "https://www.yesprograms.org/assets/archive/2%20-%20YES%20Pakistan%20Alumni%20News%20%26%20Events%2010.17.13.jpg",
  ]);
  const [doctors, setDoctors] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    campType: "",
    phoneNo: "",
    city: "",
    fullAddress: "",
    description: "",
    startTime: "",
    startDate: "",
    endTime: "",
    images: [],
  });

  const handleError = (key, value) => {
    setErrors({...errors, [key]: value});
  };

  const handleData = (key, value) => {
    validatePropery(key, value, handleError);
    setData({...data, [key]: value});
  };

  const handleDoctorsData = (index, name, value) => {
    if (index < doctors.length) {
      const newArr = doctors.map((obj, ind) => {
        if (ind === index) {
          return {...obj, [name]: [value]};
        }
        return {...obj};
      });
      setDoctors(newArr);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addMore = () => {
    if (doctors.length >= 4) {
      warningNotification("Stop!", "Max four doctors can be added");
      return;
    }

    setDoctors([...doctors, {name: "", speciality: ""}]);
  };

  const removeDoc = () => {
    if (doctors.length == 0) {
      return;
    }
    setDoctors(doctors.slice(0, -1));
  };

  const addImage = () => {
    if (images.length >= 4) {
      warningNotification("Stop!", "Maximum four images can be added");
      return;
    }
    setData({
      ...data,
      images: [...data.images, ""],
    });
    setImages([...images, ""]);
  };

  const removeImage = (index) => {
    if (images.length == 1) {
      return;
    }
    let updated = data.images;
    updated.splice(index, 1);
    setData({
      ...data,
      images: updated,
    });
    let updatedImages = images;
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const imagesInfo = (
    <Imagesinfo
      data={data}
      handleData={handleData}
      addImage={addImage}
      removeImage={removeImage}
      setImages={setImages}
      images={images}
      setData={setData}
      doctors={doctors}
      setDoctors={setDoctors}
      addMore={addMore}
      removeDoc={removeDoc}
      errors={errors}
      handleDoctorsData={handleDoctorsData}
    />
  );

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
  const doctorsInfo = (
    <DoctorsInfo
      doctors={doctors}
      setDoctors={setDoctors}
      addMore={addMore}
      removeDoc={removeDoc}
      errors={errors}
      handleDoctorsData={handleDoctorsData}
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

  const showData = (
    <ShowData
      data={data}
      doctors={doctors}
      handleData={handleData}
      setImages={setImages}
      images={images}
      setData={setData}
      errors={errors}
    />
  );

  const steps = [
    {label: "Camp Info", content: introduction},
    {label: "Images", content: imagesInfo},
    {label: "Extra Info", content: timing},
    {label: "Contact", content: contactInfo},
    // {label: "Doctors", content: doctorsInfo},
    {label: "Confirmation", content: showData},
  ];

  return (
    <div className={styles.page}>
      <Heading className={styles.heading}>
        Want to advertise your medical camp
      </Heading>
      <div className={styles.container}>
        <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
          <Stepper className={styles.stepper} steps={steps} />
        </form>
      </div>
    </div>
  );
};

export default MedicalCampRequest;
