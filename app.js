const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// todo: Make dictionary.
const allStopAreasRoute = require("./routes/allStopAreas");
const stopAreasByNameRoute = require("./routes/stopAreasByName");
const areaStopsByAreaNameRoute = require("./routes/areaStopByAreaName");
const busesForStopOfRegionRoute = require("./routes/bussesForStopOfRegion");
const stopDescriptionRoute = require("./routes/stopDescription");
const nearestRegionAndStopRoute = require("./routes/nearestRegionAndStop");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect routes.
app.use("/allStopAreas", allStopAreasRoute);
app.use("/stopAreasByName", stopAreasByNameRoute);
app.use("/areaStopsByAreaName", areaStopsByAreaNameRoute);
app.use("/busesForStopOfRegion", busesForStopOfRegionRoute);
app.use("/stopDescription", stopDescriptionRoute);
app.use("/nearestRegionAndStop", nearestRegionAndStopRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  // noinspection JSUnresolvedReference
  res.locals.message = err.message;
  // noinspection JSUnresolvedReference
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // noinspection JSUnresolvedReference
  res.status(err.status || 500);
  // noinspection JSUnresolvedReference
  res.render("error");
});

module.exports = app;
