import axios from "axios";
import qs from "qs";

//const cors = "https://cors-anywhere.herokuapp.com/";
const apiRoot = "https://api.opendota.com/api/";

const instance = axios.create();

// Add a request interceptor

instance.interceptors.request.use(
  function(config) {
    config.url = `${apiRoot}${config.url}`;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;