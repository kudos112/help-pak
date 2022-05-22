import Image from "next/image";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createMedicalAssistance} from "~/redux/medical-service/medical-service.actions";
import {days, getDayNames} from "~/utils/days/days";
import {verifyPayload} from "~/validations/medical-assistance.validation";
import CustomButton from "../fundamentals/custom-button/custom-button.component";
import styles from "./forms/forms.module.scss";

const ShowData = ({data, images}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    images: images,
  };

  useEffect(() => {
    setDisabled(verifyPayload(payload));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(false);
    dispatch(createMedicalAssistance(payload, handleLoading));
  };

  return (
    <div>
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
          {images.map((image, index) => {
            return <Image key={index} src={image} width={150} height={150} />;
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
