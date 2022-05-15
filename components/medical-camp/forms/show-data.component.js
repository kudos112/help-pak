import {Flex, Heading, HStack, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ZoomImage from "~/components/common/zoom-image/zoom-image.component";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import {createMedicalCamp} from "~/redux/medical-camp/medical-camp.actions";
import {verifyPayload} from "~/validations/medical-camp.validation";
import styles from "./forms.module.scss";
import {InfoIcon} from "@chakra-ui/icons";
import {FaUserMd} from "react-icons/fa";
import {MdContactPhone, MdAccessTimeFilled} from "react-icons/md";

const ShowData = ({data, images, doctors, errors}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let imgs = images;
  imgs = imgs.filter(String);
  let _docs = doctors;
  _docs = _docs.filter(String);

  const handleLoading = () => {
    setLoading(false);
    setDisabled(true);
  };

  const payload = {
    name: data.name,
    email: data.email,
    phoneNo: data.phoneNo,
    description: data.description,
    campType: data.campType,
    fullAddress: data.fullAddress,
    city: data.city,
    startTime: data.startTime,
    endTime: data.endTime,
    startDate: data.startDate,
    endDate: data.endDate,
    images,
    doctors,
  };
  useEffect(() => {
    setDisabled(verifyPayload(payload));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(false);
    dispatch(createMedicalCamp(payload, handleLoading));
  };

  return (
    <div>
      <div className={styles.showData}>
        <div className={styles.leftDiv}>
          <Flex
            p={4}
            w={{sm: "300px", md: "400px", lg: "500px"}}
            minW={"100px"}
            m={1}
            bg={"green.100"}
            direction="column"
          >
            <HStack justify="space-between">
              <Heading size="md" color="green.500">
                Camp Information
              </Heading>{" "}
              <InfoIcon color="green.500" fontSize="xl" />
            </HStack>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Name:</strong> {data.name}{" "}
              <span style={{color: "red"}}>{errors.name}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Camp Type:</strong> {data.campType}{" "}
              <span style={{color: "red"}}>{errors.campType}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Email:</strong> {data.email}{" "}
              <span style={{color: "red"}}>{errors.email}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Description:</strong> {data.description}
              <span style={{color: "red"}}>{errors.description}</span>
            </Text>
          </Flex>
          <Flex
            p={4}
            w={{sm: "300px", md: "400px", lg: "500px"}}
            minW={"100px"}
            m={1}
            bg={"red.100"}
            direction="column"
          >
            <HStack justify="space-between">
              <Heading size="md" color="red.500">
                Doctors
              </Heading>{" "}
              <FaUserMd color="#E53E3E" size="1.3em" />
            </HStack>
            {_docs.map((doctor, index) => {
              return (
                <div key={index}>
                  {doctor.name !== "" && (
                    <>
                      <Text fontsize={"md"} color={"customGray"}>
                        <strong>Name:</strong> {doctor.name}
                      </Text>
                      <Text fontsize={"md"} color={"customGray"}>
                        <strong>Speciality:</strong> {doctor.speciality}
                      </Text>
                    </>
                  )}
                </div>
              );
            })}
          </Flex>
          <Flex
            p={4}
            maxW="500px"
            w={{sm: "300px", md: "400px", lg: "500px"}}
            minW={"100px"}
            m={1}
            bg={"blue.100"}
            direction="column"
          >
            <HStack justify="space-between">
              <Heading size="md" color="blue.500">
                Contact Info
              </Heading>{" "}
              <MdContactPhone color="#3182CE" size="1.3em" />
            </HStack>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Phone Number:</strong> {data.phoneNo}
              <span style={{color: "red"}}>{errors.phoneNo}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>City:</strong> {data.city}
              <span style={{color: "red"}}>{errors.city}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Full Address:</strong> {data.fullAddress}
              <span style={{color: "red"}}>{errors.fullAddress}</span>
            </Text>
          </Flex>
          <Flex
            p={4}
            maxW="500px"
            w={{sm: "300px", md: "400px", lg: "500px"}}
            minW={"100px"}
            m={1}
            bg={"yellow.100"}
            direction="column"
          >
            <HStack justify="space-between">
              <Heading size="md" color="#D69E2E">
                Contact Info
              </Heading>{" "}
              <MdAccessTimeFilled color="#D69E2E" size="1.3em" />
            </HStack>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Start Date:</strong> {data.startDate}
              <span style={{color: "red"}}>{errors.startDate}</span>
            </Text>
            {data.endDate !== "" && (
              <Text fontsize={"md"} color={"customGray"}>
                <strong>End Date:</strong> {data.endDate}
              </Text>
            )}
            <Text fontsize={"md"} color={"customGray"}>
              <strong>Start Time:</strong> {data.startTime}
              <span style={{color: "red"}}>{errors.startTime}</span>
            </Text>
            <Text fontsize={"md"} color={"customGray"}>
              <strong>End Time:</strong> {data.endTime}{" "}
              <span style={{color: "red"}}>{errors.endTime}</span>
            </Text>
          </Flex>
        </div>
        <div className={styles.rightDiv}>
          {imgs.map((image, index) => {
            return (
              <ZoomImage
                key={index}
                imageWidth={150}
                imageHeight={150}
                src={image}
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
