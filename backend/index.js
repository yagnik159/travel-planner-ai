const rootPrefix = ".";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware for parsing JSON data with a limit of 2mb
app.use(bodyParser.json({ limit: "2mb" }));

// Middleware for parsing URL-encoded data with extended set to true and a limit of 2mb
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

// Define your routes and other application logic here

app.get("/api", function (request, response, next) {
  response = perform(request, response, "/app/services/suggestion");
});

function perform(req, res, serviceGetter) {
  const Service = require(rootPrefix + serviceGetter);

  res = new Service(req, res).perform();

  return;
}

// Start the Express server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
