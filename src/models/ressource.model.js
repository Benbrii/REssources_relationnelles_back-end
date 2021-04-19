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
            `SELECT r.*,tr.labelle as type FROM ressource r inner join type_ressource tr on tr.id = r.id_type ORDER BY r.id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows);
            }
        );
    });
};

export const getCategories = (id_ressource) => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT c.labelle FROM categorie c inner join ressource_categorie rc on rc.id_categorie = c.id WHERE rc.id_ressource = ${id_ressource} ORDER BY rc.id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const addPoste = ({ title, newDocURL, type, description, privee, userID }) => {
    let todayDate = new Date().toLocaleDateString("fr-CA");

    return new Promise((resolve, reject) => {
        try {
            query(
                `INSERT INTO ressource(id,titre, lien, date_envoie, id_type, id_compte, description, private)
                VALUES (DEFAULT,'${title}', '${newDocURL}', '${todayDate}', (select id from type_ressource where labelle ='${type}'),'${userID}', '${description}', ${privee}) 
                RETURNING id;`,

                (error, result) => {
                    if (error) reject(error);
                    console.log("error 1", error);
                    resolve(result);
                }
            );
        } catch (e) {
            console.log("SQL INSERT RESSOURCE ERROR: ", e)
        }

    });
};

export const addRessCat = (categorie, idPost) => {


    return new Promise((resolve, reject) => {

        try {
            for (let i = 0; i < categorie.length; i++) {
                query(
                    `INSERT INTO ressource_categorie(id_ressource,id_categorie) VALUES (${idPost},(select id from categorie where labelle = '${categorie[i]}'))`,

                    (error, result) => {
                        if (error) reject(error);
                        console.log("error 2", error);
                    }
                );
            }
            resolve();
        } catch (e) {
            console.log("SQL INSERT RESSOURCE ERROR: ", e)
        }


    });
};

export const getRessourceWithId = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            query(
                `SELECT r.*,tr.labelle as type FROM ressource r inner join type_ressource tr on tr.id = r.id_type WHERE r.id = ${id} ORDER BY r.id`,
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

export const getCommentWithRessourceId = async (id) => {
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