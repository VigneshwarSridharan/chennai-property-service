import axios from "axios";

const APIService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default APIService;
