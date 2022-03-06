import { AttachmentIcon } from "@chakra-ui/icons";
import Dropzone from "react-dropzone";
import styles from "./file-upload.module.scss";
import { AiOutlineCamera } from "react-icons/ai";

const FileUploader = ({ title, placeholder, image, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>

        <div className={styles.dropzone}>
          <Dropzone {...props}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={styles.placeholder}>
                    {placeholder}
                    {image ? <AiOutlineCamera /> : <AttachmentIcon />}
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
