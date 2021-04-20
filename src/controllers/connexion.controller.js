import { GetAccount } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const connexion = async (req, res) => {

    let { email, password } = req.body;
    let resultAccount = null

    // On verifie l'email
    try {
        resultAccount = await GetAccount({ email });
    } catch (e) {
        console.log("GetAccount ERROR", e)
    }

    if (resultAccount.length > 0) {

        if (resultAccount[0].active === true) {

            // On verifie dans le mots de passe
            let comparePassword = null;
            try {
                const passwordHash = resultAccount[0].motdepasse

                if (password != null && passwordHash != null) {
                    comparePassword = await ComparePassword({ password, passwordHash })
                } else {
                    res.status(401).json({
                        message: "Veuillez entré un mots de passe"
                    })
                }

            } catch (e) {
                console.log("ComparePassword ERROR", e)
            }

            if (comparePassword === true) {

                // On crée un token
                try {
                    let accessToken = jwt.sign({ id: resultAccount[0].id, email: resultAccount[0].email, authlevel: resultAccount[0].id_role }, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: 60 * 60 });
                    console.log("ACCESTOKEN:", accessToken);

                    // On met le token dans les cookies
                    res.cookie('authcookie', accessToken, { expires: new Date(new Date().getTime() + 3600000), httpOnly: true, secure: true, signed: true, secret: 'nice-Ressource' });

                    console.log("CONNECTION OK");

                    res.status(200).json({ isLogged: true, user: resultAccount[0] });

                } catch (e) {
                    console.log("Token and cookies error", e)
                }

            } else {
                res.status(401).json({
                    message: "Le mots de passe est incorrect"
                })
            }
        } else {

            res.status(401).json({
                message: "Votre compte a était désactivé"
            })
        }

    } else {
        res.status(401).json({
            message: "L'email est incorrect"
        })

    }
}

export const authControl = async (req, res) => {

    let accessToken = req.signedCookies.authcookie
    console.log(accessToken);
    //if there is no token stored in cookies, the request is unauthorized

    /*if (!accessToken) {
        console.log("access token vide")
        return res.status(401).json({
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
        res.status(401).json({
            islogged: false
        });
    }*/
    if (!accessToken) {
        console.log("Token empty")
        res.status(401).json({
            islogged: false
        });
    } else {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("TOKEN OK")
        res.status(200).json({
            message: 'Login Successful',
            islogged: true
        });
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


