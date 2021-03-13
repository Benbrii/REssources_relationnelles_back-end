import { insertNewRegister, GetVerifyEmail } from "../models/user.model";
import bcrypt from 'bcrypt'

export const insertRegister = async (req, res) => {
    try{
        let { lastName, firstName, email, password1, password2, birthDate, pseudo, adress, city, postalCode } = req.body;

    // On verify dans la base de données que l'email n'existe pas déjà
    if (lastName != null && firstName != null && email != null && password1 != null && password2 != null && birthDate != null && pseudo != null && adress != null && city != null && postalCode != null) {
        
        
        if(verifyAge(birthDate) === true){
            const resultEmail = await GetVerifyEmail({ email });
        
            if (resultEmail[0].verifyemail === '0') {

                //On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte
                const passwordVerify = await verifyPassword({ password1, password2 })
                if (passwordVerify == true) {

                    // On crypte le mots de passe
                    let passwordHashed = await hashPassword({ password1 });

                    //On insere les données dans la base de donnée
                    let register = await insertNewRegister({ lastName, firstName, email, passwordHashed, birthDate, pseudo, adress, city, postalCode });

                    //On verifie qu'une ligne a  bien était mise
                    if (register.rowCount === 1) {

                        res.status(200).json({ validation: true });

                    } else {
                        
                        console.log("ERROR REGISTER")
                    }
                } else {
                    res.status(401).json({  
                        message: "Le mots de passe doit être entre 8 et 15 caractére et être constitué: 1 Majuscule, 1 minuscule, 1 chiffre et d'un caractére spécial"
                    })
                }
            } else {
                res.status(401).json({  
                    message: "Veuillez entré un email correct"
                })
            }
        }else{
            res.status(401).json({  
                message: "Il faut avoir 15 ans minimum pour pouvoir s'inscrire"
            })
        }
        
    } else {
        res.status(401).json({  
            message: "Veuillez remplir les champs obligatoire formulaire"
        })
    }
  }catch(e){
    res.status(403).json({  
        message: e
    })
  }
    
}

//On Crypte le mot de passe
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password.password1, 10, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
};


const verifyAge = (birthDate) => {
    
    const firstDate = new Date();
    const secondDate = new Date(birthDate);

    const timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
    const differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    console.log("differentDays: ",differentDays)

    if (differentDays >= 5475){
        return true
    }else{
        return false
    }
    
}

//On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte
const verifyPassword = ({ password1, password2 }) => {
    return new Promise((resolve, reject) => {
        //REGEX
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
        if (password1.match(passwordPattern)) {
            if (password1 == password2) {
                resolve(true);
            } else {
                console.log("Le mots de passe de confirmation est faux")
                reject();
            }
        } else {
            console.log("le mots de passe n'est pas valide: le mots de passe doit contenir entre 8 et 15 caracteres, une majuscule,une minuscule, un chiffre et un caractére speciale")
            reject();
        }
    });
};