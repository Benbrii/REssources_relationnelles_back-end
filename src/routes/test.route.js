import express from "express";
import {
    getTest
} from "../controllers/test.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});
router.get('/test', getTest);

module.exports = router;