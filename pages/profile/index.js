import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Kbd,
  useMediaQuery,
  Wrap,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/medical-assistance/medical-assistance-cards";
import DonationItemCards from "~/components/donation-item/donation-item-cards";
import MedicalCampCards from "~/components/medical-camp/medical-camp-cards";
import FundraisingCards from "~/components/fundraising/fundraising-cards";
import NGOCards from "~/components/ngo/ngo-cards";
import RadioCards from "~/components/partial-components/profile/radio-filter.component";
import {selectUser} from "~/redux/auth/auth.selector";
import {getUsersMedicalCamp} from "~/redux/medical-camp/medical-camp.actions";
import {selectUsersMedicalCamp} from "~/redux/medical-camp/medical-camp.selector";
import {getMedicalAssistanceByUserId} from "~/redux/medical-service/medical-service.actions";
import {selectUsersMedicalAssistance} from "~/redux/medical-service/medical-service.selector";
// // import {getDonationItems} from "~/redux/donation-item/donation-item.actions";
import styles from "./profile.module.scss";
import {selectUsersDonationItems} from "~/redux/donation-item/donation-item.selector";
import {getUsersDonationItem} from "~/redux/donation-item/donation-item.actions";
import {getUsersFundraising} from "../../redux/fundraising/fundraising.actions";
import {selectUsersFundraisings} from "~/redux/fundraising/fundraising.selector";
import {getUsersNgo} from "~/redux/ngo/ngo.actions";
import {selectUsersNgos} from "~/redux/ngo/ngo.selector";
// import {selectDonationItems} from "~/redux/donation-item/donation-item.selector";
// import SmallFooter from "~/components/partial-components/small-footer";

const DonationItem = ({
  user,
  usersMedicalAssistance,
  usersMedicalCamp,
  usersDonationItems,
  usersFundraisings,
  usersNgos,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");
  const [currentView, setCurrentView] = useState(5);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsersFundraising(user?.id, () => setLoading(false)));
    dispatch(getUsersNgo(user?.id, () => setLoading(false)));
    dispatch(getMedicalAssistanceByUserId(user?.id, () => setLoading(false)));
    dispatch(getUsersMedicalCamp(user?.id, () => setLoading(false)));
    dispatch(getUsersDonationItem(user?.id, () => setLoading(false)));
  }, []);

  const onRadioChange = (value) => {
    if (value.toLowerCase() === "profile") {
      setCurrentView(1);
    } else if (value.toLowerCase() === "old item donation") {
      setCurrentView(2);
    } else if (value.toLowerCase() === "medical camps") {
      setCurrentView(3);
    } else if (value.toLowerCase() === "medical services") {
      setCurrentView(4);
    } else if (value.toLowerCase() === "fundraisings") {
      setCurrentView(5);
    } else if (value.toLowerCase() === "ngos") {
      setCurrentView(6);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 2:
        return (
          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(usersDonationItems == null ||
                  usersDonationItems.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No Items Listed yet</Heading>
                  </Flex>
                )}
                {usersDonationItems?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <DonationItemCards donationItems={usersDonationItems} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(usersMedicalCamp == null ||
                  usersMedicalCamp.data.length === 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">
                      No Medical Camps Listed yet
                    </Heading>
                  </Flex>
                )}
                {usersMedicalCamp?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <MedicalCampCards medicalCamps={usersMedicalCamp} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(usersMedicalAssistance == null ||
                  usersMedicalAssistance.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No services Listed yet</Heading>
                  </Flex>
                )}
                {usersMedicalAssistance?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards medicalAssistances={usersMedicalAssistance} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(usersFundraisings == null ||
                  usersFundraisings?.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">
                      No Fundraisings Listed yet
                    </Heading>
                  </Flex>
                )}
                {usersFundraisings?.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <FundraisingCards
                      fundraisings={{data: usersFundraisings}}
                    />
                  </Flex>
                )}
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(usersNgos == null || usersNgos?.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No Ngos Listed yet</Heading>
                  </Flex>
                )}
                {usersNgos?.length > 0 && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <NGOCards ngos={{data: usersNgos}} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        );
      default:
        return <div>Wrong Option</div>;
    }
  };

  return (
    <>
      <Flex m={8} direction="column">
        <Flex direction="column">
          <Wrap spacing={5}>
            <Avatar />
            <Flex direction={"column"} gap={2}>
              <Heading color={"customGray"}>{user?.name}</Heading>
              <Box>
                <Kbd color="customGray" _hover={{color: "customGreen"}}>
                  {user?.userType}
                </Kbd>
              </Box>
              <HStack fontSize={15} color="customGray">
                <a href={`mailto:${user?.email}`}>
                  <EmailIcon mr="2" />
                  {user?.email}
                </a>
              </HStack>
              <HStack fontSize={15} color="customGray">
                <a href={`tel:${user?.phoneNo}`}>
                  <PhoneIcon mr="2" />
                  {user?.phoneNo}
                </a>
              </HStack>
            </Flex>
          </Wrap>
        </Flex>
        <Box m={8}>
          <RadioCards onRadioChange={onRadioChange} />
        </Box>
        {renderView()}
      </Flex>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    usersMedicalAssistance: selectUsersMedicalAssistance(state),
    usersMedicalCamp: selectUsersMedicalCamp(state),
    usersDonationItems: selectUsersDonationItems(state),
    usersFundraisings: selectUsersFundraisings(state),
    usersNgos: selectUsersNgos(state),
  };
};

export default connect(mapStateToProps)(DonationItem);
