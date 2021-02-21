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
     
        if (comparePassword == true){
           
            let accessToken = jwt.sign({ email : resultAccount[0].email, authlevel : resultAccount[0].authlevel}, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256",expiresIn: process.env.ACCESS_TOKEN_LIFE });
           
            try {

                res.cookie('authcookie',accessToken,{maxAge:900000,httpOnly:true}) 

                if(accessToken != null){
                    console.log("CONENCTION OK");
                    res.json({connexion:true});
                }else{
                    res.json({connexion:false});
                }
                
            } catch (err) {
            
                console.log({connected:false , message:err});
            }
        }
    }else{
        res.json({ connected: false });
        console.log("l'email ou le mots de passe sont incorrect");
    }
}

export const authControl = async (req, res) => {

    let accessToken = req.cookies.authcookie
    console.log("ACCESS TOKEN",accessToken)

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log("access token vide")
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        console.log("SECRET TEST",process.env.ACCESS_TOKEN_SECRET)
        try {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            
            res.json({islogged:true})
        }catch(e){
            console.log("AUTH CONTROL ERROR",e)
            res.json({islogged:false})
        }
    }
    catch(e){
        //if an error occured return request unauthorized error
       
        console.log("Le token a expiré:",e)
        return res.status(401).send()
    }
}

export const disconnect = async (req, res) => {

    res.clearCookie("authcookie");
    
}

const ComparePassword = ({password,passwordHash}) => {
  
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
};