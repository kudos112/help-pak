import {Flex, Heading, useMediaQuery} from "@chakra-ui/react";
import {useState} from "react";
import {connect} from "react-redux";
import Cards from "~/components/medical-assistance/medical-assistance-cards";
import FilterMedicalAssistance from "~/components/medical-assistance/search-bar/filter.assistance.component";
import {selectMedicalAssistances} from "~/redux/medical-service/medical-service.selector";
// import {getMedicalAssistances} from "~/redux/medical-service/medical-service.actions";
import styles from "./medical-assistance.module.scss";
import SmallFooter from "~/components/partial-components/small-footer";

const MedicalAssistance = ({medicalAssistances}) => {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getMedicalAssistances(handleLoading));
  // }, []);
  return (
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
          Medical Assistance Services
        </Heading>

        <div className={styles.main}>
          <div className={styles.filter}>
            <FilterMedicalAssistance handleLoading={handleLoading} />
          </div>

          <div className={styles.cards}>
            {loading ? (
              <Flex m={8}>loading...</Flex>
            ) : (
              <div>
                {(medicalAssistances == null ||
                  medicalAssistances.data.length == 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">No services Listed yet</Heading>
                  </Flex>
                )}
                {medicalAssistances?.data && (
                  <Flex
                    ml={mediumSized ? 8 : 8}
                    mr={mediumSized ? 8 : 8}
                    direction="column"
                  >
                    <Cards medicalAssistances={medicalAssistances} />
                  </Flex>
                )}
              </div>
            )}
          </div>
        </div>
      </Flex>
      <SmallFooter />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    medicalAssistances: selectMedicalAssistances(state),
  };
};

export default connect(mapStateToProps)(MedicalAssistance);
