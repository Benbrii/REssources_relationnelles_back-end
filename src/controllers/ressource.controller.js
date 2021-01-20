import {
    getAllRessource
} from "../models/ressource.model";

export const getRessource = async (req, res) => {
    const test = await getAllRessource();

    res.json(test);
}