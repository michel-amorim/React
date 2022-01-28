import axios from "axios";

const api = axios.create({
  baseURL: "https://api.estudos.oasysdigital.com.br",
});

export default api;
