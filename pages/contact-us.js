import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {useState} from "react";
import {AiFillInstagram, AiFillTwitterCircle} from "react-icons/ai";
import {BsPerson} from "react-icons/bs";
import {
  MdEmail,
  MdFacebook,
  MdLocationOn,
  MdOutlineEmail,
  MdPhone,
} from "react-icons/md";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import SmallFooter from "~/components/partial-components/small-footer";
import emailRepository from "~/repositories/emailRepository";

export default function contact() {
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleData = (name, value) => {
    setData({...data, [name]: value});
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      message: data.message,
      email: data.email,
    };
    setLoading(true);
    const response = await emailRepository.sendMessage(payload);
    if (response.status === 204) {
      setLoading(false);
      successNotification(
        "Email Sent successfully",
        "You'll be contacted asap"
      );
    } else {
      setLoading(false);
      errorNotification("Failed", "Unable to send you email, try again");
    }
  };

  return (
    <>
      <Container bg="white" maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="gray.50"
            color="customGreen"
            borderRadius="lg"
            m={{sm: 4, md: 16, lg: 10}}
            p={{sm: 5, md: 5, lg: 16}}
          >
            <Box p={4}>
              <Wrap spacing={{base: 20, sm: 3, md: 5, lg: 20}}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{sm: 3, md: 3, lg: 5}} color="gray.500">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{base: 5, sm: 5, md: 8, lg: 10}}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="customGray"
                          _hover={{border: "2px solid #15803D"}}
                          leftIcon={<MdPhone color="#15803D" size="20px" />}
                        >
                          <a href={`tel:+92-3099091509}`}>+92-3099091509</a>
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="250px"
                          variant="ghost"
                          color="customGray"
                          _hover={{border: "2px solid #15803D"}}
                          leftIcon={<MdEmail color="#15803D" size="20px" />}
                        >
                          <a href={`mailto:quddoux112@gmail.com}`}>
                            quddoux112@gmail.com
                          </a>
                        </Button>

                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="customGray"
                          _hover={{border: "2px solid #15803D"}}
                          leftIcon={
                            <MdLocationOn color="#15803D" size="20px" />
                          }
                        >
                          Lahore, Pakistan
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{lg: 10, md: 10}}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <IconButton
                        aria-label="facebook"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{bg: "#6B7280", color: "white"}}
                        icon={<MdFacebook size="28px" />}
                      />
                      <IconButton
                        aria-label="Twitter"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{bg: "#6B7280", color: "white"}}
                        icon={<AiFillTwitterCircle size="28px" />}
                      />
                      <IconButton
                        aria-label="Instagram"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{bg: "#6B7280", color: "white"}}
                        icon={<AiFillInstagram size="28px" />}
                      />
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="customGray">
                      <form onSubmit={sendEmail}>
                        <VStack spacing={5}>
                          <FormControl id="name" isRequired>
                            <FormLabel>Your Name</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<BsPerson color="gray.800" />}
                              />
                              <Input
                                type="text"
                                size="md"
                                onChange={(e) =>
                                  handleData("name", e.target.value)
                                }
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="name" isRequired>
                            <FormLabel>Mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<MdOutlineEmail color="gray.800" />}
                              />
                              <Input
                                type="email"
                                h={"40px"}
                                borderRadius="5px"
                                size="md "
                                onChange={(e) =>
                                  handleData("email", e.target.value)
                                }
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="name" isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                              borderColor="gray.300"
                              _hover={{
                                borderRadius: "gray.300",
                              }}
                              placeholder="message"
                              onChange={(e) =>
                                handleData("message", e.target.value)
                              }
                            />
                          </FormControl>
                          <FormControl mt={2} id="name" float="right">
                            <Button
                              variant="solid"
                              bg="customGreen"
                              type="submit"
                              color="white"
                              isLoading={loading}
                              loadingText={"loading..."}
                              _hover={{
                                backgroundColor: "#6B7280",
                              }}
                            >
                              Send Message
                            </Button>
                          </FormControl>
                        </VStack>
                      </form>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
      <SmallFooter />
    </>
  );
}
