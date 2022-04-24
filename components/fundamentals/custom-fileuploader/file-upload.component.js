import {AttachmentIcon} from "@chakra-ui/icons";
import Dropzone from "react-dropzone";
import styles from "./file-upload.module.scss";
import {AiOutlineCamera, AiOutlineDelete} from "react-icons/ai";
import {IconButton} from "@chakra-ui/react";

const FileUploader = ({title, placeholder, error, image, ...props}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.dropzoneWrapper}>
          <div className={styles.dropzone}>
            <Dropzone {...props}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={styles.placeholder}>
                      <p className={styles.truncated}>{placeholder}</p>
                      {image ? <AiOutlineCamera /> : <AttachmentIcon />}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className={styles.deleteIcon}>
            <IconButton
              variant="outline"
              colorScheme="red"
              fontSize="20px"
              icon={<AiOutlineDelete />}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default FileUploader;
