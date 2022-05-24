import {Heading} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LeftDiv from "~/components/donation-item/left-div";
import RightDiv from "~/components/donation-item/right-div";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "~/components/fundamentals/notification/notification";
import {createDonationItem} from "~/redux/donation-item/donation-item.actions";
import {uploadTwoOrMoreImages} from "~/utils/image-uploader/upload-images.util";
import {
  validatePropery,
  verifyPayload,
} from "~/validations/donation-item.validation";
// import AuthenticationWrapper from "~/repositories/AuthHoc";
import styles from "./request.module.scss";

const RequestDonationItem = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    category: "",
    condition: "",
    description: "",
    phoneNo: "",
    city: "",
    fullAddress: "",
    images: "",
  });

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    condition: "",
    description: "",
    city: "",
    fullAddress: "",
    images: "",
    phoneNo: "",
  });

  const payload = {
    category: data.category,
    name: data.name,
    description: data.description,
    condition: data.condition,
    city: data.city,
    phoneNo: data.phoneNo,
    fullAddress: data.fullAddress,
  };

  useEffect(() => {
    if (images.length > 0) {
      if (loading) {
        let newPayload = {...payload, images: images};
        dispatch(createDonationItem(newPayload, () => setLoading(false)));
      }
    }
  }, [images]);

  const handleError = (name, value) => {
    setErrors({...errors, [name]: value});
  };

  const handleData = (name, value) => {
    if (name !== "phoneNo") validatePropery(name, value, handleError);
    setData({...data, [name]: value});
  };

  const handleDeleteImages = () => {
    setFiles([]);
    handleData("images", "");
  };

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

  const onSubmit = (e) => {
    e.preventDefault();

    let errors = verifyPayload(payload);
    if (errors) return;
    if (files.length <= 0) {
      errorNotification("Error", "Please upload at least one image");
      return;
    }
    setLoading(true);

    if (files.length === images.length) {
      let newPayload = {...payload, images: images};
      dispatch(createDonationItem(newPayload, () => setLoading(false)));
    }
    uploadTwoOrMoreImages(files, (success, urls) => {
      if (success) {
        setImages(urls);
        // setLoading(false);
        successNotification("Success", "Images Uploaded Successfully");
      } else setLoading(false);
    });
  };

  return (
    <div className={styles.page}>
      <Heading m={4} className={styles.heading}>
        {"Donate If You Don't Use"}
      </Heading>
      <div className={styles.container}>
        <form
          className={styles.inputContainer}
          onSubmit={onSubmit}
          id="donationForm"
        >
          <div className={styles.leftDiv}>
            <LeftDiv data={data} handleData={handleData} errors={errors} />
          </div>
          <div className={styles.rightDiv}>
            <RightDiv
              data={data}
              handleData={handleData}
              errors={errors}
              onDrop={onDrop}
              handleDeleteImages={handleDeleteImages}
            />
          </div>
        </form>
        <div>
          <CustomButton
            style={{paddingLeft: 100, paddingRight: 100}}
            title="Request for listing your item"
            type="submit"
            form="donationForm"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestDonationItem;
