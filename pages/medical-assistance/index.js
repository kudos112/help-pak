import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import Cards from "~/components/medical-assistance/medical-assistance-cards";
import {getMedicalAssistances} from "~/redux/medical-service/medical-service.actions";
import {selectMedicalAssistances} from "~/redux/medical-service/medical-service.selector";

const MedicalAssistance = ({medicalAssistances}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getMedicalAssistances(() => {
        setLoading(false);
      })
    );
  }, []);
  return (
    <Flex direction="column">
      <Heading m={8}>Medical Assistance</Heading>
      {loading ? (
        <Flex m={8}>loading...</Flex>
      ) : (
        <Cards m={2} medicalAssistances={medicalAssistances} />
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    medicalAssistances: selectMedicalAssistances(state),
  };
};

export default connect(mapStateToProps)(MedicalAssistance);
