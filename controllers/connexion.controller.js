import { GetAccount } from "../models/user.model";
import * as jwt from "jsonwebtoken";
//import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt';

export const connexion = async (req, res) => {

    let { email, password } = req.body;

    let resultAccount = null
    
    try{
        resultAccount = await GetAccount({ email });
    }catch(e){

        console.log("GetAccount ERROR",e)
    }
    
    if (resultAccount.length > 0) {

        const passwordHash = resultAccount[0].motdepasse

        const comparePassword = await ComparePassword({ password, passwordHash })

        if (comparePassword == true) {

            let accessToken = jwt.sign({ email: resultAccount[0].email, authlevel: resultAccount[0].id_role }, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: 60 * 60 });
            console.log("ACCESTOKEN:", accessToken);
            try {
                res.cookie('authcookie', accessToken, { expires: new Date(new Date().getTime()+5*60*1000), httpOnly: true });

                if (accessToken != null) {
                    console.log("CONNECTION OK");
                    res.json({ connexion: true, authlevel: resultAccount[0].id_role, user: resultAccount[0].email, token: accessToken });
                } else {
                    res.json({ connexion: false });
                }

            } catch (err) {
                res.json({ connexion: false });
                console.log({ connexion: false, message: err });
            }
        } else {

            res.json({ connexion: false });
            console.log("le mots de passe est incorrect");
        }
    } else {
        res.json({ connexion: false });
        console.log("l'email est incorrect");
    }
}

export const authControl = async (req, res) => {

    let accessToken = req.cookies.authcookie

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        console.log("access token vide")
        return res.status(403).json({
            message: 'Login Failed',
            islogged: false
        })
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("TOKEN OK")
        res.status(200).json({
            message: 'Login Successful',
            islogged: true
        });

    } catch (e) {
        console.log("CLEAR DISCONNECT")
        disconnect(req, res)

    }
}

export const disconnect = async (req, res) => {

    try {
        res.clearCookie("authcookie");
        console.log("LOGOUT OK")
        res.json({
            message: 'Logout Successful',
            islogged: false
        })
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Logout Failed'
        });
    }
}

const ComparePassword = ({ password, passwordHash }) => {

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function (err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
};


