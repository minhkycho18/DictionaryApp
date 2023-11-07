import axios from "axios";

const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`;

export const getAudioUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  })
  formData.append("upload_preset", uploadPreset);



  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET, // Set this in your Cloudinary settings
        api_key: process.env.API_KEY_CLOUDINARY,
      },
    });
    return response.status === 200 ? response.data.url : null;
  } catch (error) {
    return null;
  }
};
