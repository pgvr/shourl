import * as crypto from "crypto";

export function hashLink(longUrl: string) {
    const hashedLink = crypto.createHash('sha1').update(longUrl).digest('hex');
    return hashedLink;
}