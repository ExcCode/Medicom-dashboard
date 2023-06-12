import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://medicom.fresh-app.com/public",
});

export default baseURL;
