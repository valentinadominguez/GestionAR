import Axios from 'axios';

const SERVER_URL = 'http://localhost:4000';

export const axios = Axios.create({
  baseURL: `${SERVER_URL}/api`,
});
