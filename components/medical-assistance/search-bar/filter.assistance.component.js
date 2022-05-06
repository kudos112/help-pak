import {SearchIcon} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Select from "react-select";
import {getMedicalAssistances} from "~/redux/medical-service/medical-service.actions";
import {cities} from "~/utils/data/cities";
import options from "~/utils/data/serviceType.options";

const FilterMedicalAssistance = ({handleLoading}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    serviceType: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      serviceType: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getMedicalAssistances(
        handleLoading,
        filter.name,
        filter.city,
        filter.serviceType
      )
    );
  }, [filter]);

  return (
    <Flex pl={5} pr={5} m={3} flexDirection="column">
      <Heading size={"md"} mb={3} color="customGray">
        Filter
        <Button
          border={"none"}
          bg={"transparent"}
          _hover={{bg: "transparent", color: "customGreen"}}
          onClick={resetFilter}
          float="right"
          mt={-2}
        >
          Reset
        </Button>
      </Heading>
      <InputGroup borderColor="gray.400" borderRadius={4} borderWidth="1px">
        <Input
          border="none"
          type="text"
          bg="white"
          value={filter.name}
          placeholder="Search by title"
          onChange={(e) => handleData("name", e.target.value)}
        />

        <IconButton aria-label="Search title" icon={<SearchIcon />} />
      </InputGroup>
      <FormControl mt={4} mb={4}>
        <Heading size={"sm"} mb={3} color="customGray">
          Select or Type Service Type
        </Heading>
        <Select
          options={options}
          placeholder="Select or Type service"
          value={{value: filter.serviceType, label: filter.serviceType}}
          onChange={(item) => {
            handleData("serviceType", item.value);
          }}
        />
      </FormControl>
      <FormControl mb={4}>
        <Heading size={"sm"} mb={3} color="customGray">
          Select or Type City
        </Heading>
        <Select
          options={cities}
          placeholder="Select or Type city name"
          value={{value: filter.city, label: filter.city}}
          onChange={(item) => {
            handleData("city", item.value);
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default FilterMedicalAssistance;
