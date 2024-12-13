import axios from "axios";
import delay from "delay";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

class APIClient {
  endpoint;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = (params) => {
    return axiosInstance.get(this.endpoint, { params }).then((res) => res.data);
  };

  getById = (id) => {
    return axiosInstance.get(`${this.endpoint}/${id}`).then((res) => res.data);
  };

  post = (data) => {
    // delay(3000);
    return axiosInstance.post(this.endpoint, data).then((res) => res.data);
  };

  put = (id, data) => {
    return axiosInstance
      .put(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };

  putt = (id, route, data) => {
    console.log("`first", `${this.endpoint}/${id}/${route}`);
    return axiosInstance
      .put(`${this.endpoint}/${id}/${route}`, data)
      .then((res) => res.data);
  };

  delete = (id) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
