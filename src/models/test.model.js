import { query } from "../utils/database";

export const getThisTest = () => {
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