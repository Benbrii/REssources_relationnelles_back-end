import {getAllRoles,updateRoles,addCat,getAllCat,deletCat} from "../models/admin.model"
import {GetVerifyEmail} from "../models/user.model"

export const UpdateAdminForm = async (req, res) => {
    
    try{

        const roles = await getAllRoles();
        const categories = await getAllCat();
        const years = getFiveDates();

        res.json({roles: roles.rows,categories:categories.rows,years:years})
    }catch(e){
        console.log(e)
        res.status(403).json({
            message: e
        })
    }
}

export const changeRole = async (req, res) => {
    
    let {email, role} = req.body;
    
    try{
        const resultEmail = await GetVerifyEmail({email})
        console.log(resultEmail[0].verifyemail)
        if (resultEmail[0].verifyemail > '0') {

            const response = await updateRoles(email, role);
            res.status(200).json({update: true});

        }else{

            res.json({update: false,message:"Email invalide"});
            
        } 

    }catch(e){

        console.log(e)
        res.json({
            update: false,
            message:e
        })
    }
}

export const addCategorie = async (req, res) => {
    
    const {categorie} = req.body;
    
    try{
        console.log("categorie",categorie)
        const response = await addCat(categorie);
        res.status(200).json({update: true});
            
    }catch(e){
        console.log("ERROR ",e)
        res.json({
            update: false,
            message:e
        })
    }
}



export const deleteCat = async (req, res) => {
    
    const {delCat} = req.body;
    console.log("categorie",delCat)
    try{
        const response = await deletCat(delCat);
        res.status(200).json({update: true});
    }catch(e){
        console.log("ERROR ",e)
        res.json({
            update: false,
            message:e
        })
    }
}

//////////////////////////////////////////////////////////////
//Récupére les 5 derniére année par rapport a l'année en cours
const getFiveDates = () => {
    const dateNow=new Date();
    let year = dateNow.getFullYear();

    let years = [];
    years[0] = year;

    for (let i = 1; i <= 4; i++) {
        years[i] = year - i
      }

    return years
};

