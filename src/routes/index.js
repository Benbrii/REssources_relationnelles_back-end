import express from "express";

const router = express.Router();

router.use("/ressources", require("./ressource.route"));
router.use("/cloud", require("./cloud.route"))
router.use("/register",require("./register.route"))

module.exports = router;
