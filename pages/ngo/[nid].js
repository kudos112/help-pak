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
import {deleteSelectedNgo, getSelectedNgo} from "~/redux/ngo/ngo.actions";
import {selectSelectedNgo} from "~/redux/ngo/ngo.selector";
import styles from "./ngo.module.scss";

const NgoDetailedPage = ({ngo, currentUser}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const {query = {}} = useRouter();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.nid) getNgoDetails(query.nid);
  }, [query.nid]);

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

  const handleLoading = () => setLoading(false);
  const handleActionLoading = () => setActionLoading(false);

  const getNgoDetails = (nid) => {
    dispatch(getSelectedNgo(nid, handleLoading));
  };

  const onDeleteConfirmation = () => {
    setActionLoading(true);
    dispatch(deleteSelectedNgo(ngo.id, handleActionLoading));
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
                      <Tooltip label={ngo?.name}>
                        <Heading p={5} size={"lg"} color={"gray.600"}>
                          {ngo?.name}
                        </Heading>
                      </Tooltip>
                      <Tooltip label={`${ngo.city}, Pakistan` || ""}>
                        <Text
                          pl={5}
                          mt={-4}
                          fontSize={"sm"}
                          letterSpacing={1.1}
                          width={"auto"}
                        >
                          {`${ngo.city}, Pakistan` || ""}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </WrapItem>
                  {ngo?.creater?.id === currentUser?.id && (
                    <Wrap>
                      <WrapItem>
                        <Box>
                          <NextLink
                            href={{
                              pathname: "/ngo/update",
                              query: {},
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

                {ngo?.images && (
                  <ImageCarousel images={getImages(ngo.images)} />
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
                      {"NGO"}
                    </Text>
                  </Tag>
                </Tooltip>

                <Tooltip label="Name">
                  <Heading size={"lg"} mb={3} color={"gray.600"}>
                    {ngo?.name}
                  </Heading>
                </Tooltip>

                <Divider h={"0.2px"} borderColor={"gray.400"} />
                <Box>
                  <Tooltip label="Background">
                    <>
                      <Heading size={"md"} mb={3} color={"gray.600"}>
                        Background
                      </Heading>
                      <Text fontSize={"md"} color={"gray.500"}>
                        {ngo?.background}
                      </Text>
                    </>
                  </Tooltip>
                </Box>

                <Divider h={"0.2px"} borderColor={"gray.400"} />

                <Box>
                  <Tooltip label="Vision">
                    <>
                      <Heading size={"md"} mb={3} color={"gray.600"}>
                        Vision
                      </Heading>
                      <Text fontSize={"md"} color={"gray.500"}>
                        {ngo?.vision}
                      </Text>
                    </>
                  </Tooltip>
                </Box>

                <Divider h={"0.2px"} borderColor={"gray.400"} />

                {Array.isArray(ngo?.paymentMethods) &&
                  ngo?.paymentMethods.length > 0 && (
                    <Flex direction="column">
                      <Heading size="md" color="yellow.500">
                        Donation Methods
                      </Heading>
                      {ngo?.paymentMethods.map((paymentMethod, index) => {
                        return (
                          <div key={index}>
                            {paymentMethod.bankName !== "" && (
                              <>
                                <Text mt={3} fontSize={"md"} color={"gray.500"}>
                                  <strong>Bank Name:</strong>{" "}
                                  {paymentMethod.bankName}
                                </Text>
                                <Text mt={1} fontSize={"md"} color={"gray.500"}>
                                  <strong>Account Name:</strong>{" "}
                                  {paymentMethod.accountName}
                                </Text>
                                <Text mt={1} fontSize={"md"} color={"gray.500"}>
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
                      })}
                    </Flex>
                  )}

                <Divider h={"0.2px"} borderColor={"gray.400"} />
                <Box>
                  <Heading size="md" color="blue.500">
                    Founder Message
                  </Heading>
                  <Stack mt={2} direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                      alt={ngo?.founder?.name}
                      size={"lg"}
                      src={ngo?.founder?.picture}
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                      <Text fontSize={"20px"} fontWeight={600}>
                        {ngo?.founder?.name}
                      </Text>
                    </Stack>
                  </Stack>
                  <Text mt={5} fontSize={"md"} color={"gray.700"}>
                    {ngo?.founder?.message || ""}
                  </Text>
                </Box>
                <Divider h={"0.2px"} borderColor={"gray.400"} />

                <Heading size={"md"} mb={3} color={"gray.600"}>
                  Contact Information
                </Heading>

                <div id="contactSection" className={styles.midDesc}>
                  <Tooltip label="Email">
                    <HStack mt={2} w={"300px"}>
                      <a href={`mailto:${ngo?.email}`}>
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
                            {ngo?.email}
                          </Text>
                        </HStack>
                      </a>
                    </HStack>
                  </Tooltip>
                  <Tooltip label="Phone Number">
                    <HStack mt={2}>
                      <a href={`tel:${ngo?.phoneNo}`}>
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
                            {ngo?.phoneNo}
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
                          <strong>City: </strong> {ngo?.city}
                          <br />
                          <strong>Address : </strong> {ngo?.fullAddress}
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
    ngo: selectSelectedNgo(state),
    currentUser: selectUser(state),
  };
};

// export default Authenticated(NgoDetailedPage);
export default connect(mapStateToProps)(NgoDetailedPage);
