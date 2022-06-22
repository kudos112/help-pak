import Image from "next/image";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createMedicalAssistance} from "~/redux/medical-service/medical-service.actions";
import {days, getDayNames} from "~/utils/days/days";
import {uploadTwoOrMoreImages} from "~/utils/image-uploader/upload-images.util";
import {verifyPayload} from "~/validations/medical-assistance.validation";
import CustomButton from "../fundamentals/custom-button/custom-button.component";
import {successNotification} from "../fundamentals/notification/notification";
import styles from "./forms/forms.module.scss";

const ShowData = ({data, files}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const handleLoading = () => {
    setLoading(false);
    setDisabled(true);
  };

  const payload = {
    name: data.name,
    email: data.email,
    phoneNo: data.phoneNo,
    description: data.description,
    serviceType: data.serviceType,
    fullAddress: data.fullAddress,
    city: data.city,
    startTime: data.startTime,
    endTime: data.endTime,
    fullDay: data.fullDay,
    workingDays: data.workingDays,
    images: data.images,
  };

  useEffect(() => {
    setDisabled(verifyPayload(payload));
  }, []);

  useEffect(() => {
    if (files.length === images.length && disabled) {
      setLoading(true);
      setDisabled(false);
      let newPayload = {...payload, images: images};
      dispatch(createMedicalAssistance(newPayload, () => setLoading(false)));
    }
  }, [images]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setDisabled(false);
  //   dispatch(createMedicalAssistance(payload, handleLoading));
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    // let errors = verifyPayload(payload);
    // alert(JSON.stringify(errors));
    // if (errors) return;
    if (files.length <= 0) {
      errorNotification("Error", "Please upload at least one image");
      return;
    }
    setLoading(true);

    if (files.length === images.length) {
      let newPayload = {...payload, images: images};
      dispatch(createMedicalAssistance(newPayload, () => setLoading(false)));
    }
    uploadTwoOrMoreImages(files, (success, urls) => {
      if (success) {
        setImages(urls);
        // setLoading(false);
        successNotification(
          "Success",
          "Images Uploaded Successfully",
          "top-right"
        );
      } else setLoading(false);
    });
  };

  return (
    <div>
      {JSON.stringify(payload)}
      <div className={styles.showData}>
        <div className={styles.leftDiv}>
          <p>Service Type: {data.serviceType}</p>
          <p>Name: {data.name}</p>
          <p>description: {data.description}</p>
          {/* <p>Tags: {data.tags}</p> */}
          <p>Email: {data.email}</p>
          <p>Phone Number: {data.phoneNo}</p>
          <p>City: {data.city}</p>
          <p>Full Address: {data.fullAddress}</p>
          <p>Start Time: {data.startTime}</p>
          <p>End Time: {data.endTime}</p>
          <p>Full Day Service: {data.fullDay.toString()}</p>
          <p>
            Working Days:{" "}
            {data.workingDays && getDayNames(data.workingDays).join(", ")}
          </p>

          {/* name: "", email: "", serviceType: "", contactNo: "", city: "",
        streetAddress: "", description: "", startTime: "", endTime: "", fullDay:
        false, workingDays: [], tags: [], images: [], */}
        </div>
        <div className={styles.rightDiv}>
          {files.map((image, index) => {
            return (
              <Image
                key={index}
                src={URL.createObjectURL(image)}
                width={150}
                height={150}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.button}>
        <CustomButton
          loading={loading}
          disabled={!disabled}
          title={"Request to add Service"}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ShowData;
