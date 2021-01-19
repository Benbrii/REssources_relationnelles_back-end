import express from "express";
const router = express.Router();

router.use("/", require("./test.route"));

module.exports = router;
