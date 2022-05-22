import {
  errorNotification,
  infoNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import convertImageToBase64 from "../imageToBase64/imageToBase64";

export const uploadImage = async (img, cb) => {
  if (img != null) {
    // let base64Img = `data:image/jpg;base64,${img.base64}`;
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "helpPak-users");
    data.append("cloud_name", "helppak");
    infoNotification("Wait", "Please wait, image is uploading");
    return await fetch("https://api.cloudinary.com/v1_1/helppak/upload", {
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
        errorNotification(
          "error",
          "Error occured while uploading your image\nTry again"
        );
        cb("", false);
      });
  }
};

export const uploadOneImage = async (img, cb) => {
  if (img != null) {
    // let base64Img = `data:image/jpg;base64,${img.base64}`;
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "helpPak-users");
    data.append("cloud_name", "helppak");
    infoNotification("Wait", "Please wait, image is uploading");
    return await fetch("https://api.cloudinary.com/v1_1/helppak/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        cb(data.url, true);
      })
      .catch((err) => {
        errorNotification(
          "error",
          "Error occured while uploading your image\nTry again"
        );
        cb("", false);
      });
  }
};

export const uploadTwoOrMoreImages = (files, callback) => {
  let urls = [];
  try {
    let promise = new Promise((resolve, reject) => {
      files.forEach((file, index) => {
        convertImageToBase64(file, (result, success) => {
          if (success) {
            uploadOneImage(result, (url, success) => {
              if (success) urls.push(url);
              console.log(url);
              if (files.length === urls.length) {
                resolve(urls);
              }
            });
          }
        });
      });
    });
    promise.then((urls) => {
      console.log(urls);
      callback(true, urls);
    });
  } catch (err) {
    errorNotification(
      "error",
      "Error occureded while uploading your image\nTry again"
    );
    callback(false, []);
  }
};

// convertImageToBase64(acceptedFiles[0], (result, success) => {
//   if (success) {
//     uploadImage(result, (url, success) => {
//       if (success) {
//         setImages([...images, `${url}`]);
//         setData({...data, [imgName]: acceptedFiles[0].name});
//       }
//     });
//   }
// });
