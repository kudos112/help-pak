import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useState} from "react";
import {connect} from "react-redux";
import Cards from "~/components/ngo/ngo-cards";
import FilterFundraising from "~/components/ngo/search-bar/filter.component";
import {selectFundraisings} from "~/redux/fundraising/fundraising.selector";
import {selectNgos} from "~/redux/ngo/ngo.selector";
// import {getMedicalAssistances} from "~/redux/fundraising/fundraising.actions";
import styles from "./ngo.module.scss";

const Fundraising = ({ngos}) => {
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
          NGO
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
                {(ngos == null || ngos.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No NGO Listed yet</Heading>
                  </Flex>
                )}
                {ngos?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards ngos={ngos} />
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
    ngos: selectNgos(state),
  };
};

export default connect(mapStateToProps)(Fundraising);
