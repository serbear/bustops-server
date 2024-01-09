const express = require("express");
const { GetStopDescription } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  // noinspection JSUnresolvedReference
  const userResponse = await GetStopDescription(
    req.body.stop_name,
    req.body.stop_area,
  );
  res.send(userResponse);
});

module.exports = router;
