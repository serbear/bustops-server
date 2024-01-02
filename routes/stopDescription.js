const express = require("express");
const { GetStopDescription } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  // noinspection JSUnresolvedReference
  const userResponse = await GetStopDescription(req.body.stop_name);
  res.send(userResponse);
});

module.exports = router;
