import { insert,query } from "../utils/database";



export const GetVerifyEmail = ({email}) => {
// On verifie que l'email n'est pas déja utilisé
    return new Promise((resolve, reject) => {
        const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if(email.match(emailpattern)){
            
            query(
                `SELECT COUNT(email) as verifyEmail FROM compte WHERE email = '${email}'`,
                (error, result) => {
                    if (error) reject("L'email est déja utilisé");
                    resolve(result);
                });
        }else{
            console.log("Veuillez entré un email valide")
            reject("Veuillez entré un email valide")
        }
    });
};

export const GetAccount = ({email}) => {
// On verifie que l'email n'est pas déja utilisé
    return new Promise((resolve, reject) => {
   
            query(
                `SELECT * FROM compte WHERE email = '${email}'`,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
    });
};

   
export const insertNewRegister = ({ lastName, firstName, email, passwordHashed, birthDate,pseudo,adress,city,postalCode}) => {
 // On insert les données de l'utilisateur dans la base de données
    return new Promise((resolve, reject) => {  
     insert(
            `INSERT INTO compte (nom, prenom, email, motDePasse, date_de_naissance,pseudo,adresse,ville,code_postal,authlevel)
            VALUES ( '${lastName}', '${firstName}', '${email}', '${passwordHashed}', '${birthDate}', '${pseudo}', '${adress}', '${city}', ${postalCode}, 1)`,
            (error, insert) => {
                if (error) reject(error);
                resolve(insert);
            }
        );
    });
};
