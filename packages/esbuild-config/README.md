# @repo/esbuild-config

esbuild를 사용하여 프로젝트를 빌드하기 위한 공통 구성 파일입니다.

## 모듈과 모듈 번들러

모듈: 파일 하나나하나, 특정 기능을 갖는 작은 코드 단위

- CommonJS
- ES Module

모듈 번들러

여러개의 파일과 모듈을 하나 ~ 몇개의 파일로 결합하는 도구
(번들링, 트리쉐이킹, 트랜스파일링, 로더와 플러그인)

- webpack, rollup, vite, esbuild

## 라이브러리에서 고려해야 할 것

1. Common JS 대응 (some.cjs)
2. Module JS 대응 (some.mjs)
3. Typescript 대응 (type.d.ts)

## esbuild

- Go 언어로 작성된 매우 빠른 JavaScript bundler/minifier
- 웹팩이나 롤업과 같은 기존 번들러보다 간단한 구성

### Configuration

- CommonJS 까지 커버해야 할 때 "--format=cjs" 추가

```text
 "build": "esbuild src/index.js --minify --format=cjs --bundle --outfile=dist/index.js"
```

- ES Module을 쓸거라 type은 module로 함. default가 CommonJS임.

```text
  "type": "module",
```

- tsc --emitDeclarationOnly

```text
  "scripts": {
    "build:type": "tsc --emitDeclarationOnly"
  },
```

- 이 명령어를 실행하면 TypeScript 컴파일러가 src 디렉토리 내의 파일을 읽고, dist 디렉토리에 타입 선언 파일(.d.ts)을 생성함.
- 예를 들어, `src/index.ts` 파일을 컴파일 하면, `dist/index.d.ts` 파일이 생성됨
- 이렇게 생성된 타입 선언 파일은 다른 TypeScript 프로젝트에서 이 모듈을 사용할 때 타입 정보를 제공하여 타입 안전성을 보장함

패키지의 진입점을 정의하여 Node.js, 번들러, TypeScript와 같은 도구들이 라이브러리를 어떻게 로드하고 사용할지를 결정함

```json
  "main": "dist/index.js",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
```

- run 함수는 entryPoints(진입점 파일), pkg(package.json 파일), config(추가 구성 옵션) 등의 인수를 받음

```javascript
// index.js
const { build } = require("esbuild");

const run = ({ entryPoints = ["src/index.ts"], pkg, config = {} }) => {
  const dev = process.argv.includes("--dev");
  const minify = !dev;

  const watch = process.argv.includes("--watch");

  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  // esbuild 기본 구성
  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    outdir: "dist",
    target: "es2019",
    watch,
    external,
    ...config,
  };

  // ESM 및 CJS 형식으로 두 개의 번들을 생성
  Promise.all([
    build({
      ...baseConfig,
      format: "esm",
    }),
    build({
      ...baseConfig,
      format: "cjs",
      outExtension: {
        ".js": ".cjs",
      },
    }),
  ]).catch(() => {
    // 빌드 실패 시 에러 메시지를 출력하고 프로세스를 종료
    console.error("Build failed");
    process.exit(1);
  });
};

module.exports = run;
```

### Usage

**CommonJS**
If you are using CommonJS modules (Node.js default), you can import the library as follows:

```javascript
// CommonJS
const run = require("@repo/esbuild-config");
// ES Module
import run from "@repo/esbuild-config";

// package.json 파일 가져오기
const pkg = require("./package.json");

// 기본 설정으로 빌드
run({ pkg });

// 개발 모드로 빌드 및 watch 모드 활성화
run({ pkg, config: { watch: true } }, ["--dev", "--watch"]);

// 추가 구성 옵션 전달
run({
  entryPoints: ["src/main.ts"],
  pkg,
  config: {
    outdir: "build",
    target: "es2018",
    // 기타 옵션...
  },
});
```

**ES Modules**
If you are using ES modules, you can import the library like this:

```javascript
import { greet } from "@repo/themes";

console.log(greet("World"));
```
