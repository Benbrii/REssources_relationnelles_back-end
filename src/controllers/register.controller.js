import {
    insertNewRegister,GetVerifyEmail,hashPassword,VerifyPassword
} from "../models/register.model";

export const insertRegister = async (req, res) => {
   
    let { lastName, firstName, email, password1,password2, birthDate } = req.body;
    
    // On verify dans la base de données que l'email n'existe pas déjà
    const resultEmail = await GetVerifyEmail({ email });
    
    if (resultEmail[0].verifyEmail == 0){

        //On verifie que le niveau de sécurité du mot de passe est suffisant et que le mots de passe de confirmation est correcte
        const passwordVerify = await VerifyPassword({password1,password2})
        if (passwordVerify == true){
            
            // On crypte le mots de passe
            let passwordHashed = await hashPassword({password1});

             //On insere les données dans la base de donnée
            let register = await insertNewRegister({ lastName, firstName, email, passwordHashed, birthDate });
            

            //On verifie qu'une ligne a  bien était mise
            if (register.affectedRows == 1){

                res.json({ validation: true });

            }else{

                res.json({ validation: false });

            }
        }else{
            res.json({ validation: false });
        }
        
    }else{
        res.json({ validation: false });
    }
 
}



