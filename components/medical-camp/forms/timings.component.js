// import {FormControl, FormLabel, Switch} from "@chakra-ui/react";
// import Select from "react-select";
import CustomTimeInput from "~/components/fundamentals/custom-timeInput/custom-timeInput.component";
import styles from "./forms.module.scss";
// import {days} from "~/utils/days/days";
// import {useState} from "react";

const Timings = ({handleData, data, errors}) => {
  // const [disable, setDisable] = useState(false);
  return (
    <div className={styles.inputContainer}>
      <p style={{marginBottom: 10}}>Service Timings if there are</p>
      <CustomTimeInput
        title={"Enter camp date"}
        value={data.startDate}
        type="date"
        onChange={(e) => handleData("startDate", e.target.value)}
        error={errors.startDate}
      />
      <CustomTimeInput
        title={"Enter Ending Date (optional)"}
        value={data.endDate}
        type="date"
        onChange={(e) => handleData("endDate", e.target.value)}
        // error={errors.}
      />

      <CustomTimeInput
        title={"Enter Starting time"}
        value={data.startTime}
        type="time"
        onChange={(e) => handleData("startTime", e.target.value)}
        error={errors.startTime}
      />
      <CustomTimeInput
        title={"Enter Ending time"}
        value={data.endTime}
        type="time"
        onChange={(e) => handleData("endTime", e.target.value)}
        error={errors.endTime}
      />
    </div>
  );
};

export default Timings;
