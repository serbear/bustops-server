const express = require("express");
const { GetAreaStops } = require("../data");
const router = express.Router();

router.get("/", async function (req, res) {
  const userResponse = await GetAreaStops();
  res.send(userResponse);
});

module.exports = router;
