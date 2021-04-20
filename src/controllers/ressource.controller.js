import {
    getAllRessource,
    getRessourceWithId,
    getCommentWithRessourceId,
    addCommentToRessource,
    addRessourceToFavoris,
    removeRessourceFromFavoris,
    getAllFavorisByUserId,
    addConsult,
    getCategories
} from "../models/ressource.model";
import * as jwt from "jsonwebtoken";


export const getRessource = async (req, res) => {

    let ressourcesTable = new Array();

    try {
        const ressources = await getAllRessource();

        for (let i = 0; i < ressources.length; i++) {

            const categories = await getCategories(ressources[i].id)
            ressourcesTable[i] = new Array(ressources[i], categories.rows);
        }
        console.table(ressourcesTable)
        res.json(ressourcesTable);

    } catch (e) {
        console.log("ERROR getRessource: ", e)
    }
}


export const getRessourceById = async (req, res) => {
    const { id } = req.body

    let accessToken = req.signedCookies.authcookie
    const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    console.log("token", token)

    const id_user = token.id

    const date = new Date();

    const todayDate = date.toLocaleDateString('fr-CA')

    let ressourcesTable = new Array();

    try {
        const ressources = await getRessourceWithId(id);
        const categories = await getCategories(id)

        await addConsult(id_user, id, todayDate)

        ressourcesTable[0] = new Array(ressources[0], categories.rows);

        console.table(ressourcesTable)
        res.json(ressourcesTable);

    } catch (e) {
        console.log("ERROR getRessourceById: ", e)
    }
}

export const getCommentByRessourceId = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await getCommentWithRessourceId(id);
        res.json(comments);
    } catch (e) {
        console.log("ERROR getCommentByRessourceId: ", e)
    }
}

export const postComment = async (req, res) => {
    console.log("postComment req", req.body)
    const { commentaire, idUser, idRessource } = req.body;

    console.log("postComment", commentaire, idUser, idRessource)
    try {
        const addcomment = await addCommentToRessource({ commentaire, idUser, idRessource });
        res.json(addcomment);
    } catch (e) {
        console.log(e)
    }
}

export const addFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    console.log(id_user);
    console.log(idRessource);

    const addfav = await addRessourceToFavoris({ id_user, idRessource });
    res.json(addfav);
}

export const removeFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    try {
        const removefav = await removeRessourceFromFavoris({ id_user, idRessource });
        res.json(removefav);
    } catch (e) {
        console.log(e)
    }

}

export const getFavorisByUserId = async (req, res) => {
    try {
        const { uId } = req.params;
        const getfavbyuid = await getAllFavorisByUserId({ uId });
        res.json(getfavbyuid);
    } catch (e) {
        console.log(e)
    }

}

/*export const addPostConstroller = async ({ title, categorie, newDocURL, type, description, todayDate, privee, userID }) => {
    try{
        const poste = await addPoste({ title, categorie, newDocURL, type, description, todayDate, privee, userID });
        res.json(poste);
    } catch(e){
        console.log(e)
    }
}

export const addRessCat = async ({ categorie,idPost }) => {
    try{
        const ressCat = await addRessCat({ categorie,idPost });
        res.json();
    } catch(e){
        console.log(e)
    }
}*/
