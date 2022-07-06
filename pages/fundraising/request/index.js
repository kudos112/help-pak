import {Heading, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import LeftDiv from "~/components/fundraising/left-div";
import RightDiv from "~/components/fundraising/right-div";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "~/components/fundamentals/notification/notification";
import AuthenticationWrapper from "~/repositories/AuthHoc";
import {uploadTwoOrMoreImages} from "~/utils/image-uploader/upload-images.util";
import {
  validatePropery,
  verifyPayload,
} from "~/validations/fundraising.validation";
import styles from "./request.module.scss";
import {selectUser} from "~/redux/auth/auth.selector";
import {createFundraising} from "~/redux/fundraising/fundraising.actions";
import ConfirmationAlert from "~/components/partial-components/confirmation-alert/confirmation-alert.component";

const FundraisingRequest = ({currentUser}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "For Orphans",
    amount: "0.00",
    reason: "ADOPTION COSTS",
    description: "xyz",
    phoneNo: currentUser.phoneNo,
    email: currentUser.email,
    city: "Lahore",
    fullAddress: "LDA Avenue 1",
    images: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    reason: "",
    description: "",
    phoneNo: "",
    email: "",
    city: "",
    fullAddress: "",
    images: "",
  });

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
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
          return {...obj, [name]: value};
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
    if (name !== "phoneNo") validatePropery(name, value, handleError);
    setData({...data, [name]: value});
  };

  const handleDeleteImages = () => {
    setFiles([]);
    setData({...data, images: ""});
  };

  useEffect(() => {
    if (images.length > 0) {
      if (loading) {
        let newPayload = {...payload, images: images};
        dispatch(createFundraising(newPayload, () => setLoading(false)));
      }
    }
  }, [images]);

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

  const payload = {
    reason: data.reason,
    name: data.name,
    description: data.description,
    amount: data.amount,
    city: data.city,
    phoneNo: data.phoneNo,
    email: data.email,
    fullAddress: data.fullAddress,
    paymentMethods,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.amount == 0) {
      errorNotification("Error", "Please add amount for fundraising.");
      return;
    }
    let errors = verifyPayload(payload);
    if (errors) return;
    if (files.length <= 0) {
      errorNotification("Error", "Please upload at least one image");
      return;
    }
    onOpen();
  };

  const onConfirmation = () => {
    setLoading(true);

    if (files.length === images.length) {
      let newPayload = {...payload, images: images};
      dispatch(createFundraising(newPayload, () => setLoading(false)));
      return;
    }
    uploadTwoOrMoreImages(files, (success, urls) => {
      if (success) {
        setImages(urls);
        setLoading(false);
        successNotification("Success", "Images Uploaded Successfully");
      } else setLoading(false);
    });
  };

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
        {"Raise Funds for deservings"}
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
            title="Request for fundraising"
            type="submit"
            form="donationForm"
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
  connect(mapStateToProps)(FundraisingRequest)
);
