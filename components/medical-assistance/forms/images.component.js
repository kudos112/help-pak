import FileUploader from "~/components/fundamentals/custom-fileuploader/file-upload.component";
import {warningNotification} from "~/components/fundamentals/notification/notification";
import {uploadImage} from "~/utils/image-uploader/upload-images.util";
import convertImageToBase64 from "~/utils/imageToBase64/imageToBase64";
import styles from "./forms.module.scss";

const Imagesinfo = ({data, setImages, images, setData}) => {
  const onDrop = (acceptedFiles, rejectedFiles) => {
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
              setImages([...images, `${url}`]);
              setData({
                ...data,
                images: [...data.images, acceptedFiles[0].name],
              });
            }
          });
        }
      });
    }
  };

  return (
    <div className={styles.inputContainer}>
      <p style={{marginBottom: 10}}>Add Upto Five images</p>
      <FileUploader
        title={"Attach Image"}
        placeholder={data.images[0] ? data.images[0] : "Click here to upload"}
        image={true}
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles)
        }
      />

      <FileUploader
        title={"Attach Image"}
        placeholder={data.images[1] ? data.images[1] : "Click here to upload"}
        image={true}
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles)
        }
      />
      <FileUploader
        title={"Attach Image"}
        placeholder={data.images[2] ? data.images[2] : "Click here to upload"}
        image={true}
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles)
        }
      />
      <FileUploader
        title={"Attach Image"}
        placeholder={data.images[3] ? data.images[3] : "Click here to upload"}
        image={true}
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles)
        }
      />

      <FileUploader
        title={"Attach Image"}
        placeholder={data.images[4] ? data.images[4] : "Click here to upload"}
        image={true}
        accept={["image/jpeg", "image/png", "image/bmp"]}
        maxFiles={1}
        maxSize={1000000}
        onDrop={(acceptedFiles, rejectedFiles) =>
          onDrop(acceptedFiles, rejectedFiles)
        }
      />
    </div>
  );
};

export default Imagesinfo;
