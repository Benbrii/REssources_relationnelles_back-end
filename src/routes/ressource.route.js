import express from "express";
import {
    getRessource
} from "../controllers/ressource.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/ressource', getRessource);

module.exports = router;