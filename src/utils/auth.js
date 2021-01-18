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
        /^\/user\/user/g,
        /^\/user\/allusers/g,
        /^\/user\/login/g,
        /^\/user\/logout/g,
        /^\/user\/register/g,
        /^\/service\/allservices/g,
        /^\/service\/documents/g,
        /^\/service\/byId/g,
        /^\/service\/alldocuments/g,
        /^\/upload/g,
        /^\/document\/delete/g,
        /^\/document\/modifyprogress/g,
        /^\/document\/validate/g,
        /^\/document\/refuse/g,
        /^\/mail\/send/g,
        /^\/advice/g
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
        /^\/user\/user/g,
        /^\/user\/allusers/g,
        /^\/user\/login/g,
        /^\/user\/logout/g,
        /^\/user\/register/g,
        /^\/service\/allservices/g,
        /^\/service\/documents/g,
        /^\/service\/byId/g,
        /^\/service\/alldocuments/g,
        /^\/upload/g,
        /^\/document\/delete/g,
        /^\/document\/modifyprogress/g,
        /^\/document\/validate/g,
        /^\/document\/refuse/g,
        /^\/mail\/send/g,
        /^\/advice/g
    ];

    autorisations.map(r => {
        if (f === false) {
            f = r.test(url) === true ? true : false;
        }
    });

    return f;
};
