  
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
router.get('/comments/:id', getCommentByRessourceId);
router.get('/getallfavoris/:uId', getFavorisByUserId);
router.post('/addcomment', postComment);
router.post('/addfavoris', addFavoris);
router.post('/removefavoris', removeFavoris);
router.post('/getRessourceById', getRessourceById);

module.exports = router;


