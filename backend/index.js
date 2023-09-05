const rootPrefix = ".";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware for parsing JSON data with a limit of 2mb
app.use(bodyParser.json({ limit: "2mb" }));

// Middleware for parsing URL-encoded data with extended set to true and a limit of 2mb
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

// Middleware for enabling CORS
const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// Define your routes and other application logic here

app.post("/api/suggest-trip", function (request, response, next) {
  const res = perform(request, response, "/app/services/Suggestion");

  Promise.resolve(res).then((res) => {
    if (res.status_code) {
      const statusCode = parseInt(res.status_code);
      response.status(statusCode).send(res);
    } else {
      response.send(res);
    }
  });
});

app.get("/api/search-city", function (request, response, next) {
  const res = perform(request, response, "/app/services/SearchCity");

  Promise.resolve(res).then((res) => {
    if (res.status_code) {
      const statusCode = parseInt(res.status_code);
      response.status(statusCode).send(res);
    } else {
      response.send(res);
    }
  });
});

app.get("/api/poi", function (request, response, next) {
  const res = perform(request, response, "/app/services/GetPoi");

  Promise.resolve(res).then((res) => {
    if (res.status_code) {
      const statusCode = parseInt(res.status_code);
      response.status(statusCode).send(res);
    } else {
      response.send(res);
    }
  });
});

app.get("/api/hotels", function (request, response, next) {
  const res = perform(request, response, "/app/services/GetHotels");

  Promise.resolve(res).then((res) => {
    if(res.status_code) {
      const statusCode = parseInt(res.status_code);
      response.status(statusCode).send(res);
    } else {
      response.send(res);
    
    }
  });
});

app.get("/api/city-details", function (request, response, next) {
  const res = perform(request, response, "/app/services/GetCityDetails");

  Promise.resolve(res).then((res) => {
    if(res.status_code) {
      const statusCode = parseInt(res.status_code);
      response.status(statusCode).send(res);
    } else {
      response.send(res);
    
    }
  });
});

function perform(req, res, serviceGetter) {
  const Service = require(rootPrefix + serviceGetter);

  res = new Service(req, res).perform();

  return res;
}

// Start the Express server on port 3000
const PORT = process.env.A_PORT || 3000;
app.listen(PORT, () => {
  console.log(`***Server is running on port ${PORT}`);
});
