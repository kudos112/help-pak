import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import {warningNotification} from "~/components/fundamentals/notification/notification";
import {uploadImage} from "~/utils/image-uploader/upload-images.util";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";
import styles from "./forms.module.scss";

const Imagesinfo = ({
  data,
  setFiles,
  setData,
  errors,
  files,
  onDrop,
  handleDeleteImages,
}) => {
  // const onDrop = (acceptedFiles, rejectedFiles) => {
  //   if (rejectedFiles.length > 0) {
  //     warningNotification(
  //       "warning",
  //       "upload only one image and size limit of 1 MB"
  //     );
  //     return;
  //   } else if (acceptedFiles) {
  //     convertImageToBase64(acceptedFiles[0], (result, success) => {
  //       if (success) {
  //         uploadImage(result, (url, success) => {
  //           if (success) {
  //             setImages([...images, `${url}`]);
  //             setData({
  //               ...data,
  //               images: [...data.images, acceptedFiles[0].name],
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  // };

  return (
    <div className={styles.inputContainer}>
      <p style={{marginBottom: 10}}>Add Upto Five images</p>
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
        <FormErrorMessage>{errors.images || ""}</FormErrorMessage>
      </FormControl>
    </div>
  );
};

export default Imagesinfo;
