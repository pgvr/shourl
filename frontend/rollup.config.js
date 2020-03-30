import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import svelte from "rollup-plugin-svelte"
import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"
import config from "sapper/config/rollup.js"
import pkg from "./package.json"
import sveltePreprocess from "svelte-preprocess"
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"

// import { createEnv, preprocess, readConfigFile } from "svelte-ts-preprocess"

// const env = createEnv()
// const compilerOptions = readConfigFile(env)
// const opts = {
//     env,
//     compilerOptions: {
//         ...compilerOptions,
//         allowNonTsExtensions: true,
//     },
// }

const mode = process.env.NODE_ENV
const dev = mode === "development"
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
    (warning.code === "CIRCULAR_DEPENDENCY" && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

const preprocess = sveltePreprocess({ postcss: true, typescript: true })

// const clientPreprocessing = {}
// const keys1 = Object.keys(preprocess(opts))
// const values1 = Object.values(preprocess(opts))
// for (let i = 0; i < keys1.length; i++) {
//     clientPreprocessing[keys1[i]] = values1[i]
// }
// const keys2 = Object.keys(preprocess2)
// const values2 = Object.values(preprocess2)
// for (let i = 0; i < keys2.length; i++) {
//     clientPreprocessing[keys2[i]] = values2[i]
// }

// const serverPreprocessing = {}
// const keys3 = Object.keys(preprocess(dev))
// const values3 = Object.values(preprocess(dev))
// for (let i = 0; i < keys3.length; i++) {
//     serverPreprocessing[keys3[i]] = values3[i]
// }
// const keys4 = Object.keys(preprocess2)
// const values4 = Object.values(preprocess2)
// for (let i = 0; i < keys4.length; i++) {
//     serverPreprocessing[keys4[i]] = values4[i]
// }

export default {
    client: {
        input: config.client.input().replace(/\.js$/, ".ts"),
        output: config.client.output(),
        plugins: [
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(mode),
            }),
            postcss({ config: "./postcss.config.js" }),
            svelte({
                preprocess: preprocess,
                dev,
                hydratable: true,
                emitCss: true,
            }),
            resolve({
                browser: true,
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript(),
            legacy &&
                babel({
                    extensions: [".js", ".mjs", ".html", ".svelte"],
                    runtimeHelpers: true,
                    exclude: ["node_modules/@babel/**"],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: "> 0.25%, not dead",
                            },
                        ],
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        onwarn,
    },

    server: {
        input: config.server.input().server.replace(/\.js$/, ".ts"),
        output: config.server.output(),
        plugins: [
            replace({
                "process.browser": false,
                "process.env.NODE_ENV": JSON.stringify(mode),
            }),
            postcss({ config: "./postcss.config.js" }),
            svelte({
                preprocess: preprocess,
                generate: "ssr",
                dev,
            }),
            resolve({
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript(),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require("module").builtinModules || Object.keys(process.binding("natives")),
        ),

        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(mode),
            }),
            commonjs(),
            typescript(),
            !dev && terser(),
        ],

        onwarn,
    },
}
