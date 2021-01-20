import "@babel/polyfill/noConflict";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import _ from "lodash";

import { init, autorisation } from "./utils/auth";

const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3000/ressource"
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

module.exports = app;