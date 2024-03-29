const express = require("express");
const { GetAreaStopsByAreaName } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  const userResponse = await GetAreaStopsByAreaName(req.body.name);
  res.send(userResponse);
});

module.exports = router;
