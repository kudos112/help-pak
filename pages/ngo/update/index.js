import {Flex, Heading, useDisclosure} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {connect, useDispatch} from "react-redux";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "~/components/fundamentals/notification/notification";
import LeftDiv from "~/components/ngo/left-div";
import RightDiv from "~/components/ngo/right-div";
import ConfirmationAlert from "~/components/partial-components/confirmation-alert/confirmation-alert.component";
import {selectUser} from "~/redux/auth/auth.selector";
import {selectSelectedNgo} from "~/redux/ngo/ngo.selector";
import AuthenticationWrapper from "~/repositories/AuthHoc";
import NgoRepository from "~/repositories/NgoRepository";
import {
  validatePropery,
  verifyUpdatePayload,
} from "~/validations/ngo.validation";
import styles from "./request.module.scss";

const NGOPublishRequest = ({currentUser, ngo}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const dispatch = useDispatch();
  const {query = {}, payments = {}} = useRouter();
  const router = useRouter();

  const [data, setData] = useState({
    name: ngo.name || "",
    regNo: ngo.regNo || "",
    background: ngo.background || "",
    vision: ngo.vision || "",
    phoneNo: ngo.phoneNo || "",
    email: ngo.email || "",
    city: ngo.city || "",
    fullAddress: ngo.fullAddress || "",
    founderName: ngo?.founder?.name || "",
    founderMessage: ngo?.founder?.message || "",
    founderImage: "Disabled",
    images: "Disabled",
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
  const [paymentMethods, setPaymentMethods] = useState(
    ngo.paymentMethods || []
  );

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

  const onSubmit = (e) => {
    e.preventDefault();
    onOpen();
  };

  const onConfirmation = async () => {
    setLoading(true);

    let newPayload = {
      email: data.email,
      phoneNo: data.phoneNo,
      vision: data.vision,
      background: data.background,
      city: data.city,
      fullAddress: data.fullAddress,
      founder: {
        name: data.founderName,
        message: data.founderMessage,
        picture: ngo.founder.picture,
      },
    };

    let errors = verifyUpdatePayload(newPayload);
    if (errors) {
      return;
    }

    try {
      const request = await NgoRepository.updateNgo(ngo.id, newPayload);
      if (request.status == 200) {
        successNotification("Success", "Ngo Updated Successfully");
        setLoading(false);
        router.back();
      }
    } catch (err) {
      setLoading(false);
      errorNotification("Failed", err);
    }
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
        description={`Are you sure, you want to update NGO details?`}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={onConfirmation}
      />
      <Heading m={4} className={styles.heading}>
        {"Update Your NGO"}
      </Heading>
      <div className={styles.container}>
        <form
          className={styles.inputContainer}
          onSubmit={onSubmit}
          id="ngoPublish"
        >
          <div className={styles.leftDiv}>
            <LeftDiv
              data={data}
              handleData={handleData}
              errors={errors}
              update={true}
            />
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
              update={true}
              handlePaymentMethodsData={handlePaymentMethodsData}
            />
          </div>
        </form>
        <div>
          <CustomButton
            style={{paddingLeft: 100, paddingRight: 100}}
            title="Update NGO"
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
    ngo: selectSelectedNgo(state),
  };
};

export default AuthenticationWrapper(
  connect(mapStateToProps)(NGOPublishRequest)
);
