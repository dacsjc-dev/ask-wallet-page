import { fetchWrapper } from "./restAPI";
const MORALIS_API_SERVER_URL = process.env.MORALIS_API_SERVER_URL;
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const ASK_CONTRACT_ADDRESS = '0xaA3717090CDDc9B227e49d0D84A28aC0a996e6Ff';

const overrideOptions = {
  headers: {
    'x-api-key': MORALIS_API_KEY,
    'Content-Type': 'application/json'
  }
};

const fetchMoralisAPI = (endpoint, body) => fetchWrapper(
  'GET',
  `${MORALIS_API_SERVER_URL}/${endpoint}`,
  body,
  overrideOptions
);


/**
 * @function getASKTransactions
 * @param {string} [address] - the address of the user
 * @description
 *  This fetch the ASK transactions found in the address of the user
 * @return {<Array>} An array containing all of the ASK transactions found for the address
 */
const filterASKTransaction = (results) => {
  return results.filter(({ address }) => ASK_CONTRACT_ADDRESS.toLowerCase() === address)
}
export const getASKTransactions = async (address) => {
  // Returning Data
  let results = [];

  const initialResponse = await fetchMoralisAPI(
    `${address}/erc20/transfers?chain=polygon`);

  // Push first instance of Ask transactions

  results = [...filterASKTransaction(initialResponse.result)];

  let cursor = initialResponse.cursor;

  // Check if cursor truly has a value
  while (!!cursor) {
    const response = await fetchMoralisAPI(
      `${address}/erc20/transfers?chain=polygon&cursor=${cursor}`);

    results = [...results, ...filterASKTransaction(response.result)];

    cursor = response.cursor;
  };


  return results.map((result, index) => ({
    id: index,
    ...result,
    status: result.from_address === address ? 'sent' : 'received'
  }));
};

/**
 * @function getASKBalance
 * @param {string} [address] - the address of the user
 * @description
 *  This fetch the ASK Balance for the address of the user
 * @return {<Object>} An object containing all of the ASK balance & information found for the address
 */
export const getASKBalance = async (address) => {
  const response = await fetchMoralisAPI(
    `${address}/erc20?chain=polygon&token_address=${ASK_CONTRACT_ADDRESS}`
  );

  if (!response.length) {
    throw new Error('No balance/transaction found for the user\'s address');
  }

  return response[0];
}