import express from "express";
import {
    insertRegister
} from "../controllers/register.controller";

const router = express.Router();

router.post('/', insertRegister);

module.exports = router;