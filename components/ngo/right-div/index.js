import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {
  Box,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";

const PaymentMethod = ({
  index,
  paymentMethod,
  isDisabled,
  handlePaymentMethodsData,
}) => {
  return (
    <Flex w={"100%"} direction="column" key={index}>
      <CustomInput
        isDisabled={isDisabled}
        title="Bank Name"
        required
        value={paymentMethod.bankName}
        // error={errors.fullAddress}
        onChange={(e) =>
          handlePaymentMethodsData(index, "bankName", e.target.value)
        }
        placeholder={"JazzCash"}
      />
      <CustomInput
        isDisabled={isDisabled}
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
        isDisabled={isDisabled}
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
  onDropFounderImage,
  handleDeleteFounderImage,
  update = false,
}) => {
  //  const format = (val) => `Rs.` + val;
  //  const parse = (val) => val.replace(/^\$/, "");
  return (
    <>
      <CustomInput
        title="Founder Name"
        type="text"
        required
        isDisabled={update}
        onChange={(e) => {
          handleData("founderName", e.target.value);
        }}
        value={data.founderName}
        error={errors.founderName}
        placeholder={"name"}
      />
      <CustomInput
        title="Founder Message"
        type="text"
        value={data.founderMessage}
        onChange={(e) => {
          handleData("founderMessage", e.target.value);
        }}
        error={errors.founderMessage}
        placeholder={"optional"}
      />
      <FormControl
        isRequired
        isDisabled={update}
        isInvalid={errors.images || false}
      >
        <FormLabel color={"customGray"} fontSize={"0.9rem"}>
          Founder Image
        </FormLabel>
        <FileUploader
          placeholder={
            data.founderImage
              ? data.founderImage
              : "Click here to upload Founder Image"
          }
          image={true}
          disabled={update}
          accept={["image/jpeg", "image/png", "image/bmp"]}
          maxFiles={1}
          maxSize={1000000}
          removeFile={handleDeleteFounderImage}
          onDrop={(acceptedFiles, rejectedFiles) => {
            onDropFounderImage(acceptedFiles, rejectedFiles);
          }}
        />
        <FormErrorMessage>{errors.images || ""}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isDisabled={update}
        isInvalid={errors.images || false}
      >
        <FormLabel color={"customGray"} fontSize={"0.9rem"}>
          Images
        </FormLabel>
        <FileUploader
          disabled={update}
          placeholder={data.images ? data.images : "Click here to upload"}
          image={true}
          accept={["image/jpeg", "image/png", "image/bmp"]}
          maxFiles={4}
          maxSize={1000000}
          removeFile={handleDeleteImages}
          onDrop={(acceptedFiles, rejectedFiles) => {
            onDrop(acceptedFiles, rejectedFiles);
          }}
        />
        <FormErrorMessage>{errors.images || ""}</FormErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isDisabled={update}
        isInvalid={errors.images || false}
      >
        <FormLabel color={"customGray"} fontSize={"0.9rem"}>
          Donation Methods
        </FormLabel>
        {paymentMethods.map((paymentMethod, index) => {
          return (
            <div key={index}>
              <PaymentMethod
                index={index}
                isDisabled={update}
                paymentMethod={paymentMethod}
                handlePaymentMethodsData={handlePaymentMethodsData}
              />
            </div>
          );
        })}
        {!update && (
          <Flex w={"100%"} gap={2} justify={"flex-end"}>
            <Tooltip label="Remove Donation Method">
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
            <Tooltip label={"Add Donation Method"}>
              <Box as="button" onClick={addPaymentMethod}>
                <Circle size="40px" bg="green" color="white">
                  <AddIcon />
                </Circle>
              </Box>
            </Tooltip>
          </Flex>
        )}
        <FormErrorMessage>{errors.paymentMethods || ""}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default RightDiv;
