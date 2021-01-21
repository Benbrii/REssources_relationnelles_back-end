import { insert } from "../utils/database";

export const insertNewRegister = ({ lastName, firstName, email, motDePasse, birthDate }) => {
    console.log(lastName, firstName, email, motDePasse, birthDate);

    return new Promise((resolve, reject) => {
        insert(
            `INSERT INTO compte (nom, prenom, email, motDePasse, date_de_naissance)
             VALUES ( '${lastName}', '${firstName}', '${email}', '${motDePasse}', '${birthDate}')`,
            (error, insert) => {
                if (error) reject(error);
                resolve();
            }
        );
    });
};


