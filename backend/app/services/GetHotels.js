const rootPrefix = '../..';
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");
const HttpClient = require(rootPrefix + "/lib/HttpClient");
const Common = require(rootPrefix + "/lib/Common");
const URL = require("url");

class GetHotels {
    constructor(req, res) {
        this.req = req;
        this.res = {};
        this.location = req.query.location;
        this.checkInDate = req.query.start_date;
        this.days = req.query.days;
        this.groupType = req.query.group_type;
    }

    async perform() {
        const oThis = this;

        await oThis._validateParameters();

        if (oThis.res.status_code) return oThis.res;

        await oThis._makeRequest();

        if (oThis.res.status_code) return oThis.res;

        await oThis._formatResponse();

        return oThis.res;
    }

    async _validateParameters() {
        const oThis = this;

        let param_errors = [];

        if (!oThis.location) {
            param_errors.push("missing_location");
        }

        if (!oThis.checkInDate) {
            param_errors.push("missing_check_in_date");
        }

        if (!oThis.days) {
            param_errors.push("missing_days");
        }

        if (!oThis.groupType) {
            param_errors.push("missing_group_type");
        }

        if (param_errors.length > 0) {
            const errorObject = new ErrorResponse(
                "invalid_params",
                "Invalid parameters",
                "a_s_sc_sc_1",
                param_errors
            );
            oThis.res = errorObject.perform();
        }
    }

    async _makeRequest() {
        const oThis = this;

        const url = constants.searchHotelUrl;

        const noOfAdults = {
            "solo": 1,
            "couple": 2,
            "family": 4,
            "friends": 5,
        }

        const queryParams = {
            location: oThis.location,
            currency: "INR",
            checkin: Common.convertDateFormat(oThis.checkInDate),
            checkout: Common.convertDateFormat(oThis.checkInDate, oThis.days),
            adults: noOfAdults[oThis.groupType]
        }

        const getUrl = URL.format({
            pathname: url,
            query: queryParams,
        });

        const headers = {
            'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.X_RAPID_API_HOST,
        }

        const httpResponse = await HttpClient.makeGetRequest(getUrl, headers, 10000);


        if (httpResponse.status_code) {
            oThis.res = response;
            return;
        } else {
            oThis.responseBody = JSON.parse(httpResponse.body);
        }
    }

    async _formatResponse() {
        const oThis = this;

        const hotel_id = [];
        const hotel_map_by_id = {};

        try {
            const data = oThis.responseBody.results;

            for (let i = 0; i < data.length && i < 5; i++) {
                hotel_id.push(data[i].id);
                hotel_map_by_id[data[i].id] = {
                    id: data[i].id,
                    name: data[i].name,
                    url: data[i].url,
                    image_ur: data[i]?.images[0],
                    address: data[i].address,
                    price: data[i].price.rate + " " + data[i].price.currency,
                };
            }
        } catch (err) {
            console.log(err);
        }

        oThis.res = {
            hotel_id: hotel_id,
            hotel_map_by_id: hotel_map_by_id
        };
    }
}

module.exports = GetHotels;