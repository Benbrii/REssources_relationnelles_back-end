import {
    insertNewRegister
} from "../models/register.model";

export const insertRegister = async (req, res) => {
    let user = req.body
    console.log("FIRSNAME CONTROLLER:",user.firstName)
    const name = user.lastName
    const firstname = user.firstName
    const email = user.email
    const password = user.password
    const birthDate = user.birthDate

    let register = await insertNewRegister({ email,password,name,firstname,birthDate });
    res.json(register);
}

