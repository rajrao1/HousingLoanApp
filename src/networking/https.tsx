/* Axios Create to make API call base URL constant */

import axios from "axios";

const api = axios.create({
 baseURL: process.env.API_KEY || 'https://jsonplaceholder.typicode.com/',
});

export default api;
