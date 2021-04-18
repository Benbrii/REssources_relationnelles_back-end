import { insert, query } from "../utils/database";


export const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT id, labelle FROM roles ORDER BY id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};


export const getAllCat = () => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT id, labelle FROM categorie ORDER BY id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const getAllType = () => {
    return new Promise((resolve, reject) => {
        query(
            `SELECT id, labelle FROM type_ressource ORDER BY id`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const updateRoles = (email, role) => {
    return new Promise((resolve, reject) => {
        query(
            `UPDATE compte SET id_role = (select id from roles where labelle ='${role}') WHERE email = '${email}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const addCat = (categorie) => {
    return new Promise((resolve, reject) => {
        query(
            `INSERT INTO categorie (labelle) VALUES ('${categorie}');`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const deletCat = (delCat) => {
    console.log("delCat", delCat)
    return new Promise((resolve, reject) => {
        query(
            `DELETE FROM categorie where labelle = '${delCat}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const accountActivationModel = (email) => {
    console.log("email", email)
    return new Promise((resolve, reject) => {
        query(
            `UPDATE compte set active = true WHERE email = '${email}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const accountDesactivationModel = (email) => {
    console.log("email", email)
    return new Promise((resolve, reject) => {
        query(
            `UPDATE compte set active = false WHERE email = '${email}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};


export const getStatConsultModel = (annee, categorie, type) => {

    console.log("data", annee, " ", categorie, " ", type)

    return new Promise((resolve, reject) => {

        let request = `SELECT (SELECT date_part('month',co.date_consult)) AS mois, COUNT(*)
                        FROM consult co
                        inner join ressource r on co.id_ressource = r.id
                        inner join ressource_categorie rc on rc.id_ressource = r.id
                        inner join categorie ca on ca.id = rc.id_categorie
                        inner join type_ressource tr on tr.id = r.id_type
                        WHERE (SELECT date_part('year',co.date_consult)) = ${annee}`

        if (categorie != "Toutes categories") {
            request = request + ` AND ca.labelle = '${categorie}'`
        }

        if (type != "tout types") {
            request = request + ` AND tr.labelle = '${type}'`
        }

        request = request + ` GROUP BY mois`

        query(
            request,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

export const getStatCreatModel = (annee, categorie, type) => {

    console.log("data", annee, " ", categorie, " ", type)

    return new Promise((resolve, reject) => {

        let request = `SELECT (SELECT date_part('month',r.date_envoie)) AS mois, COUNT(*)
                        FROM ressource r
                        inner join ressource_categorie rc on rc.id_ressource = r.id
                        inner join categorie ca on ca.id = rc.id_categorie
                        inner join type_ressource tr on tr.id = r.id_type
                        WHERE (SELECT date_part('year',r.date_envoie)) = ${annee}`

        if (categorie != "Toutes categories") {
            request = request + ` AND ca.labelle = '${categorie}'`
        }

        if (type != "tout types") {
            request = request + ` AND tr.labelle = '${type}'`
        }

        request = request + ` GROUP BY mois`

        query(
            request,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};