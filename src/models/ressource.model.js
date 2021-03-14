import { insert, query } from "../utils/database";

/*require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ressources_relationnelles"
});

con.connect(function (err) {
    if (err) throw err;
});*/

export const getAllRessource = () => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT *,tr.labelle as type, c.labelle as categorie FROM ressource r inner join type_ressource tr on tr.id = r.id_type inner join ressource_categorie rc on rc.id_ressource = r.id inner join categorie c on c.id = rc.id_categorie ORDER BY r.id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);

            }
        );
    });
};

export const addPoste = ({ title, categorie, newDocURL, type, description, privee, userID }) => {
    let todayDate = new Date().toLocaleDateString("fr-CA");
    console.log(categorie);
    return new Promise((resolve, reject) => {
        try {
            query(
                `INSERT INTO ressource(titre, lien, date_envoie, id_type, id_compte, description, private)
                VALUES ('${title}', '${newDocURL}', '${todayDate}', (select id from type_ressource where labelle ='${type}'),'${userID}', '${description}', ${privee})`,

                (error, result) => {
                    if (error) reject(error);
                    console.log("error 1", error);
                }
            );

            query(
                `INSERT INTO ressource_categorie(id_ressource,id_categorie) VALUES ((select MAX(id) from ressource),(select id from categorie where labelle = '${categorie}'))`,

                (error, result) => {
                    if (error) reject(error);
                    console.log("error 2", error);
                    resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
                }
            );

        } catch (e) {
            console.log("SQL INSERT RESSOURCE ERROR: ", e)
        }

    });
};

/* export const addRessCat = (categorie) => {
    console.log("im here")
    return new Promise((resolve, reject) => {
        try {
            query(
                `INSERT INTO ressource_categorie(id_ressource,id_categorie) VALUES ((select MAX(id) from ressource),(select id from categorie where labelle = '${categorie}'))`,

                (error, result) => {
                    if (error) reject(error);
                    console.log("error 2", error);
                    resolve();
                }
            );
        } catch (e) {
            console.log("SQL INSERT RESSOURCE ERROR: ", e)
        }

    });
}; */

export const getRessourceWithId = async ({ id }) => {
    console.log("getRessourceWithId")
    return new Promise((resolve, reject) => {
        try {
            query(
                `SELECT r.*,c.labelle as categorie FROM ressource r inner join ressource_categorie rc on rc.id_ressource = r.id inner join categorie c on c.id = rc.id_categorie WHERE r.id = ${id}`,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
                }
            );
        } catch (e) {
            console.log("getRessourceWithId ", e)
        }

    });
};

export const getCommentWithRessourceId = async ({ id }) => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT com.*,comp.pseudo as pseudo FROM commentaire com inner join compte comp on comp.id = com.id_compte WHERE id_ressource = ${id}`, (error, result) => {
                if (error) reject(error);

                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};

export const addConsult = async (idUser, idRessource, todayDate) => {
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO consult (id_compte, id_ressource,date_consult) VALUES ('${idUser}', '${idRessource}','${todayDate}')`, (error, result) => {
                if (error) reject(error);
                resolve();
            }
        );
    });
};

export const addCommentToRessource = async ({ commentaire, idUser, idRessource }) => {

    console.log("addCommentToRessource", commentaire, idUser, idRessource)

    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO commentaire(message, id_compte, id_ressource)
            VALUES ('${commentaire}', '${idUser}', '${idRessource}')`,
            (error, result) => {

                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
}

export const addRessourceToFavoris = async ({ id_user, idRessource }) => {
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO favoris(id_compte, id_ressource)
            VALUES ('${id_user}', '${idRessource}')`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
}

export const removeRessourceFromFavoris = async ({ id_user, idRessource }) => {
    return new Promise((resolve, reject) => {
        query(
            `DELETE FROM favoris WHERE id_compte = ${id_user} AND id_ressource = ${idRessource}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
}

export const getAllFavorisByUserId = async ({ uId }) => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT * FROM favoris WHERE id_compte = '${uId}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
}