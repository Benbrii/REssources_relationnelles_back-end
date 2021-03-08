import express from "express";
import { UpdateAdminForm,changeRole,addCategorie,deleteCat} from "../controllers/admin.controller";

const router = express.Router();

router.post('/UpdateAdminForm', UpdateAdminForm);
router.post('/changeRole', changeRole);
router.post('/addCategorie', addCategorie);
router.post('/deleteCat', deleteCat);

module.exports = router;