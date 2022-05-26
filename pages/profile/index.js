import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Kbd,
  Stack,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import {selectUser} from "~/redux/auth/auth.selector";
// import Cards from "~/components/donation-item/donation-item-cards";
import FilterDonationItem from "~/components/donation-item/search-bar/filter.camp.component";
// // import {getDonationItems} from "~/redux/donation-item/donation-item.actions";
import styles from "./profile.module.scss";
import RadioCards from "~/components/partial-components/profile/radio-filter.component";
import {useRouter} from "next/router";
import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
// import {selectDonationItems} from "~/redux/donation-item/donation-item.selector";
// import SmallFooter from "~/components/partial-components/small-footer";

const DonationItem = ({user}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");
  const [currentView, setCurrentView] = useState(1);
  const router = useRouter();

  const handleLoading = () => {
    setLoading(false);
  };

  const onRadioChange = (value) => {
    if (value.toLowerCase() === "profile") {
      setCurrentView(1);
    } else if (value.toLowerCase() === "old item donation") {
      setCurrentView(2);
    } else if (value.toLowerCase() === "medical camps") {
      setCurrentView(3);
    } else if (value.toLowerCase() === "medical services") {
      setCurrentView(4);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 2:
        return <div>Old Item Donation</div>;
      case 3:
        return <div>Medical Camp</div>;
      case 4:
        return <div>Medical Services</div>;
      default:
        return <div>Wrong Option</div>;
    }
  };

  return (
    <>
      <Flex m={8} direction="column">
        {/* Profile */}
        <Flex direction="column">
          <Wrap spacing={5}>
            <Avatar />
            <Flex direction={"column"} gap={2}>
              <Heading color={"customGray"}>{user?.name}</Heading>
              <Box>
                <Kbd>{user?.userType}</Kbd>
              </Box>
              <HStack fontSize={15} color="customGray">
                <EmailIcon />
                <a href={`mailto:${user?.email}`}>{user?.email}</a>
              </HStack>
              <HStack fontSize={15} color="customGray">
                <PhoneIcon />
                <a href={`tel:${user?.phoneNo}`}>{user?.phoneNo}</a>
              </HStack>
            </Flex>
          </Wrap>
        </Flex>
        <Box m={8}>
          <RadioCards onRadioChange={onRadioChange} />
        </Box>
        {renderView()}
      </Flex>
      {/* <SmallFooter /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
  };
};

export default connect(mapStateToProps)(DonationItem);
