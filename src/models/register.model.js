import { insert } from "../utils/database";



export const insertNewRegister = ({email,password,name,firstname,birthDate}) => {
    
    console.log("FIRSTNAME MODEL:",firstname)
    
    return new Promise((resolve, reject) => {
       
        insert  (
             `INSERT INTO compte (email,motDePasse,nom,prenom,date_de_naissance)
             VALUES ($1,$2,$3,$4,$5)`,
             [email, password, name, firstname, birthDate],
             (error, insert) => {
                resolve();
            }
        );
    });
};



