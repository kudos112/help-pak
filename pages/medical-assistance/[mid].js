import {
  DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {
  Box,
  Button,
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
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import styles from "./medical-assistance.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {connect, useDispatch} from "react-redux";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import {
  deleteSelectedMedicalAssistance,
  getSelectedMedicalAssistance,
} from "~/redux/medical-service/medical-service.actions";
import {selectSelectedMedicalAssistance} from "~/redux/medical-service/medical-service.selector";
import {getDayNames} from "~/utils/days/days";
import SmallFooter from "~/components/partial-components/small-footer";
import GoBackButton from "~/components/fundamentals/goBack-button";
import {selectUser} from "~/redux/auth/auth.selector";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";

const MedicalAssistanceDetailedPage = ({medicalAssistance, currentUser}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const {query = {}} = useRouter();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.mid) getMedicalAssistanceDetails(query.mid);
  }, [query.mid]);

  const getImages = (images) => {
    if (images)
      return images.map((img, index) => {
        return {id: index, src: img, alt: "image"};
      });
    else return [];
  };

  const handleLoading = () => setLoading(false);
  const handleActionLoading = () => setActionLoading(false);

  const getMedicalAssistanceDetails = (mid) => {
    dispatch(getSelectedMedicalAssistance(mid, handleLoading));
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
                <Wrap justify="space-between" align="center">
                  <WrapItem>
                    <Flex direction={"column"}>
                      <Tooltip label={medicalAssistance?.name}>
                        <Heading p={5} size={"lg"} color={"gray.600"}>
                          {medicalAssistance?.name}
                        </Heading>
                      </Tooltip>
                      <Tooltip
                        label={`${medicalAssistance.city}, Pakistan` || ""}
                      >
                        <Text
                          pl={5}
                          mt={-4}
                          fontSize={"sm"}
                          letterSpacing={1.1}
                          width={"auto"}
                        >
                          {`${medicalAssistance.city}, Pakistan` || ""}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </WrapItem>
                  {medicalAssistance?.provider === currentUser?.id && (
                    <Wrap>
                      <WrapItem>
                        <Box>
                          <Button
                            leftIcon={<EditIcon />}
                            colorScheme="green"
                            variant="solid"
                            isLoading={actionLoading}
                          >
                            Update
                          </Button>
                        </Box>
                      </WrapItem>
                      <WrapItem>
                        <Box>
                          <Button
                            leftIcon={<DeleteIcon />}
                            colorScheme="red"
                            variant="solid"
                            isLoading={actionLoading}
                            onClick={() => {
                              setActionLoading(true);
                              dispatch(
                                deleteSelectedMedicalAssistance(
                                  medicalAssistance.id,
                                  handleActionLoading
                                )
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  )}
                </Wrap>

                {medicalAssistance?.images && (
                  <ImageCarousel images={getImages(medicalAssistance.images)} />
                )}
              </Box>

              <VStack
                align="start"
                border="1px"
                borderColor={"white"}
                bg={"white"}
                borderRadius={15}
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
                      {medicalAssistance.serviceType || ""}
                    </Text>
                  </Tag>
                </Tooltip>

                <Tooltip label="Name">
                  <Heading size={"lg"} mb={3} color={"gray.600"}>
                    {medicalAssistance?.name}
                  </Heading>
                </Tooltip>

                <Box>
                  <Tooltip label="Description">
                    <Text fontSize={"md"} color={"gray.500"}>
                      {medicalAssistance?.description}
                    </Text>
                  </Tooltip>
                </Box>
                <div className={styles.midDesc}>
                  <Tooltip label="Email">
                    <HStack mt={2} w={"300px"}>
                      <Circle size="40px" bg="green" color="white">
                        <EmailIcon />
                      </Circle>
                      <Text fontSize={"md"} color={"gray.500"}>
                        <a href={`mailto:${medicalAssistance.email}`}>
                          {medicalAssistance?.email}
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
                        <a href={`tel:${medicalAssistance?.phoneNo}o}`}>
                          {medicalAssistance?.phoneNo}
                        </a>
                      </Text>
                    </HStack>
                  </Tooltip>
                </div>

                <div className={styles.midDesc}>
                  <Flex direction="column" gap={2}>
                    <Tooltip label="Timings">
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
                    </Tooltip>

                    {medicalAssistance?.fullDay ? (
                      <Text ml={2} fontSize={"md"} color={"gray.500"}>
                        24 hours Service:{" "}
                        {medicalAssistance?.fullDay ? "Yes" : "No"}
                      </Text>
                    ) : (
                      <>
                        <Text ml={2} fontSize={"md"} color={"gray.500"}>
                          {" "}
                          Start Time: {medicalAssistance?.startTime}
                        </Text>
                        <Text ml={2} fontSize={"md"} color={"gray.500"}>
                          {" "}
                          End Time: {medicalAssistance?.endTime}
                        </Text>
                      </>
                    )}
                    <HStack w={"300px"}>
                      <Text ml={2} fontSize={"md"} color={"gray.500"}>
                        {" "}
                        Working Days:{" "}
                        {getDayNames(medicalAssistance?.workingDays).join(", ")}
                      </Text>
                    </HStack>
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
                      City: {medicalAssistance?.city}
                    </Text>
                    <Text ml={2} fontSize={"md"} color={"gray.500"}>
                      Address : {medicalAssistance?.fullAddress}
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
    medicalAssistance: selectSelectedMedicalAssistance(state),
    currentUser: selectUser(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(MedicalAssistanceDetailedPage);
