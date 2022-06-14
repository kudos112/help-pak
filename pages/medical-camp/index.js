import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {useMediaQuery} from "@chakra-ui/react";
import Cards from "~/components/medical-camp/medical-camp-cards";
import FilterMedicalCamp from "~/components/medical-camp/search-bar/filter.camp.component";
// import {getMedicalCamps} from "~/redux/medical-camp/medical-camp.actions";
import styles from "./medical-camp.module.scss";
import {selectMedicalCamps} from "~/redux/medical-camp/medical-camp.selector";
import SmallFooter from "~/components/partial-components/small-footer";

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
    <>
      <Flex direction="column">
        <Heading m={4} ml={8} color={"customGreen"}>
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
                {(medicalCamps == null || medicalCamps.data.length === 0) && (
                  <Flex m={3} h="100%" align="center" justify={"center"}>
                    <Heading color="gray.400">
                      No Medical Camps Listed yet
                    </Heading>
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
      {/* <SmallFooter /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    medicalCamps: selectMedicalCamps(state),
  };
};

export default connect(mapStateToProps)(MedicalCamp);
