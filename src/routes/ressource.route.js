  
import express from "express";
import {
    getRessource,
    getRessourceById,
    getCommentByRessourceId,
    postComment,
    addFavoris,
    removeFavoris,
    getFavorisByUserId
} from "../controllers/ressource.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/ressource', getRessource);
router.get('/:id', getRessourceById);
router.get('/comments/:id', getCommentByRessourceId);
router.post('/addcomment', postComment);
router.post('/addfavoris', addFavoris);
router.post('/removefavoris', removeFavoris);
router.get('/getallfavoris/:uId', getFavorisByUserId);