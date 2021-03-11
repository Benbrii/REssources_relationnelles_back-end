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

export const updateRoles = (email,role) => {
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
    console.log("delCat",delCat)
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
    console.log("email",email)
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
    console.log("email",email)
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


export const getStatModel = (année,categorie) => {
    return new Promise((resolve, reject) => {
        const request = "select "

        query(
            `UPDATE compte set active = false WHERE email = '${email}'`,
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};