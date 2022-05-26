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
import {Link} from "react-scroll";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {connect, useDispatch} from "react-redux";
import CustomButton from "~/components/fundamentals/custom-button/custom-button.component";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import GoBackButton from "~/components/fundamentals/goBack-button";
import {getSelectedDonationItem} from "~/redux/donation-item/donation-item.actions";
import {selectSelectedDonationItem} from "~/redux/donation-item/donation-item.selector";
import styles from "./donation-item.module.scss";
import ChatService from "@/repositories/ChatRepository";
import {selectUser} from "~/redux/auth/auth.selector";
import {
  errorNotification,
  infoNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import SmallFooter from "~/components/partial-components/small-footer";

const DonationItemDetailedPage = ({donationItem, currentUser}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {query = {}} = useRouter();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.mid) getDonationItemDetails(query.mid);
  }, [query.mid]);

  const createConversation = async () => {
    if (!currentUser) {
      router.push("/account/login");
      errorNotification("Error", "Please Login First");
      return;
    }
    const payload = {
      senderId: currentUser.id,
      recieverId: donationItem.ownerId,
    };
    infoNotification(
      "Processing",
      "Your request has been sent, wait for few seconds"
    );
    const response = await ChatService.createConversation(payload);

    if (response.request.status === 201) {
      successNotification("success", "you're being redirected to chat");
      router.push("/messages");
    } else errorNotification("Failed", "There is an issue, we're on it");
  };

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
                <Flex direction="row" align="center" justify={"space-between"}>
                  <Flex direction="column">
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
                  </Flex>
                  <Box w={{base: "100px", md: "200px"}}>
                    <Link
                      activeClass="active"
                      to="contactSection"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <CustomButton title="Ask for Item" />
                    </Link>
                  </Box>
                </Flex>

                {donationItem?.images && (
                  <ImageCarousel images={getImages(donationItem.images)} />
                )}
              </Box>

              <VStack
                align="start"
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

                <div id="contactSection" className={styles.midDesc}>
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
                          <strong>Address : </strong>{" "}
                          {donationItem?.fullAddress}
                        </Text>
                      </HStack>
                    </Tooltip>
                  </Flex>
                </div>
                <Box w={"100%"}>
                  <CustomButton
                    title="Start messaging..."
                    onClick={createConversation}
                    disable={
                      !currentUser || currentUser?.id === donationItem?.ownerId
                    }
                  />
                </Box>
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
    donationItem: selectSelectedDonationItem(state),
    currentUser: selectUser(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(DonationItemDetailedPage);
