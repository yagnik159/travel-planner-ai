const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const HttpClient = require(rootPrefix + "/lib/HttpClient");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");

class FetchAccessToken {
    constructor() {
        this.accessToken = "";
        this.res = {};
    }

    async perform() {
        const oThis = this;

        await oThis._makeRequest();

        return oThis.res;
    }

    async _makeRequest() {
        const oThis = this;

        const url = constants.authTokenUrl;

        const headers = {
            "content-type": "application/x-www-form-urlencoded",
        };

        const formData = {
            grant_type: "client_credentials",
            client_id: process.env.AMADEUS_API_KEY,
            client_secret: process.env.AMADEUS_API_SECRET,
        };

        const requestBody = new URLSearchParams(formData).toString();

        const httpResponse = await HttpClient.makePostRequest(
            url,
            headers,
            requestBody,
            10000
        );

        if (httpResponse.statusCode == 200) {
            const parsedBody = JSON.parse(httpResponse.body);

            oThis.accessToken = parsedBody.access_token;

            process.env.AMADEUS_ACCESS_TOKEN = parsedBody.access_token;
        } else {
            const errorObject = new ErrorResponse(
                "internal_server_error",
                httpResponse.body,
                "a_s_hc_mgr_1",
                null
            );
            oThis.res = errorObject.perform();
            return;
        }
    }
}

module.exports = FetchAccessToken;
