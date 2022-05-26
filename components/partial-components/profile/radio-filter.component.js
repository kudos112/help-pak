import {useRadioGroup, Wrap} from "@chakra-ui/react";
import RadioCard from "~/components/partial-components/radio-card/radio-card.component";

function RadioCards({onRadioChange}) {
  const options = ["Old Item Donation", "Medical Camps", "Medical Services"];

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: onRadioChange,
  });

  const group = getRootProps();

  return (
    <Wrap {...group}>
      {options.map((value) => {
        const radio = getRadioProps({value});
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </Wrap>
  );
}

export default RadioCards;
