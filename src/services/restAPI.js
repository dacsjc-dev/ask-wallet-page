import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errorTypes';

const getDefaultOptions = (_method, _body) => ({
  method: _method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: _body && JSON.stringify(_body),
});

/**
 * @function fetchWrapper
 * @param {string} [method] - REST method | url
 * @param {string} [url] - url
 * @param {Object} [body] - body of message
 * @param {Object} [additionalOptions] - any additonal needed to add in the options
 * @description
 *  Wrapper for the fetch api that provides optiuons default and base response code handling.
 * @return {Promise<Object>} A promise containing the deserialized response object.
 */

export const fetchWrapper = (method, url, body, overrideOptions) => {
  const _method = url ? method.toUpperCase() : 'GET';
  const _url = url || method;

  const defaultOptions = getDefaultOptions(_method, body);

  const options = overrideOptions
    ? { ...defaultOptions, ...overrideOptions }
    : defaultOptions;

  return fetch(_url, options).then(handleResponse);
};

/**
 * @function handleResponse
 * @param {Object} response - The response object.
 * @description
 *  A handler for fetch response Object
 * @returns {Promise<Object>} A promise containing the deserialized response object.
 */
export const handleResponse = async (response) => {
  const res = await response.json();

  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  if (response.status === 400) {
    throw new BadRequestError(res.message);
  }

  if (response.status === 403) {
    throw new ForbiddenError(res.message);
  }

  if (response.status === 404) {
    throw new NotFoundError(res.message);
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `There has been an error. Response status: ${response.status}, Response Message: ${response.message}`
    );
  }

  return res;
};
