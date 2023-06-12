import baseURL from "../../api/baseURL";

// api hook to get data
// export const useGetData = async (url) => {
//   const res = await baseURL.get(url);
//   return res;
// };

let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
}

// api hook to get data that has been taken or hasn't
export const useGetData = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await baseURL.get(url, config);
  return res.data;
};
