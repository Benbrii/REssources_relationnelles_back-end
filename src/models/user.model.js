import { insert, query } from "../utils/database";



export const GetVerifyEmail = ({ email }) => {
    // On verifie que l'email n'est pas déja utilisé
    return new Promise((resolve, reject) => {
        const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (email.match(emailpattern)) {

            query(
                `SELECT COUNT(email) as verifyEmail FROM compte WHERE email = '${email}'`,
                (error, result) => {
                    if (error) reject("L'email est déja utilisé");
                    resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
                });
        } else {
            console.log("Veuillez entrer un email valide")
            reject("Veuillez entrer un email valide")
        }
    });
};

export const GetAccount = ({ email }) => {
    // On verifie que l'email n'est pas déja utilisé
    return new Promise((resolve, reject) => {

        query(
            `SELECT * FROM compte WHERE email = '${email}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};


export const insertNewRegister = ({ lastName, firstName, email, passwordHashed, birthDate, pseudo, adress, city, postalCode, }) => {
    // On insert les données de l'utilisateur dans la base de données
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO compte (nom, prenom, email, motdepasse, date_de_naissance, pseudo, adresse, ville, code_postal, id_role,active)
            VALUES ( '${lastName}', '${firstName}', '${email}', '${passwordHashed}', '${birthDate}', '${pseudo}', '${adress}', '${city}', ${postalCode}, 1, true)`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};
