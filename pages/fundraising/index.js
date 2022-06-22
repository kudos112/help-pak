import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useState} from "react";
import {connect} from "react-redux";
import Cards from "~/components/fundraising/fundraising-cards";
import FilterFundraising from "~/components/fundraising/search-bar/filter.component";
import {selectFundraisings} from "~/redux/fundraising/fundraising.selector";
// import {getMedicalAssistances} from "~/redux/fundraising/fundraising.actions";
import styles from "./fundraising.module.scss";

const Fundraising = ({fundraisings}) => {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
          Fundraising
        </Heading>

        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterFundraising handleLoading={handleLoading} />
          </div>

          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(fundraisings == null ||
                  fundraisings.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No Fundraising Listed yet</Heading>
                  </Flex>
                )}
                {fundraisings?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards fundraisings={fundraisings} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        </div>
      </Flex>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fundraisings: selectFundraisings(state),
  };
};

export default connect(mapStateToProps)(Fundraising);
