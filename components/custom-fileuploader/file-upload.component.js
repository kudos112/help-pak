import Dropzone from "react-dropzone";
import styles from "./file-upload.module.scss";

const FileUploader = ({ title, placeholder, fileName, onDrop, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <p className={styles.title}>{title}</p>

        <div className={styles.dropzone}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={styles.placeholder}>
                    {fileName ? fileName : placeholder}
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
