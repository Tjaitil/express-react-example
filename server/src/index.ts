import * as dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

const port = process.env.port || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/player", require("./routes/player"));

app.listen(port);
