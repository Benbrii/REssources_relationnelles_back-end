import express from "express";
import {connexion,authControl,disconnect} from "../controllers/connexion.controller";

const router = express.Router();

router.post('/getProfil', connexion);

module.exports = router;