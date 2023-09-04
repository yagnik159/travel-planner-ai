const rootPrefix = "../..";
const ErrorResponse = require(rootPrefix + "/lib/ErrorResponse");
const OpenAI = require("openai");

class Suggestion {
  constructor(req, res) {
    this.req = req;
    this.res = {};
    this.destination = req.body.destination;
    this.startDate = req.body.start_date;
    this.days = req.body.days;
    this.budget = req.body.budget;
    this.groupType = req.body.group_type;
    this.travelers = req.body.travelers;
    this.interests = req.body.interests;
    this.cuisineTypes = req.body.cuisine_types;
  }

  async perform() {
    const oThis = this;

    await oThis._validateParameters();

    if (oThis.res.status_code) return oThis.res;

    await oThis._makePrompt();

    if (oThis.res.status_code) return oThis.res;

    await oThis._makePayload();

    if (oThis.res.status_code) return oThis.res;

    await oThis._fetchSuggestions();

    if (oThis.res.status_code) return oThis.res;

    await oThis._formatResponse();

    return oThis.res;
  }

  async _validateParameters() {
    const oThis = this;

    let param_errors = [];

    if (!oThis.destination) {
      param_errors.push("missing_destination");
    }

    if (!oThis.startDate) {
      param_errors.push("missing_start_date");
    }

    if (!oThis.days) {
      param_errors.push("missing_days");
    }

    if (!oThis.budget) {
      param_errors.push("missing_budget");
    }

    if (!oThis.groupType) {
      param_errors.push("missing_group_type");
    }

    if (!oThis.travelers) {
      param_errors.push("missing_travelers");
    }

    if (!oThis.interests) {
      param_errors.push("missing_interests");
    }
    else if (!Array.isArray(oThis.interests)) {
      param_errors.push("invalid_interests");
    }

    if (!oThis.cuisineTypes) {
      param_errors.push("missing_cuisine_types");
    }
    else if (!Array.isArray(oThis.cuisineTypes)) {
      param_errors.push("invalid_cuisine_types");
    }

    if (param_errors.length > 0) {
      const errorObject = new ErrorResponse(
        "invalid_params",
        "Invalid parameters",
        "a_s_s_s_1",
        param_errors
      );

      oThis.res = errorObject.perform();
    }

    return;
  }

  async _makePrompt() {
    const oThis = this;

    const values = {
      destination: oThis.destination,
      budget: oThis.budget,
      travelStyle: oThis.groupType,
      activityType: oThis.interests.join(", "),
      cuisineType: oThis.cuisineTypes.join(", "),
      tripDuration: oThis.days,
    };

    const prompt = `You are an AI assistant which gives suggestion on tour planning according to this prompt. Generate a personalized travel itinerary for a trip to ${values.destination} with a budget of ${values.budget} INR rupees. The traveler is interested in a ${values.travelStyle} vacation. The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options`;
    console.log("***OpenAI prompt:", prompt);
    oThis.prompt = prompt;
  }

  async _makePayload() {
    const oThis = this;

    const prompt = {
      instructions: oThis.prompt,
      output_format: "json",
      structure: {
        days: [
          {
            title: "string", // Title of the day
            day: 1, // Day 1 or Day 2, represented as an integer
            activities: [
              {
                local_time: "time", // Time of the activity
                location_name: "string", // Name of the location
                budget_inr: 100, // Budget for the activity in USD
                duration_min: 120, // Duration of the activity in minutes
                activity_types: ["type1", "type2"], // Types of the activity
                activity_description: "string", // Description of the activity
              },
            ],
            day_summary: "string", // Summary of the day
          },
        ],
      },
    };

    oThis.prompt_json = prompt;
  }

  async _fetchSuggestions() {
    const oThis = this;
    const api_key = process.env.OPENAI_API_KEY;
    const prompt_json = JSON.stringify(oThis.prompt_json);

    const openAi = new OpenAI(api_key);

    const completion = await openAi.chat.completions
      .create({
        messages: [{ role: "user", content: prompt_json }],
        model: "gpt-3.5-turbo",
      })
      .catch((err) => {
        if (err instanceof OpenAI.APIError) {
          const errorObject = new ErrorResponse(
            "openai_error",
            err.message,
            "a_s_s_s_2",
            null
          );

          oThis.res = errorObject.perform();
          return;
        }
      });
    if (!completion) return;

    const response = completion.choices;

    const content = JSON.parse(response[0].message.content);

    oThis.responseBody = content;
  }

  async _formatResponse() {
    const oThis = this;

    const days = oThis.responseBody.days;

    const formattedDays = days.map((day) => {
      const activities = day.activities.map((activity) => {
        return {
          local_time: activity.local_time,
          location_name: activity.location_name,
          budget_inr: activity.budget_inr,
          duration_min: activity.duration_min,
          activity_types: activity.activity_types,
          activity_description: activity.activity_description,
        };
      });

      return {
        title: day.title,
        day: day.day,
        activities: activities,
        day_summary: day.day_summary,
      };
    });

    const response = {
      days: formattedDays
    };

    oThis.res = response;
  }
}

module.exports = Suggestion;
