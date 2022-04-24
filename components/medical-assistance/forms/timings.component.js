import {FormControl, FormLabel, Switch} from "@chakra-ui/react";
import Select from "react-select";
import CustomTimeInput from "~/components/fundamentals/custom-timeInput/custom-timeInput.component";
import styles from "./forms.module.scss";
import {days} from "~/utils/days/days";
import {useState} from "react";

const Timings = ({handleData, data, errors}) => {
  const [disable, setDisable] = useState(false);
  return (
    <div className={styles.inputContainer}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          24 hours Service
        </FormLabel>
        <Switch
          id="email-alerts"
          colorScheme={"green"}
          value={data.fullDay}
          size={"lg"}
          onChange={() => {
            handleData("fullDay", !data.fullDay);
            setDisable(!disable);
          }}
        />
      </FormControl>
      <p style={{marginBottom: 10}}>Service Timings if there are</p>
      <CustomTimeInput
        title={"Enter Starting time"}
        value={data.startTime}
        type="time"
        onChange={(e) => handleData("startTime", e.target.value)}
        disabled={disable}
        error={errors.startTime}
      />
      <CustomTimeInput
        title={"Enter Ending time"}
        value={data.endTime}
        type="time"
        onChange={(e) => handleData("endTime", e.target.value)}
        disabled={disable}
        error={errors.endTime}
      />

      <FormControl mt={4}>
        <FormLabel>Select days</FormLabel>
        <Select
          isMulti
          options={days}
          onChange={(items) => {
            const array = items.map((day) => day.value);
            handleData("workingDays", array);
          }}
        />
        <p style={{color: "red"}}>{errors.workingDays}</p>
      </FormControl>
    </div>
  );
};

export default Timings;
