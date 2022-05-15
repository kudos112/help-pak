import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import Cards from "~/components/medical-camp/medical-camp-cards";
import FilterMedicalCamp from "~/components/medical-camp/search-bar/filter.camp.component";
// import {getMedicalCamps} from "~/redux/medical-camp/medical-camp.actions";
import styles from "./medical-camp.module.scss";
import {selectMedicalCamps} from "~/redux/medical-camp/medical-camp.selector";

const MedicalCamp = ({medicalCamps}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [mediumSized] = useMediaQuery("(max-width: 995px)");

  const handleLoading = () => {
    setLoading(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   // dispatch(getMedicalCamps(handleLoading));
  // }, []);
  return (
    <Flex direction="column">
      <Heading m={6} color={"customGreen"}>
        Medical Camps
      </Heading>
      {/* {JSON.stringify(medicalCamps)} */}
      <div className={styles.main}>
        <div className={styles.filter}>
          <FilterMedicalCamp handleLoading={handleLoading} />
        </div>

        <div className={styles.cards}>
          {loading ? (
            <Flex m={8}>loading...</Flex>
          ) : (
            <div>
              {medicalCamps == null && (
                <Flex m={3}>
                  We are Working on updates... Just wait for more content
                </Flex>
              )}
              {medicalCamps?.data && (
                <Flex
                  ml={mediumSized ? 8 : 8}
                  mr={mediumSized ? 8 : 8}
                  direction="column"
                >
                  <Cards medicalCamps={medicalCamps} />
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
    medicalCamps: selectMedicalCamps(state),
  };
};

export default connect(mapStateToProps)(MedicalCamp);
