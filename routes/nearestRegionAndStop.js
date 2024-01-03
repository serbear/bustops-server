const express = require("express");
const { GetNearestRegionAndStop } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  // noinspection JSUnresolvedReference
  const userResponse = await GetNearestRegionAndStop(
    req.body.latitude,
    req.body.longitude,
  );
  res.send(userResponse);
});

module.exports = router;
