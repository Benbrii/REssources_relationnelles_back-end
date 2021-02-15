import { insert, query } from "../utils/database";

require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ressources_relationnelles"
});

con.connect(function (err) {
    if (err) throw err;
});

export const getAllRessource = () => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT * FROM ressource`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const addPoste = ({ title, theme, newDocURL, type, description, todayDate }) => {
    return new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO ressource(titre, theme, lien, date_envoie, type_ressource, id_compte)
            VALUES ('${title}', '${theme}', '${newDocURL}', '2021-02-15', '${type}', '1')`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
}