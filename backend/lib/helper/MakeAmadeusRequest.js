const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const HttpClient = require(rootPrefix + "/lib/HttpClient");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");
const FetchAccessToken = require(rootPrefix + "/lib/helper/FetchAccessToken");


class MakeAmadeusRequest {
    constructor(method, url, requestBody) {
        this.method = method;
        this.url = url;
        this.requestBody = requestBody;
        this.res = {};
    }

    async perform() {
        const oThis = this;

        await oThis._makeRequest();

        return oThis.res;
    }

    async _makeRequest() {
        const oThis = this;

        const headers = {
            Authorization: "Bearer " + process.env.AMADEUS_ACCESS_TOKEN,
        }

        let httpResponse = null;
        if(oThis.method == "GET") {
            httpResponse = await HttpClient.makeGetRequest(
                oThis.url,
                headers,
                10000
            );
        }else if(oThis.method == "POST") {
            httpResponse = await HttpClient.makePostRequest(
                oThis.url,
                headers,
                oThis.requestBody,
                10000
            );
        }

        if (httpResponse.statusCode == 200) {
            oThis.res = JSON.parse(httpResponse.body);
            return;
        }else if(httpResponse.statusCode == 401){
            const response = await new FetchAccessToken().perform();

            if (response.status_code) {
                oThis.res = response;
                return;
            }

            headers.Authorization = "Bearer " + process.env.AMADEUS_ACCESS_TOKEN;

            let httpNewResponse = null;
            if(oThis.method == "GET") {
                httpNewResponse = await HttpClient.makeGetRequest(
                    oThis.url,
                    headers,
                    10000
                );
            }else if(oThis.method == "POST") {
                httpNewResponse = await HttpClient.makePostRequest(
                    oThis.url,
                    headers,
                    oThis.requestBody,
                    10000
                );
            }

            if (httpNewResponse.statusCode == 200) {
                oThis.res = JSON.parse(httpNewResponse.body);
                return;
            } else {
                const errorObject = new ErrorResponse(
                    "internal_server_error",
                    httpNewResponse.body,
                    "l_h_mar_1",
                    null
                );
                oThis.res = errorObject.perform();
                return;
            }

        }else{
            const errorObject = new ErrorResponse(
                "internal_server_error",
                httpResponse.body,
                "l_h_mar_2",
                null
            );
            oThis.res = errorObject.perform();
            return;
        }

    }
}

module.exports = MakeAmadeusRequest;
