const regex = new RegExp(/^[🙃🙂🙃😆🙂]{5}$/u)
import admin from "firebase-admin"
import { adminConfig } from "../../shourl-firebase-key"
admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: "https://shourl-62076.firebaseio.com",
})
const db = admin.firestore()
export async function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { emojis } = req.params
    const shouldRedirect = regex.test(emojis)
    console.log(emojis)
    console.log(emojis + " : " + shouldRedirect)
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

function ensureHttps(url) {
    if (!url.includes("http") && !url.includes("https")) {
        return "https://" + url
    } else {
        return url
    }
}

async function getUrl(emojis) {
    const result = await db
        .collection("links")
        .where("emojis", "==", encodeURI(emojis))
        .get()
    if (result.docs.length > 0) {
        return result.docs[0].data()
    } else {
        return null
    }
}
