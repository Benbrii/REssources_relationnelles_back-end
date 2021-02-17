import express from "express";
import {connexion} from "../controllers/connexion.controller";
import {authControl} from "../controllers/auth.controller";

const router = express.Router();

router.post('/', connexion);
router.post('/authControl', authControl);
module.exports = router;