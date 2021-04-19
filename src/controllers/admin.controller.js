import { getAllRoles, updateRoles, addCat, getAllCat, getAllType, deletCat, accountActivationModel, accountDesactivationModel, getStatConsultModel, getStatCreatModel } from "../models/admin.model"
import { GetVerifyEmail } from "../models/user.model"

export const UpdateAdminForm = async (req, res) => {

    try {
        const roles = await getAllRoles();
        const categories = await getAllCat();
        const type = await getAllType();
        const years = getFiveDates();
        res.json({ roles: roles.rows, categories: categories.rows, type: type.rows, years: years })
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: e
        })
    }
}

export const changeRole = async (req, res) => {

    let { email, role } = req.body;

    try {
        const resultEmail = await GetVerifyEmail({ email })
        console.log(resultEmail[0].verifyemail)
        if (resultEmail[0].verifyemail > '0') {

            const response = await updateRoles(email, role);
            res.status(200).json({ update: true, message: "Le role à était modifier" });

        } else {
            res.status(401).json({ update: false, message: "Email invalide" });
        }

    } catch (e) {

        console.log(e)
        res.json({
            update: false,
            message: e
        })
    }
}

export const addCategorie = async (req, res) => {

    const { categorie } = req.body;
    try {
        console.log("categorie", categorie)
        const response = await addCat(categorie);

        if (response.rowCount >= 1) {
            res.status(200).json({ update: true, message: "La categorie: " + categorie + " à était ajouter" })

        } else {

            res.status(401).json({ update: true, message: "La categorie: " + categorie + " n'à pas était ajouter" })
        }

    } catch (e) {
        console.log("ERROR ", e)
        res.status(403).json({
            update: false,
            message: e
        })
    }
}

export const deleteCat = async (req, res) => {

    const { delCat } = req.body;
    try {
        const response = await deletCat(delCat);

        if (response.rowCount >= 1) {
            res.status(200).json({ update: true, message: "La categorie: " + delCat + " à était supprimer" })

        } else {
            res.status(401).json({ update: true, message: "La categorie: " + delCat + " n'à pas était supprimer" })
        }
    } catch (e) {
        console.log("ERROR ", e)
        res.status(403).json({
            update: false,
            message: e
        })
    }
}

export const accountActivation = async (req, res) => {

    const { email } = req.body;
    console.log("email", email)
    try {
        const response = await accountActivationModel(email);
        res.status(200).json({ update: true, message: "Le compte " + email + " a était activé" });
    } catch (e) {
        console.log("ERROR ", e)
        res.status(403).json({
            update: false,
            message: e
        })
    }
}

export const accountDesactivation = async (req, res) => {

    const { email } = req.body;
    console.log("email", email)
    try {
        const response = await accountDesactivationModel(email);
        res.status(200).json({ update: true, message: "Le compte " + email + " a était désactivé" });
    } catch (e) {
        console.log("ERROR ", e)
        res.status(403).json({
            update: false,
            message: e
        })
    }
}

export const getStat = async (req, res) => {
    console.log("req.body", req.body)
    const { annee, categorie, type } = req.body;
    try {
        const consultations = await getStatConsultModel(annee, categorie, type);
        const creations = await getStatCreatModel(annee, categorie, type);

        res.status(200).json({ update: true, consultStats: consultations.rows, creaStat: creations.rows });
        console.log(consultations.rows);
    } catch (e) {
        console.log("ERROR ", e)
        res.status(403).json({
            update: false,
            message: e
        })
    }
}

//////////////////////////////////////////////////////////////
//Récupére les 5 derniére année par rapport a l'année en cours
const getFiveDates = () => {
    const dateNow = new Date();
    let year = dateNow.getFullYear();

    let years = [];
    years[0] = year;

    for (let i = 1; i <= 4; i++) {
        years[i] = year - i
    }

    return years
};

