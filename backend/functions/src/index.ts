import * as functions from 'firebase-functions';
import * as express from "express";
import { shortenLink, getLink } from "./handlers/links";

const app = express();

app.post("/shorten", shortenLink);

app.get("/redirect/:id", getLink);

export const api = functions.region('europe-west1').https.onRequest(app);