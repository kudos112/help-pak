import {
  errorNotification,
  infoNotification,
  successNotification,
} from "~/components/notification/notification";

export const uploadImage = (img, cb) => {
  if (img != null) {
    // let base64Img = `data:image/jpg;base64,${img.base64}`;
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "helpPak-users");
    data.append("cloud_name", "helppak");
    infoNotification("Wait", "Please wait, image is uploading");
    return fetch("https://api.cloudinary.com/v1_1/helppak/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        successNotification(
          "Upload successfully",
          "Your Image Uploaded Successfully"
        );
        cb(data.url, true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "error",
          "Error occured while uploading your image\nTry again"
        );
        cb("", false);
      });
  }
};
