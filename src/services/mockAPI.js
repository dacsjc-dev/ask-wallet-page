import { fetchWrapper } from './restAPI';
const MOCK_API_SERVER_URL = process.env.API_SERVER_URL;

export const getUsers = async () => {
  return await fetchWrapper(`${MOCK_API_SERVER_URL}/users`);
};