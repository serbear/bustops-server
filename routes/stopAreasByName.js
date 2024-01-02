const express = require("express");
const { GetAreaStopsByName } = require("../data");
const router = express.Router();

router.post("/", async function (req, res) {
  const userResponse = await GetAreaStopsByName(req.body.name);
  res.send(userResponse);
});

module.exports = router;
