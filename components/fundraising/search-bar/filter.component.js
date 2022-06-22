import {SearchIcon} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Select from "react-select";
import {getFundraisings} from "~/redux/fundraising/fundraising.actions";
import conditions from "~/utils/data/itemCondition.options";
import reasons from "~/utils/data/fundraisingsTypes.options";
import {cities} from "~/utils/data/cities";
import CustomSelect from "~/components/fundamentals/custom-select";

const FilterFundraising = ({handleLoading}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    reason: "",
    bankName: "",
  });

  const resetFilter = () => {
    setFilter({
      name: "",
      city: "",
      reason: "",
      bankName: "",
    });
  };

  const handleData = (name, value) => {
    setFilter({...filter, [name]: value});
  };

  useEffect(() => {
    dispatch(
      getFundraisings(handleLoading, filter.name, filter.city, filter.reason)
    );
  }, [filter]);

  return (
    <Flex pl={5} pr={5} m={3} flexDirection="column">
      <Heading size={"md"} mb={3} color="customGray">
        Filters
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
      <FormControl mt={2} mb={2}>
        <FormLabel color="customGray">Filter by Title</FormLabel>
        <Input
          border="1px solid"
          borderColor="gray.300"
          type="text"
          bg="white"
          value={filter.name}
          placeholder="Search by title"
          onChange={(e) => handleData("name", e.target.value)}
        />
      </FormControl>
      <CustomSelect
        label="Filter By CIty"
        options={cities}
        value={filter.city}
        onChange={(item) => {
          handleData("city", item?.value || "");
        }}
        required={false}
        placeholder="type or select city"
        instanceId="123"
      />
      <CustomSelect
        label="Filter By Reason"
        options={cities}
        value={filter.reason}
        onChange={(item) => {
          handleData("reason", item?.value || "");
        }}
        required={false}
        placeholder="type or select reason"
        instanceId="123"
      />
      <CustomSelect
        label="Filter By Payment Method"
        options={conditions}
        value={filter.bankName}
        onChange={(item) => {
          handleData("reason", item?.value || "");
        }}
        placeholder="type or select bank name"
        instanceId="123"
      />
    </Flex>
  );
};

export default FilterFundraising;
