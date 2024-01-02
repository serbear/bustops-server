const express = require("express");
const { GetBusesForStopInArea } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  // noinspection JSUnresolvedReference
  const userResponse = await GetBusesForStopInArea(req.body.stop_id);
  res.send(userResponse);
});

module.exports = router;
