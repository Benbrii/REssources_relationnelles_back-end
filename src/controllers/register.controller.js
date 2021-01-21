import {
    insertNewRegister
} from "../models/register.model";

export const insertRegister = async (req, res) => {
    let { lastName, firstName, email, motDePasse, birthDate } = req.body;
    let register = await insertNewRegister({ lastName, firstName, email, motDePasse, birthDate });
    res.json(register);
}
