import { Client } from 'pg';
import { DATABASE_URL } from './constants.js';

let clientInstance = null;

const getClient = () => {
  if (!clientInstance) {
    clientInstance = new Client(DATABASE_URL);
    clientInstance.connect();
  }
  return clientInstance;
};

export default getClient;
