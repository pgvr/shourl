// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from "@sapper/app"

const target = document.querySelector("#sapper")

if (target) {
    sapper.start({
        target,
    })
}
