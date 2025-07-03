import axios from 'axios';
import { API_BASE_URL } from '../common/constants.js';

export async function login() {
  const response = await axios.post(`${API_BASE_URL}/login`);
  return response.data.token;
}
