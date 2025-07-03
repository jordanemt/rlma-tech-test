import axios from 'axios';
import { API_BASE_URL } from '../common/constants.js';

export async function importJsonFiles() {
  await axios.post(`${API_BASE_URL}/import`);
}
