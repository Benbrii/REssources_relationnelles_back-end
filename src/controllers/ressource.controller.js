import {
    getAllRessource,
    getRessourceWithId,
    getCommentWithRessourceId,
    addCommentToRessource,
    addRessourceToFavoris,
    removeRessourceFromFavoris,
    getAllFavorisByUserId,
    addConsult
} from "../models/ressource.model";

export const getRessource = async (req, res) => {
    try{
        console.log("getRessource")
        const ressources = await getAllRessource();
        res.json(ressources);
    }catch(e){
        console.log(e)
    }
    
}

export const getRessourceById = async (req, res) => {
    console.log("getRessourceById")
    const { id_user,id } = req.body;
    try{
        const dateNow = new Date().toLocaleDateString("fr-FR");
        const ressource = await getRessourceWithId({ id });
        const response = addConsult(id_user,id,dateNow);
        res.json(ressource);
    }catch(e){
        console.log(e)
    }
}

export const getCommentByRessourceId = async (req, res) => {
    console.log("getCommentByRessourceId")
    const { id } = req.params;
    try{
        const comments = await getCommentWithRessourceId({ id });
        res.json(comments);
    }catch(e){
        console.log(e)
    }
    
}

export const postComment = async (req, res) => {
    console.log("postComment req",req.body)
    const { commentaire, idUser, idRessource } = req.body;

    console.log("postComment",commentaire, idUser, idRessource)
    try{
        const addcomment = await addCommentToRessource({ commentaire, idUser, idRessource });
        res.json(addcomment);
    }catch(e){
        console.log(e)
    }
  

    
}

export const addFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    console.log(id_user);

    const addfav = await addRessourceToFavoris({ id_user, idRessource });
    res.json(addfav);
}

export const removeFavoris = async (req, res) => {
    const { id_user, idRessource } = req.body;
    try{
        const removefav = await removeRessourceFromFavoris({ id_user, idRessource });
        res.json(removefav);
    } catch(e){
        console.log(e)
    }
    
}

export const getFavorisByUserId = async (req, res) => {
    try{
        const { uId } = req.params;
        const getfavbyuid = await getAllFavorisByUserId({ uId });
        res.json(getfavbyuid);
    } catch(e){
        console.log(e)
    }
    
}