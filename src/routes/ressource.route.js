import express from "express";
import {
    getRessource,
    getRessourceById,
    getCommentByRessourceId
} from "../controllers/ressource.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/ressource', getRessource);
router.get('/:id', getRessourceById);
router.get('/comments/:id', getCommentByRessourceId);

module.exports = router;