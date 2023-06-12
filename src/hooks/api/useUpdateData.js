import baseURL from "../../api/baseURL";

let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
}

// api hook to update normal data
export const useUpdateData = async (url, params) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await baseURL.put(url, params, config);
  return res.data;
};

// api hook to update data with image
export const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await baseURL.put(url, params, config);
  return res.data;
};
