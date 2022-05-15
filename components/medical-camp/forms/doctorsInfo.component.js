import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {Box, Circle, Heading, Tooltip} from "@chakra-ui/react";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import styles from "./forms.module.scss";

const ContactInfo = ({
  doctors,
  handleDoctorsData,
  addMore,
  removeDoc,
  errors,
}) => {
  return (
    <div className={styles.doctorsContainer}>
      <div className={styles.heading}>
        <Heading mb={3} className={styles.title}>
          Optional Data
        </Heading>
      </div>
      {doctors.map((doctor, index) => {
        return (
          <div className={styles.rightDiv} key={index}>
            <CustomInput
              title="Doctor Name"
              name="name"
              type="name"
              value={doctor.name}
              // error={errors.email}
              placeholder="doctors name"
              onChange={(e) => handleDoctorsData(index, "name", e.target.value)}
            />
            <CustomInput
              title="Speciality or Degree"
              name="speciality"
              type="name"
              value={doctor.speciality}
              // error={errors.phoneNo}
              placeholder="eye specialist or MBBS"
              onChange={(e) =>
                handleDoctorsData(index, "speciality", e.target.value)
              }
            />
          </div>
        );
      })}

      <div className={styles.buttons}>
        <Tooltip label="Remove Doctor">
          <Box as="button" onClick={removeDoc}>
            <Circle size="40px" bg="red" color="white">
              <MinusIcon />
            </Circle>
          </Box>
        </Tooltip>
        <Tooltip label={"Add Doctor"}>
          <Box as="button" onClick={addMore}>
            <Circle size="40px" bg="green" color="white">
              <AddIcon />
            </Circle>
          </Box>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContactInfo;
