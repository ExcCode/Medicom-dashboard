import baseURL from "../../api/baseURL";

let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
}

// api hook to insert normla data
export const useInsertData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await baseURL.post(url, params, config);
  return res.data;
};

// api hook to insert data with image
export const useInsertDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await baseURL.post(url, params, config);
  return res.data;
};
