const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const constants = require(rootPrefix + "/lib/globalConstants/Constants");
const HttpClient = require(rootPrefix + "/lib/HttpClient");
const OpenAI = require("openai");
const URL = require("url");

class GetCityDetails {
  constructor(req, res) {
    this.req = req;
    this.res = {};
    this.city = req.query.destination;
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

    if (!oThis.city) {
      param_errors.push("missing_city");
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

    const openAiResponse = oThis._makeOpenAiRequest();
    const unsplashResponse = oThis._makeUnsplashRequest();

    const responses = await Promise.all([openAiResponse, unsplashResponse]);

    if (responses[0].status_code || responses[1].status_code) {
      return;
    }
    oThis.description = responses[0].choices[0].message.content;
    
    if(responses[1].statusCode !== 200) {
      const errorObject = new ErrorResponse(
        "unsplash_error",
        responses[1].body,
        "a_s_s_1",
        null
      );

      oThis.res = errorObject.perform();
      return;
    }
    const response = JSON.parse(responses[1].body);

    oThis.imageUrl = response.results[0].urls.regular;
  }

  async _formatResponse() {
    const oThis = this;
    oThis.res = {
      imageUrl: oThis.imageUrl,
      description: oThis.description,
    };
  }

  async _makeOpenAiRequest() {
    const oThis = this;

    const api_key = new OpenAI(process.env.OPENAI_API_KEY);

    const prompt = `Please provide a concise overview of ${oThis.city}, emphasizing its historical importance, prominent landmarks, and distinctive cultural attributes, using no more than 2-3 brief sentences.`;

    const prompt_json = {
      instruction: prompt,
      output_format: "json",
      structure: {
        description: "String",
      },
    };

    const openAi = new OpenAI(api_key);

    const completion = openAi.chat.completions
      .create({
        messages: [{ role: "user", content: JSON.stringify(prompt_json) }],
        model: "gpt-3.5-turbo",
      })
      .catch((err) => {
        const errorObject = new ErrorResponse(
          "openai_error",
          err.message,
          "a_s_s_s_2",
          null
        );

        oThis.res = errorObject.perform();
        return;
      });
    return completion;
  }

  async _makeUnsplashRequest() {
    const oThis = this;

    const url = constants.cityPhotoUrl;

    const queryParams = {
      query: oThis.city,
      client_id: process.env.UNSPLASH_ACCESS_KEY,
      per_page: 1,
      orientation: "landscape",
      content_filter: "high",
    };

    const getUrl = URL.format({
      pathname: url,
      query: queryParams,
    });

    const response = HttpClient.makeGetRequest(getUrl, {}, 10000);

    return response;
  }
}

module.exports = GetCityDetails;
