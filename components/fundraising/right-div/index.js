import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {Box, Circle, Flex, FormControl, FormErrorMessage, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Tooltip} from "@chakra-ui/react";
import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";


const PaymentMethod = ({index, paymentMethod, handlePaymentMethodsData}) => {
  return (
    <Flex w={"100%"} direction="column">
      <CustomInput
        title="Bank Name"
        required
        value={paymentMethod.name}
        // error={errors.fullAddress}
        onChange={(e) =>
          handlePaymentMethodsData(index, "bankName", e.target.value)
        }
        placeholder={"JazzCash"}
      />
      <CustomInput
        title="Account Name"
        required
        value={paymentMethod.accountName}
        // error={errors.fullAddress}
        onChange={(e) =>
          handlePaymentMethodsData(index, "accountName", e.target.value)
        }
        placeholder={"Abdul Qadoos"}
      />
      <CustomInput
        title="Account Number or IBAN: "
        required
        value={paymentMethod.accountNo}
        // error={errors.fullAddress}
        onChange={(e) =>
          handlePaymentMethodsData(index, "accountNo", e.target.value)
        }
        placeholder={"03099091509"}
      />
    </Flex>
  );
};

const RightDiv = ({
  data,
  handleData,
  errors,
  onDrop,
  handleDeleteImages,
  paymentMethods,
  addPaymentMethod,
  handlePaymentMethodsData,
  removePaymentMethod,
  update = false,
} ) =>
{
   const format = (val) => `Rs.` + val;
   const parse = (val) => val.replace(/^\$/, "");
  return (
    <>
      <CustomInput
        title="Complete Address"
        required
        value={data.fullAddress}
        error={errors.fullAddress}
        onChange={(e) => {
          handleData("fullAddress", e.target.value);
        }}
        placeholder={"house no, street, hometown "}
      />
      {!update && (
        <FormControl
          mb={2}
          mt={1}
          isRequired
          isInvalid={errors.images || false}
        >
          <FormLabel color={"customGray"} fontSize={"0.9rem"}>
            Images
          </FormLabel>
          <FileUploader
            placeholder={data.images ? data.images : "Click here to upload"}
            image={true}
            accept={["image/jpeg", "image/png", "image/bmp"]}
            maxFiles={4}
            maxSize={1000000}
            removeFile={handleDeleteImages}
            onDrop={(acceptedFiles, rejectedFiles) =>
              onDrop(acceptedFiles, rejectedFiles)
            }
          />
          <FormErrorMessage>{errors.images || ""}</FormErrorMessage>
        </FormControl>
      )}
      <FormControl mb={3} isRequired={true} isInvalid={errors.amount || false}>
        <FormLabel color={"customGray"} fontSize={"0.9rem"}>
          {"Required Amount (in rupees)"}
        </FormLabel>
        <NumberInput
          bg="white"
          onChange={(valueString) => {
            // alert(valueString)
            handleData("amount", valueString);
          }}
          // value={format(data.amount)}
          precision={2}
          allowMouseWheel
          min={0}
          step={1000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage mt={-1} mb={2}>
          {errors.amount}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.images || false}>
        <FormLabel color={"customGray"} fontSize={"0.9rem"}>
          Payment Methods
        </FormLabel>
        {paymentMethods.map((paymentMethod, index) => {
          return (
            <PaymentMethod
              index={index}
              paymentMethod={paymentMethod}
              handlePaymentMethodsData={handlePaymentMethodsData}
            />
          );
        })}

        <Flex w={"100%"} gap={2} justify={"flex-end"}>
          <Tooltip label="Remove Doctor">
            <Box
              as="button"
              onClick={removePaymentMethod}
              isDisabled={paymentMethods.length === 1}
            >
              <Circle size="40px" bg="red" color="white">
                <MinusIcon />
              </Circle>
            </Box>
          </Tooltip>
          <Tooltip label={"Add Doctor"}>
            <Box as="button" onClick={addPaymentMethod}>
              <Circle size="40px" bg="green" color="white">
                <AddIcon />
              </Circle>
            </Box>
          </Tooltip>
        </Flex>
        <FormErrorMessage>{errors.images || ""}</FormErrorMessage>
      </FormControl>
      {/* </div> */}
    </>
  );
};

export default RightDiv;
