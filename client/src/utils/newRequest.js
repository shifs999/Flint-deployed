import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://flint-deployed.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
