/* eslint-disable @typescript-eslint/no-use-before-define */
import { Request, Response, NextFunction } from "express"
import { REGEX_EMOJIS } from "../utils/constants"
import { db } from "../utils/admin"

const regex = new RegExp(REGEX_EMOJIS, "u")
// google.com test combination -> 🙃🙂🙃😆🙂

export async function get(req: Request, res: Response, next: NextFunction) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { emojis } = req.params
    const shouldRedirect = regex.test(emojis)
    console.log(emojis)
    console.log(`${emojis} : ${shouldRedirect}`)
    if (shouldRedirect) {
        const doc = await getUrl(emojis)
        if (doc && doc.longUrl) {
            res.redirect(ensureHttps(doc.longUrl))
        } else {
            console.log("nothing found in db")
            // nothing found in db
            // -> "your link was not found"
            // this should bring the user to 404
            res.redirect("/")
        }
    } else {
        next()
    }
}

function ensureHttps(url: string) {
    if (!url.includes("http") && !url.includes("https")) {
        return `https://${url}`
    }
    return url
}

async function getUrl(emojis: string) {
    const result = await db.collection("links").where("encodedEmojis", "==", encodeURI(emojis)).get()
    if (result.docs.length > 0) {
        return result.docs[0].data()
    }
    return null
}
