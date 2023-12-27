const express = require("express");
const { GetBusesForStopInArea } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  const userResponse = await GetBusesForStopInArea(
    req.body.region_name,
    req.body.stop_name,
  );
  res.send(userResponse);
});

module.exports = router;
