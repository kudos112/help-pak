import {EmailIcon, PhoneIcon, TimeIcon} from "@chakra-ui/icons";
import {
  Box,
  Circle,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {connect, useDispatch} from "react-redux";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import GoBackButton from "~/components/fundamentals/goBack-button";
import {getSelectedMedicalCamp} from "~/redux/medical-camp/medical-camp.actions";
import {selectSelectedMedicalCamp} from "~/redux/medical-camp/medical-camp.selector";
import styles from "./medical-camp.module.scss";
import SmallFooter from "~/components/partial-components/small-footer";

const MedicalAssistanceDetailedPage = ({medicalCamp}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {query = {}} = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.mid) getMedicalCampDetails(query.mid);
  }, [query.mid]);

  const getImages = (images) => {
    if (images)
      return images.map((img, index) => {
        return {id: index, src: img, alt: "image"};
      });
    else return [];
  };

  const handleLoading = () => setLoading(false);

  const getMedicalCampDetails = (mid) => {
    dispatch(getSelectedMedicalCamp(mid, handleLoading));
  };

  return (
    <>
      <Container maxW={"5xl"} py={12}>
        <GoBackButton />

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="lightGreen"
              color="green"
              size="xl"
            />
          </div>
        )}
        {!loading && (
          <SimpleGrid columns={{base: 1, md: 1}} spacing={10}>
            <Stack spacing={4}>
              <Box>
                <Tooltip label={medicalCamp?.name}>
                  <Heading p={5} size={"lg"} color={"gray.600"}>
                    {medicalCamp?.name}
                  </Heading>
                </Tooltip>
                <Tooltip label={`${medicalCamp.city}, Pakistan` || ""}>
                  <Text
                    pl={5}
                    mt={-4}
                    fontSize={"sm"}
                    letterSpacing={1.1}
                    width={"auto"}
                  >
                    {`${medicalCamp.city}, Pakistan` || ""}
                  </Text>
                </Tooltip>
                {medicalCamp?.images && (
                  <ImageCarousel images={getImages(medicalCamp.images)} />
                )}
              </Box>

              <VStack
                align="start"
                // border="1px"
                // borderColor={"white"}
                // bg={"white"}
                // borderRadius={15}
                width={"100%"}
                p={5}
                direction="column"
                gap={2}
              >
                <Tooltip label="Service Type">
                  <Tag>
                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"sm"}
                      letterSpacing={1.1}
                      width={"auto"}
                    >
                      {medicalCamp.campType || ""}
                    </Text>
                  </Tag>
                </Tooltip>

                <Tooltip label="Name">
                  <Heading size={"lg"} mb={3} color={"gray.600"}>
                    {medicalCamp?.name}
                  </Heading>
                </Tooltip>

                <Box>
                  <Tooltip label="Description">
                    <Text fontSize={"md"} color={"gray.500"}>
                      {medicalCamp?.description}
                    </Text>
                  </Tooltip>
                </Box>
                {Array.isArray(medicalCamp?.doctors?.data) &&
                  medicalCamp?.doctors?.data.length > 1 && (
                    <Flex direction="column">
                      <Heading size="md" color="red.500">
                        Doctors
                      </Heading>
                      {medicalCamp?.doctors.data.map((doctor, index) => {
                        return (
                          <div key={index}>
                            {doctor.name !== "" && (
                              <>
                                <Text mt={3} fontSize={"md"} color={"gray.500"}>
                                  <strong>Name:</strong> {doctor.name}
                                </Text>
                                <Text mt={1} fontSize={"md"} color={"gray.500"}>
                                  <strong>Speciality:</strong>{" "}
                                  {doctor.speciality}
                                </Text>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </Flex>
                  )}
                <div className={styles.midDesc}>
                  <Tooltip label="Email">
                    <HStack mt={2} w={"300px"}>
                      <Circle size="40px" bg="green" color="white">
                        <EmailIcon />
                      </Circle>
                      <Text fontSize={"md"} color={"gray.500"}>
                        <a href={`mailto:${medicalCamp.email}`}>
                          {medicalCamp?.email}
                        </a>
                      </Text>
                    </HStack>
                  </Tooltip>
                  <Tooltip label="Phone Number">
                    <HStack mt={2}>
                      <Circle size="40px" bg="tomato" color="white">
                        <PhoneIcon />
                      </Circle>
                      <Text fontSize={"md"} color={"gray.500"}>
                        <a href={`tel:${medicalCamp?.phoneNo}o}`}>
                          {medicalCamp?.phoneNo}
                        </a>
                      </Text>
                    </HStack>
                  </Tooltip>
                </div>

                <div className={styles.midDesc}>
                  <Flex direction="column" gap={2}>
                    <Tooltip label="Timings">
                      <VStack align="flex-start" justify="flex-start">
                        <HStack mt={2} w={"300px"}>
                          <Circle size="40px" bg="gray" color="white">
                            <TimeIcon />
                          </Circle>
                          <Text
                            fontSize={"md"}
                            fontWeight="bold"
                            color={"gray.500"}
                          >
                            Timings
                          </Text>
                        </HStack>

                        <Text pl={2} fontSize={"md"} color={"gray.500"}>
                          Date:{" "}
                          {` ${moment(medicalCamp.startDate).format("dddd")} 
                  ${moment(medicalCamp.startDate).format("MM-DD-YYYY")}`}
                        </Text>
                        {medicalCamp?.endDate && (
                          <Text pl={2} fontSize={"md"} color={"gray.500"}>
                            End Date:{" "}
                            {` ${moment(medicalCamp.endDate).format("dddd")} 
                  ${moment(medicalCamp.endDate).format("MM-DD-YYYY")}`}
                          </Text>
                        )}

                        <Text pl={2} fontSize={"md"} color={"gray.500"}>
                          Start Time: {medicalCamp.startTime}
                        </Text>
                        <Text pl={2} fontSize={"md"} color={"gray.500"}>
                          End Time: {medicalCamp.endTime}
                        </Text>
                      </VStack>
                    </Tooltip>
                  </Flex>
                  <Flex direction="column" gap={2}>
                    <Tooltip label="Location">
                      <HStack mt={2}>
                        <Circle size="40px" bg="gray" color="white">
                          <HiOutlineLocationMarker />
                        </Circle>
                        <Text
                          fontSize={"md"}
                          fontWeight="bold"
                          color={"gray.500"}
                        >
                          Location
                        </Text>
                      </HStack>
                    </Tooltip>
                    <Text ml={2} fontSize={"md"} color={"gray.500"}>
                      City: {medicalCamp?.city}
                    </Text>
                    <Text ml={2} fontSize={"md"} color={"gray.500"}>
                      Address : {medicalCamp?.fullAddress}
                    </Text>
                  </Flex>
                </div>
              </VStack>
            </Stack>
          </SimpleGrid>
        )}
      </Container>
      <SmallFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    medicalCamp: selectSelectedMedicalCamp(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(MedicalAssistanceDetailedPage);
