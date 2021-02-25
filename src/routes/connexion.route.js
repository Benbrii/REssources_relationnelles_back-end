import express from "express";
import { connexion, authControl, disconnect } from "../controllers/connexion.controller";

const router = express.Router();

router.post('/', connexion);
router.post('/authcontroll', authControl);
router.post('/disconnect', disconnect);

module.exports = router;