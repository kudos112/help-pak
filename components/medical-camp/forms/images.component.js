import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import {warningNotification} from "~/components/fundamentals/notification/notification";
import {uploadImage} from "~/utils/image-uploader/upload-images.util";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";
import styles from "./forms.module.scss";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {Box, Circle, Heading, Tooltip} from "@chakra-ui/react";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";

const Imagesinfo = ({
  data,
  setImages,
  images,
  setData,
  addImage,
  removeImage,
  doctors,
  handleDoctorsData,
  addMore,
  removeDoc,
  errors,
}) => {
  const onDrop = (acceptedFiles, rejectedFiles, index) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "upload only one image and size limit of 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              let updated = [...images];
              updated[index] = url;
              setImages([...updated]);

              let updatedNames = data.images;
              updatedNames[index] = acceptedFiles[0].name;
              setData({
                ...data,
                images: [...updatedNames],
              });
            }
          });
        }
      });
    }
  };

  return (
    <div>
      <div className={styles.doctorsContainer}>
        <Heading
          size="sm"
          mb={3}
          mt={5}
          className={styles.title}
          color={"customGray"}
        >
          Add Images upto four
        </Heading>
        {images.map((image, index) => {
          return (
            <FileUploader
              title={"Attach Image"}
              placeholder={
                data.images[index] ? data.images[index] : "Click here to upload"
              }
              image={true}
              accept={["image/jpeg", "image/png", "image/bmp"]}
              maxFiles={1}
              removeFile={() => removeImage(index)}
              maxSize={1000000}
              onDrop={(acceptedFiles, rejectedFiles) =>
                onDrop(acceptedFiles, rejectedFiles, index)
              }
            />
          );
        })}
        <div className={styles.buttons}>
          <Tooltip label={"Add Image"}>
            <Box as="button" onClick={addImage}>
              <Circle size="40px" bg="green" color="white">
                <AddIcon />
              </Circle>
            </Box>
          </Tooltip>
        </div>
      </div>
      <div className={styles.doctorsContainer}>
        <Heading mb={3} size="sm" color={"customGray"}>
          Add Doctors (optional)
        </Heading>

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
                onChange={(e) =>
                  handleDoctorsData(index, "name", e.target.value)
                }
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
            <Box mb={8} as="button" onClick={removeDoc}>
              <Circle size="40px" bg="red" color="white">
                <MinusIcon />
              </Circle>
            </Box>
          </Tooltip>
          <Tooltip label={"Add Doctor"}>
            <Box mb={8} as="button" onClick={addMore}>
              <Circle size="40px" bg="green" color="white">
                <AddIcon />
              </Circle>
            </Box>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Imagesinfo;
