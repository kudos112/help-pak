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
import {getMedicalCamps} from "~/redux/medical-camp/medical-camp.actions";
import {cities} from "~/utils/data/cities";
import options from "~/utils/data/campTypes.options";

const FilterMedicalCamp = ({handleLoading}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    campType: "",
  });
  // const [name, setName] = useState("")
  // const [city, setCity] = useState("")
  // const [campType, setCampType] = useState("");

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      campType: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getMedicalCamps(handleLoading, filter.name, filter.city, filter.campType)
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
          instanceId="1"
          options={options}
          placeholder="Select or Type Camp Type"
          value={{value: filter.campType, label: filter.campType}}
          onChange={(item) => {
            handleData("campType", item.value);
          }}
        />
      </FormControl>
      <FormControl mb={4}>
        <Heading size={"sm"} mb={3} color="customGray">
          Select or Type City
        </Heading>
        <Select
          instanceId="2"
          options={cities}
          placeholder="Select or Type nearest city"
          value={{value: filter.city, label: filter.city}}
          onChange={(item) => {
            handleData("city", item.value);
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default FilterMedicalCamp;
