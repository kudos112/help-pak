import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import Cards from "~/components/donation-item/donation-item-cards";
import FilterDonationItem from "~/components/donation-item/search-bar/filter.camp.component";
// import {getDonationItems} from "~/redux/donation-item/donation-item.actions";
import styles from "./donation-item.module.scss";
import {selectDonationItems} from "~/redux/donation-item/donation-item.selector";

const DonationItem = ({donationItems}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   // dispatch(getDonationItems(handleLoading));
  // }, []);
  return (
    <Flex direction="column">
      <Heading m={4} ml={8} color={"customGreen"}>
        Donation Items
      </Heading>
      {/* {JSON.stringify(donationItems)} */}
      <div className={styles.main}>
        <div className={styles.filter}>
          <FilterDonationItem handleLoading={handleLoading} />
        </div>

        <div className={styles.cards}>
          {loading ? (
            <Flex m={8}>loading...</Flex>
          ) : (
            <div>
              {donationItems == null && (
                <Flex m={3}>
                  We are Working on updates... Just wait for more content
                </Flex>
              )}
              {donationItems?.data && (
                <Flex
                  ml={mediumSized ? 8 : 8}
                  mr={mediumSized ? 8 : 8}
                  direction="column"
                >
                  <Cards donationItems={donationItems} />
                </Flex>
              )}
            </div>
          )}
        </div>
      </div>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    donationItems: selectDonationItems(state),
  };
};

export default connect(mapStateToProps)(DonationItem);
