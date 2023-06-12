import baseURL from "../../api/baseURL";

let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
}

// api hook to delete data
export const useDeleteData = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await baseURL.delete(url, config);
  return res.data;
};
