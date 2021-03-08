import express from "express";
import {
    getRessource,
    getRessourceById
} from "../controllers/ressource.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/ressource', getRessource);
router.get('/:id', getRessourceById);

module.exports = router;