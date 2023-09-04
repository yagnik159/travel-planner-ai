const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const MakeAmadeusRequest = require(rootPrefix + "/lib/helper/MakeAmadeusRequest");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");
const URL = require("url");

class GetPoi {
    constructor(req, res) {
        this.req = req;
        this.res = {};
        this.latitude = req.query.latitude;
        this.longitude = req.query.longitude;
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

        if (!oThis.latitude) {
            param_errors.push("missing_latitude");
        } else if (oThis.latitude < -90 || oThis.latitude > 90) {
            param_errors.push("invalid_latitude");
        }

        if (!oThis.longitude) {
            param_errors.push("missing_longitude");
        } else if (oThis.longitude < -180 || oThis.longitude > 180) {
            param_errors.push("invalid_longitude");
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

        const url = constants.searchPoiUrl;

        const queryParams = {
            latitude: oThis.latitude,
            longitude: oThis.longitude,
            radius: 10,
        }

        const getUrl = URL.format({
            pathname: url,
            query: queryParams,
        });

        const response = await new MakeAmadeusRequest("GET", getUrl, null).perform();

        if (response.status_code) {
            oThis.res = response;
        } else {
            oThis.responseBody = response;
        }


    }

    async _formatResponse() {
        const oThis = this;

        const poi_id = [];
        const poi_map_by_id = {};

        try {
            const data = oThis.responseBody.data;

            for (let i = 0; i < data.length; i++) {
                poi_id.push(data[i].id);
                poi_map_by_id[data[i].id] = {
                    id: data[i].id,
                    name: data[i].name,
                    category: data[i].category,
                    tags: data[i].tags,
                };
            }

            oThis.res = {
                poi_id: poi_id,
                poi_map_by_id: poi_map_by_id,
            };

        } catch (error) {
            
        }
    }
}

module.exports = GetPoi;