import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'accept': 'application/json',
  }
});