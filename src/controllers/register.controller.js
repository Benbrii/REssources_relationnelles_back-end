import { insertNewRegister, GetVerifyEmail } from "../models/user.model";
import bcrypt from 'bcrypt'

export const insertRegister = async (req, res) => {

    let { lastName, firstName, email, password1, password2, birthDate, pseudo, adress, city, postalCode } = req.body;

    // On verify dans la base de données que l'email n'existe pas déjà
    if (lastName != null && firstName != null && email != null && password1 != null && password2 != null && birthDate != null && pseudo != null && adress != null && city != null && postalCode != null) {

        const resultEmail = await GetVerifyEmail({ email });
        if (resultEmail[0].verifyemail === '0') {

            //On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte
            const passwordVerify = await VerifyPassword({ password1, password2 })
            if (passwordVerify == true) {

                // On crypte le mots de passe
                let passwordHashed = await hashPassword({ password1 });

                //On insere les données dans la base de donnée
                let register = await insertNewRegister({ lastName, firstName, email, passwordHashed, birthDate, pseudo, adress, city, postalCode });

                //On verifie qu'une ligne a  bien était mise
                if (register.rowCount === 1) {

                    res.json({ validation: true });

                } else {
                    res.json({ validation: false, message: "OUPS...Une Erreur est survenu l'utilisateur n'a pas était enregistré" });
                    console.log("ERROR", 1)
                }
            } else {
                res.json({ validation: false, message: passwordVerify });
                console.log("ERROR", 2)
            }
        } else {
            res.json({ validation: false });
            console.log("ERROR", 3)
        }
    } else {
        res.json({ validation: false });
        console.log("ERROR", 4)
    }
}

//On Crypte le mot de passe
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password.password1, 10, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
};

//On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte
const VerifyPassword = ({ password1, password2 }) => {
    return new Promise((resolve, reject) => {
        //REGEX
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
        if (password1.match(passwordPattern)) {
            if (password1 == password2) {
                resolve(true);
            } else {
                console.log("Le mots de passe de confirmation est faux")
                reject("Le mots de passe de confirmation est faux")
            }
        } else {
            console.log("le mots de passe n'est pas valide: le mots de passe doit contenir entre 8 et 15 caracteres, une majuscule,une minuscule, un chiffre et un caractére speciale")
            reject("le mots de passe n'est pas valide: le mots de passe doit contenir entre 8 et 15 caracteres, une majuscule,une minuscule, un chiffre et un caractére speciale")
        }
    });
};