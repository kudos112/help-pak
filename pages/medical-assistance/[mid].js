import {EmailIcon, PhoneIcon, TimeIcon} from "@chakra-ui/icons";
import {HiOutlineLocationMarker} from "react-icons/hi";
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
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import styles from "./medical-assistance.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {connect, useDispatch} from "react-redux";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import {getSelectedMedicalAssistance} from "~/redux/medical-service/medical-service.actions";
import {selectSelectedMedicalAssistance} from "~/redux/medical-service/medical-service.selector";
import {getDayNames} from "~/utils/days/days";

const MedicalAssistanceDetailedPage = ({medicalAssistance}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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

  const getMedicalAssistanceDetails = (mid) => {
    dispatch(getSelectedMedicalAssistance(mid, handleLoading));
  };

  return (
    <Container maxW={"5xl"} py={12}>
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
            <Flex
              color={"customGray"}
              _hover={{color: "customGreen", cursor: "Pointer"}}
              fontWeight={600}
              width={94}
              fontSize={"sm"}
              bg={useColorModeValue("White")}
              p={2}
              align="center"
              justify="center"
              gap={2}
              rounded={"md"}
              onClick={() => router.back()}
            >
              <AiOutlineArrowLeft />
              <span>Go Back</span>
            </Flex>
            <Box>
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
                      {medicalAssistance?.phoneNo}
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
                  <Text ml={2} fontSize={"md"} color={"gray.500"}>
                    {" "}
                    Working Days: {getDayNames(medicalAssistance?.workingDays)}
                  </Text>
                </Flex>
                <Flex direction="column" gap={2}>
                  <Tooltip label="Timings">
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
  );
};

const mapStateToProps = (state) => {
  return {
    medicalAssistance: selectSelectedMedicalAssistance(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(MedicalAssistanceDetailedPage);
