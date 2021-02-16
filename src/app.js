import "@babel/polyfill/noConflict";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import _ from "lodash";
import path from 'path';

import { addPoste } from "./models/ressource.model";

import { init, autorisation } from "./utils/auth";
const cloudinary = require("cloudinary").v2;
const multer = require('multer');

const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3000/ressource",
            "http://localhost:3000/upload",
            "https://ressourcesrelationnelles.netlify.app",
            "https://ressourcesrelationnelles.netlify.app/upload",
            "https://ressourcesrelationnelles.netlify.app//upload",
            "https://ressourcesrelationnelles.netlify.app/ressource",
            "https://ressourcesrelationnelles.netlify.app//ressource",
            "https://ressourcesrelationnelles.herokuapp.com",
            "https://ressourcesrelationnelles.herokuapp.com/upload",
            "https://ressourcesrelationnelles.herokuapp.com//upload",
            "https://ressourcesrelationnelles.herokuapp.com/ressource",
            "https://ressourcesrelationnelles.herokuapp.com/ressources",
            "https://ressourcesrelationnelles.herokuapp.com//ressource",
            "https://ressourcesrelationnelles.herokuapp.com//ressources",
            "https://ressourcesrelationnelles.herokuapp.com//ressources/ressource",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Methods",
            "Access-Control-Request-Headers"
        ],
        credentials: true,
        enablePreflight: true
    })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => init(req, res, next));

app.use("/", indexRouter);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// SEND FILE TO CLOUDINARY + ADD NEW POSTE

app.post('/upload', upload.single('selectedFile'), (req, res) => {

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    // Update for datauri module:
    const DatauriParser = require("datauri/parser");
    const parser = new DatauriParser();
    // for getting the string from the file buffer
    const file = parser.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
    ).content;

    const uniqueFilename = req.file.originalname;

    let { title, theme, type, description, privee } = req.body;

    let todayDate = new Date().toLocaleDateString("fr-FR");

    cloudinary.uploader.upload(
        // file is required ofc
        file,
        // options here
        {
            public_id: `REssources_relationnelles/${uniqueFilename}`,
            resource_type: "raw"
        },
        function (err, file) {
            if (err) return res.send(err)

            // return image details
            const newDocURL = file.url;
            //const cloudID = file.public_id;
            let poste = addPoste({ title, theme, newDocURL, type, description, todayDate, privee });
            res.json(poste);
        }
    )
});

module.exports = app;