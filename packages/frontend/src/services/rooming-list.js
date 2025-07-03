import axios from 'axios';
import { API_BASE_URL } from '../common/constants.js';

export async function getFilteredRoomingLists({
  search,
  status,
  sortBy,
  sortOrder,
}) {
  const response = await axios.get(
    `${API_BASE_URL}/rooming-lists/filter?search=${search}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  return response.data;
}
