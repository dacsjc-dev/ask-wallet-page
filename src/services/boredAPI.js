import { fetchWrapper } from './restAPI';
const BORED_API_SERVER_URL = process.env.BORED_API_SERVER_URL;

export const getActivities = async () => {
  return await fetchWrapper(`${BORED_API_SERVER_URL}/activity/`);
};