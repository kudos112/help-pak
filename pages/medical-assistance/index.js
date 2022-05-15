import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import Cards from "~/components/medical-assistance/medical-assistance-cards";
import FilterMedicalAssistance from "~/components/medical-assistance/search-bar/filter.assistance.component";
import {getMedicalAssistances} from "~/redux/medical-service/medical-service.actions";
import styles from "./medical-assistance.module.scss";
import {selectMedicalAssistances} from "~/redux/medical-service/medical-service.selector";

const MedicalAssistance = ({medicalAssistances}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getMedicalAssistances(handleLoading));
  }, []);
  return (
    <Flex direction="column">
      <Heading m={6} color={"customGreen"}>
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
              {medicalAssistances == null && (
                <Flex m={3}>We are Working on updates</Flex>
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
  );
};

const mapStateToProps = (state) => {
  return {
    medicalAssistances: selectMedicalAssistances(state),
  };
};

export default connect(mapStateToProps)(MedicalAssistance);
