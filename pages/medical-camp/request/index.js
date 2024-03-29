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
import AuthenticationWrapper from "~/repositories/AuthHoc";

const MedicalCampRequest = () => {
  const [data, setData] = useState({
    name: "Medical Camp",
    email: "",
    campType: "",
    phoneNo: "",
    city: "",
    fullAddress: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    images: [""],
  });
  const [images, setImages] = useState([]);
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
    {label: "Additional Info", content: timing},
    {label: "Contact", content: contactInfo},
    // {label: "Doctors", content: doctorsInfo},
    {label: "Confirmation", content: showData},
  ];

  return (
    <div className={styles.page}>
      <Heading m={8} className={styles.heading}>
        Want to advertise your medical camp
      </Heading>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <Stepper className={styles.stepper} steps={steps} />
      </form>
    </div>
  );
};

export default AuthenticationWrapper(MedicalCampRequest);
