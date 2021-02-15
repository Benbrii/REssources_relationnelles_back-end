import { insert,query } from "../utils/database";
import bcrypt from 'bcrypt'

export const insertNewRegister = ({ lastName, firstName, email, passwordHashed, birthDate }) => {
    
    return new Promise((resolve, reject) => {
        console.log("PASSWORD:",passwordHashed)
     insert(
            `INSERT INTO compte (nom, prenom, email, motDePasse, date_de_naissance)
                VALUES ( '${lastName}', '${firstName}', '${email}', '${passwordHashed}', '${birthDate}')`,
            (error, insert) => {
                if (error) reject(error);
                resolve(insert);
            }
        );
    });
};

export const GetVerifyEmail = ({email}) => {
// On verifie que l'email n'est pas déja utilisé
    return new Promise((resolve, reject) => {
        const emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if(email.match(emailpattern)){
            
            query(
                `SELECT COUNT(email) as verifyEmail FROM compte WHERE email = '${email}'`,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
        }else{
            console.log("Veuillez entré un email valide")
            reject(false)
        }
          
    });
};

export const VerifyPassword = ({password1,password2}) => {
//On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte

    return new Promise((resolve, reject) => {
        //REGEX
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
       
        if (password1.match(passwordPattern)){
            
            if (password1 == password2){
                resolve(true);
            }else{
                console.log("Le mots de passe de confirmation est faux")
                reject(false)
            }
        }else{
            console.log("le mots de passe n'est pas valide: le mots de passe doit contenir entre 8 et 15 caracteres, une majuscule,une minuscule, un chiffre et un caractére speciale")
            reject(false)
        }
    });
};



export const hashPassword = (password) => {
//On Crypte le mot de passe
    return new Promise((resolve, reject) => {
        bcrypt.hash(password.password1, 10, function(err, hash) {
            if (err) reject(err);
            resolve(hash);
        });

    });
};






/////////////////////////////////////////////////////////////////
/*Compare password 


const comparePassword = async (password, hash) => {
    try {
        // Compare password
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error);
    }

    // Return false if error
    return false;
};
*/ 