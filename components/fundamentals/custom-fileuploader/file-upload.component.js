import {AttachmentIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import {AiOutlineDelete} from "react-icons/ai";
import styles from "./file-upload.module.scss";

const FileUploader = ({
  title,
  placeholder,
  error,
  image,
  removeFile,
  disabled,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.dropzoneWrapper}>
          <div className={styles.dropzone}>
            <Dropzone {...props} disabled={disabled}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      className={
                        disabled ? styles.disabled : styles.placeholder
                      }
                    >
                      <p className={styles.truncated}>{placeholder}</p>
                      {image ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-image mt-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                        </svg>
                      ) : (
                        <AttachmentIcon />
                      )}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className={styles.deleteIcon} onClick={removeFile}>
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
