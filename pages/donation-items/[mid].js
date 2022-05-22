import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
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
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {connect, useDispatch} from "react-redux";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import GoBackButton from "~/components/fundamentals/goBack-button";
import {getSelectedDonationItem} from "~/redux/donation-item/donation-item.actions";
import {selectSelectedDonationItem} from "~/redux/donation-item/donation-item.selector";
import styles from "./donation-item.module.scss";

const DonationItemDetailedPage = ({donationItem}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {query = {}} = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.mid) getDonationItemDetails(query.mid);
  }, [query.mid]);

  const getImages = (images) => {
    if (images)
      return images.map((img, index) => {
        return {id: index, src: img, alt: "image"};
      });
    else return [];
  };

  const handleLoading = () => setLoading(false);

  const getDonationItemDetails = (mid) => {
    dispatch(getSelectedDonationItem(mid, handleLoading));
  };

  return (
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
              <Tooltip label={donationItem?.name}>
                <Heading p={5} size={"lg"} color={"gray.600"}>
                  {donationItem?.name}
                </Heading>
              </Tooltip>
              <Tooltip label={`${donationItem.city}, Pakistan` || ""}>
                <Text
                  pl={5}
                  mt={-4}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                  width={"auto"}
                >
                  {`${donationItem.city}, Pakistan` || ""}
                </Text>
              </Tooltip>
              {donationItem?.images && (
                <ImageCarousel images={getImages(donationItem.images)} />
              )}
            </Box>

            <VStack
              align="start"
              // border="1px"
              // borderColor={"white"}
              // bg={"white"}
              // borderRadius={15}
              width={"100%"}
              pl={5}
              mt={-2}
              direction="column"
              gap={2}
            >
              <Tooltip label={"category"}>
                <Tag>
                  <Text
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize={"sm"}
                    letterSpacing={1.1}
                    width={"auto"}
                  >
                    {donationItem.category || ""}
                  </Text>
                </Tag>
              </Tooltip>

              <Tooltip label={donationItem?.name}>
                <Heading size={"lg"} mb={3} color={"gray.600"}>
                  {donationItem?.name}
                </Heading>
              </Tooltip>
              <Box>
                <Tooltip label="Condition">
                  <Text fontSize={"md"} color={"gray.500"}>
                    <strong>Condition: </strong>
                    {`${donationItem?.condition}/10`}
                  </Text>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip label="Description">
                  <Text fontSize={"md"} color={"gray.500"}>
                    {donationItem?.description}
                  </Text>
                </Tooltip>
              </Box>

              <div className={styles.midDesc}>
                <Tooltip label="Email">
                  <HStack mt={2} w={"300px"}>
                    <Circle size="50px" bg="green" color="white">
                      <EmailIcon />
                    </Circle>
                    <Text fontSize={"md"} color={"blue.500"}>
                      <a href={`mailto:${donationItem.email}`}>
                        {donationItem?.email}
                      </a>
                    </Text>
                  </HStack>
                </Tooltip>
                <Tooltip label="Phone Number">
                  <HStack mt={2}>
                    <Circle size="50px" bg="tomato" color="white">
                      <PhoneIcon size={"30px"} />
                    </Circle>
                    <Text fontSize={"md"} color={"blue.500"}>
                      <a href={`tel:${donationItem?.phoneNo}`}>
                        {donationItem?.phoneNo}
                      </a>
                    </Text>
                  </HStack>
                </Tooltip>
              </div>

              <div className={styles.midDesc}>
                <Flex direction="column" gap={2}>
                  <Tooltip label="Location">
                    <HStack mt={2}>
                      <Circle size="50px" bg="gray" color="white">
                        <HiOutlineLocationMarker fontSize={"25px"} />
                      </Circle>
                      <Text fontSize={"md"} color={"gray.500"}>
                        <strong>City: </strong> {donationItem?.city}
                        <br />
                        <strong>Address : </strong> {donationItem?.fullAddress}
                      </Text>
                    </HStack>
                  </Tooltip>
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
    donationItem: selectSelectedDonationItem(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(DonationItemDetailedPage);
