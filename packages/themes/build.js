import run from '@repo/esbuild-config'
import pkg from "./package.json" assert { type: "json" };

run({ pkg })