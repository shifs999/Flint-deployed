import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Flintt"); // Ensure this preset exists in Cloudinary
  data.append("folder", "Flint"); // Specify the folder

  // Log the form data to verify it's correct
  for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

  const uploadURL = "https://api.cloudinary.com/v1_1/dedtxckob/image/upload";
  try {
    const res = await axios.post(uploadURL, data);
    console.log(res);
    const { url } = res.data;
    console.log(url);
    return url;
  } catch (err) {
    console.error("Error during file upload:", err.response ? err.response.data : err);
    throw err;
  }
};

export default upload;
