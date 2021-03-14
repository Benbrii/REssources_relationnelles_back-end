import {
    getAllRessource,
    getRessourceWithId,
    getCommentWithRessourceId,
    addCommentToRessource,
    addRessourceToFavoris,
    removeRessourceFromFavoris,
    getAllFavorisByUserId
} from "../models/ressource.model";

export const getRessource = async (req, res) => {
    const test = await getAllRessource();

    res.json(test);
}

export const getRessourceById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const ressource = await getRessourceWithId({ id });
    res.json(ressource);
}

export const getCommentByRessourceId = async (req, res) => {
    const { id } = req.params;

    const comments = await getCommentWithRessourceId({ id });
    res.json(comments);
}

export const postComment = async (req, res) => {
    const { commentaire, idUser, pseudoUser, idRessource } = req.body;

    const addcomment = await addCommentToRessource({ commentaire, idUser, pseudoUser, idRessource });

    res.json(addcomment);
}

export const addFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    console.log(id_user);

    const addfav = await addRessourceToFavoris({ id_user, idRessource });

    res.json(addfav);
}

export const removeFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    console.log(id_user);

    const removefav = await removeRessourceFromFavoris({ id_user, idRessource });

    res.json(removefav);
}

export const getFavorisByUserId = async (req, res) => {
    const { uId } = req.params;
    console.log(uId);

    const getfavbyuid = await getAllFavorisByUserId({ uId });
    res.json(getfavbyuid);
}