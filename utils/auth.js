import jwt from "jwt-simple";
import moment from "moment";
// import { getUserByEmail } from "../models/user.model";

/**
 * Check authentification and return 401 if no autorized for route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const init = (req, res, next) => {
    let found = firewallWhitelist(req.url);
    // True => dans la whitelist

    if (found === false) {
        if (req.cookies.token) {
            try {
                const decoded = jwt.decode(req.cookies.token, process.env.SECRET_TOKEN);
                const { expiration, email } = decoded;

                if (
                    expiration !== undefined &&
                    moment().format("X") - expiration < 60
                ) {
                    // JWT valid and not expired
                    req.auth = decoded;

                    next();
                } else {
                    // JWT valid and expired, update now
                    getUserByEmail({ email }).then(user => {
                        try {
                            const oUser = {
                                id: user.id,
                                email: user.email,
                                surname: user.surname,
                                firstname: user.firstname,
                                entreprise: user.entreprise,
                                authlevel: user.authlevel,
                                expiration: moment().format("X")
                            };

                            res.cookie("token", jwt.encode(oUser, process.env.SECRET_TOKEN));

                            req.auth = oUser;

                            next();
                        } catch (e) {
                            res.status(401).send("Unauthorized");
                        }
                    });
                }
            } catch (e) {
                res.status(401).send("Unauthorized");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } else {
        next();
    }
};


/**
 * Check autorisation by account type and route, return 401 if not authorized
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const autorisation = (req, res, next) => {
    let found = firewallWhitelist(req.url);

    if (found === false) {
        const { type } = req.auth;

        firewallAutorisation(req.url, type) === false
            ? res.status(401).send("Unauthorized autorisation")
            : next();
    } else {
        next();
    }
};


export const firewallWhitelist = url => {
    var f = false;
    const w = [
        /^\/cloud/g,

        /^\/ressources/g,
        /^\/ressources\/ressource/g,
        /^\/ressource/g,
        /^\/ressource\/ressource/g,

        /^\/register/g,

        /^\/upload/g,

        /^\/connexion/g,
        /^\/connexion\/authcontroll/g,
        /^\/connexion\/disconnect/g,

        /^\/connexion\/disconnect/g,

        /^\/admin\/UpdateAdminForm/g,    
        /^\/admin\/changeRole/g,   
        /^\/admin\/addCategorie/g,
        /^\/admin\/deleteCat/g
    ];

    w.map(r => {
        if (f === false) {
            f = r.test(url) === true ? true : false;
        }
    });

    return f;
};

export const firewallAutorisation = url => {
    var f = false;

    const autorisations = [
        /^\/cloud/g,

        /^\/ressources\/ressource/g,
        /^\/ressources/g,
        /^\/ressource/g,
        /^\/ressource\/ressource/g,

        /^\/register/g,

        /^\/upload/g,
        /^\/connexion/g,
        /^\/connexion\/authcontroll/g,
        /^\/connexion\/disconnect/g,

        /^\/admin\/UpdateAdminForm/g,    
        /^\/admin\/changeRole/g,
        /^\/admin\/addCategorie/g,
        /^\/admin\/deleteCat/g 
    ];

    autorisations.map(r => {
        if (f === false) {
            f = r.test(url) === true ? true : false;
        }
    });

    return f;
};
