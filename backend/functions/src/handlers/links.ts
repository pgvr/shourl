import { Request, Response } from "express";
import { hashLink } from "../utils/url";
import { db } from "../utils/admin";
import { firebaseConfig } from "../utils/config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
import { Link } from "../models/link.model";

export async function shortenLink(req: Request, res: Response) {
    try {
        const {longUrl} = req.body;
        const hash = hashLink(longUrl);
        const link: Link = {id: hash, longUrl};
        await db.doc(`links/${hash}`).create(link)
        return res.json(link);
    } catch (error) {
        return res.status(500);
    }
}

export async function getLink(req: Request, res: Response) {
    try {
        const linkId = req.params.id;
        const doc = await db.doc(`links/${linkId}`).get();
        const data = doc.data() as Link;
        res.redirect(data.longUrl);
    } catch (error) {
        res.status(500);
    }
}