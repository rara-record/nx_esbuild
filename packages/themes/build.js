import * as esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };

// CommonJS + ES Module 을 모두 제공하게끔
// 병렬로 실행되게끔

const dev = process.argv.includes("--dev");
const minify = !dev;

const watch = process.argv.includes("--watch");

const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: "dist",
  target: "es2019",
  watch,
  external,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: "esm",
  }),
  esbuild.build({
    ...baseConfig,
    format: "cjs",
    outExtension: {
      // js를 cjs로 바꾸기
      ".js": ".cjs",
    },
  }),
]).catch(() => {
  console.error("Build failed");
  process.exit(1); // 에러나도 프로세스 종료
});
