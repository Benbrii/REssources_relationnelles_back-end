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
           
            let accessToken = jwt.sign({ email : resultAccount[0].email, authlevel : resultAccount[0].authlevel}, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256",expiresIn:3600});
            console.log("ACCESTOKEN:",accessToken);
            try {
                res.cookie('authcookie',accessToken,{maxAge:900000,httpOnly:true}) 

                if(accessToken != null){
                    console.log("CONNECTION OK");
                    res.json({connexion:true,authlevel:resultAccount[0].authlevel});
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
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log("access token vide")
        return res.status(403).json({
            message: 'Login Failed',
            islogged:false
        })
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("TOKEN OK")
        res.status(200).json({
            message: 'Login Successful',
            islogged:true
            });
 
    }catch(e){
        console.log("CLEAR DISCONNECT")
        disconnect(req,res)
        
    }
}

export const disconnect = async (req, res) => {
   
    try{
        res.clearCookie("authcookie");
        console.log("LOGOUT OK")
        res.status(200).json({
            message: 'Logout Successful',
            islogged:false
        })
    }catch(e){
        res.status(401).json({
            message: 'Logout Failed'
        });
    }
}

const ComparePassword = ({password,passwordHash}) => {
  
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
};


