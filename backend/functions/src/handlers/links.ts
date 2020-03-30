import { Request, Response } from "express"
import * as firebase from "firebase"
import { getEncodedEmojiString } from "../utils/url"
import { db } from "../utils/admin"
import { firebaseConfig } from "../utils/config"
import { Link } from "../models/link.model"

firebase.initializeApp(firebaseConfig)

export async function shortenLink(req: Request, res: Response) {
    try {
        const { longUrl } = req.body
        const encodedEmojis = getEncodedEmojiString()
        const link: Link = { emojis: encodedEmojis, longUrl }
        await db.collection("links").add(link)
        return res.json(link)
    } catch (error) {
        return res.status(500)
    }
}

export async function getLink(req: Request, res: Response) {
    try {
        const linkId = encodeURI(req.params.id)
        console.log(req.params.id)
        const docsRef = await db.collection("links").where("emojis", "==", linkId).get()
        const doc = docsRef.docs[0]
        const data = doc.data()
        console.log(data)
        // res.redirect("https://twitch.tv")
        res.redirect(`https://${data.longUrl}`)
    } catch (error) {
        res.status(500)
    }
}
