import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {connect, useDispatch} from "react-redux";
import ImageCarousel from "~/components/fundamentals/custom-carousel/custom-carousel.component";
import GoBackButton from "~/components/fundamentals/goBack-button";
import {successNotification} from "~/components/fundamentals/notification/notification";
import ConfirmationAlert from "~/components/partial-components/confirmation-alert/confirmation-alert.component";
import SmallFooter from "~/components/partial-components/small-footer";
import {selectUser} from "~/redux/auth/auth.selector";
import {
  deleteSelectedFundraising,
  getSelectedFundraising,
} from "~/redux/fundraising/fundraising.actions";
import {selectSelectedFundraising} from "~/redux/fundraising/fundraising.selector";
import styles from "./fundraising.module.scss";

const FundraisingDetailedPage = ({fundraising, currentUser}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const {query = {}} = useRouter();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.fid) getFundraisingDetails(query.fid);
  }, [query.fid]);

  const copytoClipboard = async (value) => {
    await navigator.clipboard.writeText(value);
    successNotification("", `${value} Copied!`);
  };

  const getImages = (images) => {
    if (images)
      return images.map((img, index) => {
        return {id: index, src: img, alt: "image"};
      });
    else return [];
  };

  console.log(fundraising);

  const handleLoading = () => setLoading(false);
  const handleActionLoading = () => setActionLoading(false);

  const getFundraisingDetails = (fid) => {
    dispatch(getSelectedFundraising(fid, handleLoading));
  };

  const onDeleteConfirmation = () => {
    setActionLoading(true);
    dispatch(deleteSelectedFundraising(fundraising.id, handleActionLoading));
    onClose();
  };

  return (
    <>
      <ConfirmationAlert
        title="Confirmation"
        description={"Please confirm, you want to delete?"}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={onDeleteConfirmation}
      />
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
                      <Tooltip label={fundraising?.name}>
                        <Heading p={5} size={"lg"} color={"gray.600"}>
                          {fundraising?.name}
                        </Heading>
                      </Tooltip>
                      <Tooltip label={`${fundraising.city}, Pakistan` || ""}>
                        <Text
                          pl={5}
                          mt={-4}
                          fontSize={"sm"}
                          letterSpacing={1.1}
                          width={"auto"}
                        >
                          {`${fundraising.city}, Pakistan` || ""}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </WrapItem>
                  {fundraising?.fundraiserId === currentUser?.id && (
                    <Wrap>
                      <WrapItem>
                        <Box>
                          <NextLink
                            href={{
                              pathname: "/fundraising/update",
                              query: fundraising || {},
                              payments: fundraising.paymentMethods,
                            }}
                          >
                            <Button
                              leftIcon={<EditIcon />}
                              colorScheme="green"
                              variant="solid"
                              isLoading={actionLoading}
                            >
                              Update
                            </Button>
                          </NextLink>
                        </Box>
                      </WrapItem>
                      <WrapItem>
                        <Box>
                          <Button
                            leftIcon={<DeleteIcon />}
                            colorScheme="red"
                            variant="solid"
                            isLoading={actionLoading}
                            onClick={onOpen}
                          >
                            Delete
                          </Button>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  )}
                </Wrap>

                {fundraising?.images && (
                  <ImageCarousel images={getImages(fundraising.images)} />
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
                <Tooltip label="Reason">
                  <Tag>
                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"sm"}
                      letterSpacing={1.1}
                      width={"auto"}
                    >
                      {fundraising.reason || ""}
                    </Text>
                  </Tag>
                </Tooltip>

                <Tooltip label="Title">
                  <Heading size={"lg"} mb={3} color={"gray.600"}>
                    {fundraising?.name}
                  </Heading>
                </Tooltip>

                <Box>
                  <Tooltip label="Description">
                    <Text fontSize={"md"} color={"gray.500"}>
                      {fundraising?.description}
                    </Text>
                  </Tooltip>
                </Box>

                <Divider h={"0.2px"} w={"70%"} bg={"gray.400"} />

                {Array.isArray(fundraising?.paymentMethods) &&
                  fundraising?.paymentMethods.length > 0 && (
                    <Flex direction="column">
                      <Tooltip label="Amount">
                        <Heading size={"md"} mb={3} color={"customGreen"}>
                          {`Amount Required : ${fundraising?.amount}`}
                        </Heading>
                      </Tooltip>
                      <Heading size="md" color="yellow.500">
                        Payment Methods
                      </Heading>
                      {fundraising?.paymentMethods.map(
                        (paymentMethod, index) => {
                          return (
                            <div key={index}>
                              {paymentMethod.bankName !== "" && (
                                <>
                                  <Text
                                    mt={3}
                                    fontSize={"md"}
                                    color={"gray.500"}
                                  >
                                    <strong>Bank Name:</strong>{" "}
                                    {paymentMethod.bankName}
                                  </Text>
                                  <Text
                                    mt={1}
                                    fontSize={"md"}
                                    color={"gray.500"}
                                  >
                                    <strong>Account Name:</strong>{" "}
                                    {paymentMethod.accountName}
                                  </Text>
                                  <Text
                                    mt={1}
                                    fontSize={"md"}
                                    color={"gray.500"}
                                  >
                                    <strong>Account Number:</strong>{" "}
                                    {paymentMethod.accountNo}
                                    <Button
                                      leftIcon={<CopyIcon />}
                                      colorScheme="green"
                                      variant="solid"
                                      size={"sm"}
                                      bg={"white"}
                                      color="customGreen"
                                      mt={-1}
                                      ml={2}
                                      _hover={{
                                        bg: "lightGreen",
                                      }}
                                      isLoading={actionLoading}
                                      onClick={() =>
                                        copytoClipboard(paymentMethod.accountNo)
                                      }
                                    >
                                      Copy
                                    </Button>
                                  </Text>
                                </>
                              )}
                            </div>
                          );
                        }
                      )}
                    </Flex>
                  )}

                <Divider h={"0.2px"} w={"70%"} bg={"gray.400"} />

                <Heading size="md" color="blue.500">
                  Fundraiser and Benefitiary
                </Heading>
                <Stack mt={2} direction={"row"} spacing={4} align={"center"}>
                  <Avatar alt={"Fundraiser"} size={"sm"} />
                  <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Text fontSize={"20px"} fontWeight={600}>
                      {fundraising?.fundraiserName}
                    </Text>
                  </Stack>
                </Stack>
                <div id="contactSection" className={styles.midDesc}>
                  <Tooltip label="Email">
                    <HStack mt={2} w={"300px"}>
                      <a href={`mailto:${fundraising?.email}`}>
                        <HStack>
                          <IconButton
                            bg="transparent"
                            _hover={{
                              bg: "transparent",
                              color: "customGray",
                            }}
                            color="customGreen"
                            aria-label="email"
                            icon={<EmailIcon fontSize={20} />}
                          />
                          <Text fontSize={"md"} color={"blue.500"}>
                            {fundraising?.email}
                          </Text>
                        </HStack>
                      </a>
                    </HStack>
                  </Tooltip>
                  <Tooltip label="Phone Number">
                    <HStack mt={2}>
                      <a href={`tel:${fundraising?.phoneNo}`}>
                        <HStack>
                          <IconButton
                            bg="transparent"
                            _hover={{
                              bg: "transparent",
                              color: "customGray",
                            }}
                            color="customGreen"
                            aria-label="email"
                            icon={<PhoneIcon fontSize={20} />}
                          />
                          <Text fontSize={"md"} color={"blue.500"}>
                            {fundraising?.phoneNo}
                          </Text>
                        </HStack>
                      </a>
                    </HStack>
                  </Tooltip>
                </div>

                <div className={styles.midDesc}>
                  <Flex direction="column" gap={2}>
                    <Tooltip label="Location">
                      <HStack mt={2}>
                        <IconButton
                          bg="transparent"
                          _hover={{
                            bg: "transparent",
                            color: "customGray",
                          }}
                          color="customGreen"
                          aria-label="email"
                          icon={<HiOutlineLocationMarker fontSize={"25px"} />}
                        />
                        <Text fontSize={"md"} color={"gray.500"}>
                          <strong>City: </strong> {fundraising?.city}
                          <br />
                          <strong>Address : </strong> {fundraising?.fullAddress}
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
      <SmallFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fundraising: selectSelectedFundraising(state),
    currentUser: selectUser(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(FundraisingDetailedPage);
