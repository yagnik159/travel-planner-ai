const rootPrefix = '..';
const ErrorResponse = require(rootPrefix + '/lib/ErrorResponse');
const fetch = require('node-fetch');

class HttpClient {
  static async makeGetRequest(url, headers, timeoutMillis) {
    try {
      const requestOptions = {
        headers: headers || {},
        timeout: timeoutMillis
      };

      const response = await fetch(url, requestOptions);
      const responseBody = await response.text();
      const statusCode = response.status;
      const headersMap = {};

      response.headers.forEach((value, key) => {
        if (!headersMap[key]) {
          headersMap[key] = [value];
        } else {
          headersMap[key].push(value);
        }
      });

      const httpResponse = {
        statusCode: statusCode,
        headers: headersMap,
        body: responseBody
      }
      return httpResponse;

    } catch (error) {
      console.error('Error making GET request:', error);

      const errorObject = new ErrorResponse(
        'internal_server_error',
        error,
        'a_s_hc_mgr_1',
        null
      );

      return errorObject.perform();
    }
  }

  static async makePostRequest(url, headers, requestBody, timeoutMillis) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: requestBody,
        timeout: timeoutMillis
      };

      const response = await fetch(url, requestOptions);
      const responseBody = await response.text();
      const statusCode = response.status;
      const headersMap = {};

      response.headers.forEach((value, key) => {
        if (!headersMap[key]) {
          headersMap[key] = [value];
        } else {
          headersMap[key].push(value);
        }
      });

      const httpResponse = {
        statusCode: statusCode,
        headers: headersMap,
        body: responseBody
      }

      return httpResponse;
    } catch (error) {
      console.error('Error making POST request:', error);

      const errorObject = new ErrorResponse(
        'internal_server_error',
        error,
        'a_s_hc_mpr_2',
        null
      );

      return errorObject.perform();
    }
  }
}

module.exports = HttpClient;
