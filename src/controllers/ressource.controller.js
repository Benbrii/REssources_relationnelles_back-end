import {
    getAllRessource,
    getRessourceWithId,
    getCommentWithRessourceId
} from "../models/ressource.model";

export const getRessource = async (req, res) => {
    const test = await getAllRessource();

    res.json(test);
}

export const getRessourceById = async (req, res) => {
    const { id } = req.params;

    const ressource = await getRessourceWithId({ id });
    res.json(ressource);
}

export const getCommentByRessourceId = async (req, res) => {
    const { id } = req.params;

    const comments = await getCommentWithRessourceId({ id });
    res.json(comments);
}