import express from "express";
import { UpdateAdminForm,changeRole,addCategorie,deleteCat,accountActivation,accountDesactivation,getStat} from "../controllers/admin.controller";

const router = express.Router();

router.post('/UpdateAdminForm', UpdateAdminForm);
router.post('/changeRole', changeRole);
router.post('/addCategorie', addCategorie);
router.post('/deleteCat', deleteCat);
router.post('/AccountActivation', accountActivation);
router.post('/AccountDesactivation', accountDesactivation);
router.post('/getStat', getStat);

module.exports = router;