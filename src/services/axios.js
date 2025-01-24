import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/",
  headers: {
    "X-Api-Key": "uN3P1TA8NjAMmNYswdu/Qg==fDlYX6ED4cDzewNI",
  },
});

export default axiosInstance;
