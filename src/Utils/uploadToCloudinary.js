export const uploadToCloudinary = async (images) => {
  if (images) {
    const data = new FormData();
    data.append("file", images);
    data.append("upload_preset", "Instagram");
    data.append("cloud_name", "dnvwqvvbk");
    const res = await fetch("https://api.cloudinary.com/v1_1/dnvwqvvbk/image/upload", {
      method: "post",
      body: data,
    });
    const fileData = await res.json();
    console.log(fileData);
    return fileData.url.toString();
  } else {
    console.log("error from upload function");
  }
};
