import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import CustomSelect from "~/components/fundamentals/custom-select";
import {cities} from "~/utils/data/cities";

const RightDiv = ({data, handleData, errors, onDrop, handleDeleteImages}) => {
  return (
    <>
      <CustomInput
        title="Phone No"
        type="tel"
        value={data.phoneNo}
        isRequired
        onChange={(e) => {
          handleData("phoneNo", e.target.value);
        }}
        placeholder={"0301-1234567"}
      />
      <CustomSelect
        label="City"
        options={cities}
        value={data.city}
        onChange={(item) => {
          handleData("city", item?.value || "");
        }}
        required
        error={errors.city}
        placeholder="type or select city"
        instanceId="123"
      />
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
      <FormControl mb={2} isRequired isInvalid={errors.images || false}>
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
        <FormErrorMessage>{errors.images || "erere"}</FormErrorMessage>
      </FormControl>{" "}
    </>
  );
};

export default RightDiv;
