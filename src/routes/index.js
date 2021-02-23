import express from "express";

const router = express.Router();

router.use("/ressources", require("./ressource.route"));
router.use("/cloud", require("./cloud.route"))
router.use("/register",require("./register.route"))
router.use("/connexion",require("./connexion.route"))
router.use("/connexion/authControl",require("./connexion.route"))
router.use("/connexion/disconnect",require("./connexion.route"))

module.exports = router;
