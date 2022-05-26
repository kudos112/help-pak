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
import {getDonationItems} from "~/redux/donation-item/donation-item.actions";
import conditions from "~/utils/data/itemCondition.options";
import {cities} from "~/utils/data/cities";
import options from "~/utils/data/itemCategories.options";

const FilterDonationItem = ({handleLoading}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    category: "",
    condition: "",
  });
  // const [name, setName] = useState("")
  // const [category, setCity] = useState("")
  // const [condition, setCampType] = useState("");

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      category: "",
      condition: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getDonationItems(
        handleLoading,
        filter.name,
        filter.city,
        filter.category,
        filter.condition
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
      <FormControl mt={2} mb={2}>
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
      <FormControl>
        <Heading size={"sm"} mb={3} color="customGray">
          Select or Type Category
        </Heading>
        <Select
          instanceId="2"
          options={options}
          placeholder="Select or Type category"
          value={{value: filter.category, label: filter.category}}
          onChange={(item) => {
            handleData("category", item.value);
          }}
        />
      </FormControl>
      <FormControl mt={2} mb={4}>
        <Heading size={"sm"} mb={3} color="customGray">
          Select or Type Condition
        </Heading>
        <Select
          instanceId="1"
          options={conditions}
          placeholder="Select or Type Condition"
          value={{value: filter.condition, label: filter.condition}}
          onChange={(item) => {
            handleData("condition", item.value);
          }}
        />
      </FormControl>
    </Flex>
  );
};

export default FilterDonationItem;
