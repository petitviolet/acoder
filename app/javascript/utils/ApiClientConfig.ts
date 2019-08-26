import axios from "axios";

axios.defaults.baseURL = `${process.env.API_HOST}/api`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

console.log(`configured API baseURL: ${axios.defaults.baseURL}`);
