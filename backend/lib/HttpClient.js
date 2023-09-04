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
      const contentType = response.headers.get('content-type');
      const statusCode = response.status;
      const headersMap = {};

      response.headers.forEach((value, key) => {
        if (!headersMap[key]) {
          headersMap[key] = [value];
        } else {
          headersMap[key].push(value);
        }
      });

      return new HttpResponse(statusCode, responseBody, headersMap, contentType);
    } catch (error) {
      console.error('Error making GET request:', error);
      throw error;
    }
  }

  static async makePostRequest(url, headers, requestBody, timeoutMillis) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
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
      throw error;
    }
  }
}

module.exports = HttpClient;
