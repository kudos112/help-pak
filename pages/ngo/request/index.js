import {Flex, Heading, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import LeftDiv from "~/components/ngo/left-div";
import RightDiv from "~/components/ngo/right-div";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "~/components/fundamentals/notification/notification";
import AuthenticationWrapper from "~/repositories/AuthHoc";
import {
  uploadSingleImage,
  uploadTwoOrMoreImages,
} from "~/utils/image-uploader/upload-images.util";
import {validatePropery, verifyPayload} from "~/validations/ngo.validation";
import styles from "./request.module.scss";
import {selectUser} from "~/redux/auth/auth.selector";
import ConfirmationAlert from "~/components/partial-components/confirmation-alert/confirmation-alert.component";
import {createNgo} from "~/redux/ngo/ngo.actions";

const NGOPublishRequest = ({currentUser}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: currentUser.name,
    regNo: currentUser.regNo,
    background: "",
    vision: "",
    phoneNo: currentUser.phoneNo,
    email: currentUser.email,
    city: "Lahore",
    fullAddress: "LDA Avenue 1",
    founderName: "",
    founderMessage: "",
    founderImage: "",
    images: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    regNo: "",
    background: "",
    vision: "",
    phoneNo: "",
    email: "",
    city: "",
    fullAddress: "",
    founderName: "",
    founderMessage: "",
    founderImage: "",
    images: "",
  });

  const [files, setFiles] = useState([]);
  const [filesFounderImage, setFilesFounderImage] = useState([]);
  const [images, setImages] = useState([]);
  const [founderImage, setFounderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      bankName: "Jazzcash",
      accountName: "Abdul Qadoos",
      accountNo: "03099091509",
    },
  ]);

  const addPaymentMethod = (e) => {
    e.preventDefault();
    if (paymentMethods.length >= 3) {
      warningNotification("Stop!", "Max four payment methods can be added");
      return;
    }
    setPaymentMethods([
      ...paymentMethods,
      {bankName: "", accountName: "", accountNo: ""},
    ]);
  };

  const removePaymentMethod = (e) => {
    e.preventDefault();
    if (paymentMethods.length == 1) {
      return;
    }
    setPaymentMethods(paymentMethods.slice(0, -1));
  };

  const handlePaymentMethodsData = (index, name, value) => {
    if (index < paymentMethods.length) {
      const newArr = paymentMethods.map((obj, ind) => {
        if (ind === index) {
          return {...obj, [name]: [value]};
        }
        return {...obj};
      });
      setPaymentMethods(newArr);
    }
  };

  const handleError = (name, value) => {
    setErrors({...errors, [name]: value});
  };

  const handleData = (name, value) => {
    validatePropery(name, value, handleError);
    setData({...data, [name]: value});
  };

  const handleDeleteImages = () => {
    setFiles([]);
    setData({...data, images: ""});
  };

  const handleDeleteFounderImage = () => {
    setFilesFounderImage([]);
    setData({...data, founderImage: ""});
  };

  useEffect(() => {
    if (images.length > 0 && founderImage != null) {
      if (loading) {
        let newPayload = {
          ...payload,
          images: images,
          founder: {
            name: data.founderName,
            message: data.founderMessage,
            picture: founderImage,
          },
        };
        dispatch(createNgo(newPayload, () => setLoading(false)));
      }
    }
  }, [images, founderImage]);

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

  const onDropFounderImage = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "you can upload upto four images and size limit of each upto 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      setFilesFounderImage(acceptedFiles);
      const imagesName = acceptedFiles.map((file) => file.name).join(", ");
      setData({...data, founderImage: imagesName});
    }
  };

  const payload = {
    name: data.name,
    email: data.email,
    phoneNo: data.phoneNo,
    regNo: data.regNo,
    vision: data.vision,
    background: data.background,
    city: data.city,
    fullAddress: data.fullAddress,
    paymentMethods,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (filesFounderImage.length <= 0) {
      errorNotification("Error", "Please upload founder Image");
      return;
    }

    // let errors = verifyPayload(payload);
    // if (errors) return;
    if (files.length <= 0) {
      errorNotification("Error", "Please upload at least one image");
      return;
    }
    onOpen();
  };

  const onConfirmation = () => {
    setLoading(true);

    if (files.length === images.length && founderImage != null) {
      let newPayload = {
        ...payload,
        images: images,
        founder: {
          name: data.founderName,
          message: data.founderMessage,
          picture: founderImage,
        },
      };
      dispatch(createNgo(newPayload, () => setLoading(false)));
      return;
    }

    uploadSingleImage(filesFounderImage[0], (url) => {
      setFounderImage(url);
      successNotification("Success", "Founder Image Uploaded Successfully");
    });

    uploadTwoOrMoreImages(files, (success, urls) => {
      if (success) {
        setImages(urls);
        setLoading(false);
        successNotification("Success", "Images Uploaded Successfully");
      } else setLoading(false);
    });
  };

  if (currentUser.userType !== "NGO")
    return (
      <div className={styles.page}>
        <div className={styles.center}>
          <Flex m={3} h="100%" align="center" justify={"center"}>
            <Heading color="gray.400">
              You're not authorized for this. Sign up as NGO
            </Heading>
          </Flex>
        </div>
      </div>
    );

  return (
    <div className={styles.page}>
      <ConfirmationAlert
        title="Confirmation"
        description={`Images and Payment Methods will not updated later, So please add them carefully.\n\nDo you want to upload now?`}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={onConfirmation}
      />
      <Heading m={4} className={styles.heading}>
        {"Publish Your NGO"}
      </Heading>
      <div className={styles.container}>
        <form
          className={styles.inputContainer}
          onSubmit={onSubmit}
          id="ngoPublish"
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
              onDropFounderImage={onDropFounderImage}
              handleDeleteFounderImage={handleDeleteFounderImage}
              handleDeleteImages={handleDeleteImages}
              paymentMethods={paymentMethods}
              addPaymentMethod={addPaymentMethod}
              removePaymentMethod={removePaymentMethod}
              handlePaymentMethodsData={handlePaymentMethodsData}
            />
          </div>
        </form>
        <div>
          <CustomButton
            style={{paddingLeft: 100, paddingRight: 100}}
            title="Publish Request"
            type="submit"
            form="ngoPublish"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: selectUser(state),
  };
};

export default AuthenticationWrapper(
  connect(mapStateToProps)(NGOPublishRequest)
);
