import { GetAccount} from "../models/user.model";
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'

export const connexion = async (req, res) => {

    let { email, password } = req.body;

    const resultAccount = await GetAccount({ email });
    
    if(resultAccount.length > 0){

        const passwordHash = resultAccount[0].motDePasse

        const comparePassword = await ComparePassword({password,passwordHash})
    
        console.log(comparePassword);
        
        if (comparePassword == true){
            
            console.log("SECRET",process.env.ACCESS_TOKEN_SECRET)

            let accessToken = jwt.sign({ email : resultAccount[0].email, authlevel : resultAccount[0].authlevel}, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256",expiresIn: process.env.ACCESS_TOKEN_LIFE });
            let refreshToken = jwt.sign({ email : resultAccount[0].email, authlevel : resultAccount[0].authlevel}, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS256",expiresIn: process.env.REFRESH_TOKEN_LIFE });
           
            try {

                res.cookie('authcookie',accessToken,{maxAge:900000,httpOnly:true}) 

                res.json();

                console.log("Connexion REUSSIE: TOKEN:",accessToken)

            } catch (err) {
            
                console.log({connected:false , message:err});
            }
        }
    }else{
        res.json({ connected: false });
        console.log("l'email ou le mots de passe sont incorrect");
    }
}


const ComparePassword = ({password,passwordHash}) => {
    console.log("password",password)
    console.log("passwordHash",passwordHash)
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
};