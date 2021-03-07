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
            `SELECT * FROM ressource ORDER BY id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};

export const addPoste = ({ title, theme, newDocURL, type, description, todayDate, privee }) => {
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO ressource(titre, theme, lien, date_envoie, type_ressource, id_compte, description, private)
            VALUES ('${title}', '${theme}', '${newDocURL}', '${todayDate}', '${type}', '1', '${description}', ${privee})`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};

export const getRessourceWithId = async ({ id }) => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT * FROM ressource WHERE id = '${id}'`, (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};

export const getCommentWithRessourceId = async ({ id }) => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT * FROM commentaire WHERE id_ressource = '${id}'`, (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
};

export const addCommentToRessource = async ({ commentaire, idUser, pseudoUser, idRessource }) => {
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO commentaire(message, id_compte, id_ressource, pseudo_compte)
            VALUES ('${commentaire}', '${idUser}', '${idRessource}', '${pseudoUser}')`,
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
            `SELECT * FROM favoris WHERE id_compte = ${uId}`,
            (error, result) => {
                if (error) reject(error);
                resolve(result.rows && result.rows.length === 0 ? [] : result.rows);
            }
        );
    });
}