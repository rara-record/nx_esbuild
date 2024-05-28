# Front Projects

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

### esbuild

- 빠름
- CommonJS 까지 커버해야 할 때 "--format=cjs" 추가

```text
 "build": "esbuild src/index.js --minify --format=cjs --bundle --outfile=dist/index.js"
```

- ES Module을 쓸거라 type은 module로 함. default가 CommonJS임.

```text
  "type": "module",
```

- CommonJS + ES Module 을 모두 제공하게끔
- 병렬로

```text
const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true
  sourcemap: true,
  outdir: "dist",
  target: "es2019",
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

```

- 외부 모듈과 watch 설정

```text
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
```

### tsc --emitDeclarationOnly

```text
  "scripts": {
    "build:type": "tsc --emitDeclarationOnly"
  },
```

- 이 명령어를 실행하면 TypeScript 컴파일러가 src 디렉토리 내의 파일을 읽고, dist 디렉토리에 타입 선언 파일(.d.ts)을 생성함.
- 예를 들어, `src/index.ts` 파일을 컴파일 하면, `dist/index.d.ts` 파일이 생성됨
- 이렇게 생성된 타입 선언 파일은 다른 TypeScript 프로젝트에서 이 모듈을 사용할 때 타입 정보를 제공하여 타입 안전성을 보장함

### Usage

**CommonJS**
If you are using CommonJS modules (Node.js default), you can import the library as follows:

```javascript
const { greet } = require("@repo/themes");

console.log(greet("World"));
```

**ES Modules**
If you are using ES modules, you can import the library like this:

```javascript
import { greet } from "@repo/themes";

console.log(greet("World"));
```

**TypeScript**
In a TypeScript project, the library can be imported and used with full type support:

```typescript
import { greet } from "@repo/themes";

console.log(greet("World"));
```

### Configuration

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

### Token 만들기

CSS variable을 이용한 컬러 토큰 만들기
타이포그라피 토큰 만들기

1. CSS Object 파일 만들기
2. packages/themes/scripts/build-css-module.js
3. npm run build:css
4. Output (pacakges/themes/dist/themes.css)
5. npm install file:../../packages/themes

```javascript
// 결과물 예시

:root {
  --black-alpha-50: rgba(0, 0, 0, 0.04);
  --black-alpha-100: rgba(0, 0, 0, 0.06);
  --black-alpha-200: rgba(0, 0, 0, 0.08);
  --black-alpha-300: rgba(0, 0, 0, 0.16);
}

.heading4xl {
  font-size: 3.75rem;
  font-weight: 700;
  line-height: 100%;
}
```

CSS Module

```css
color: var(--gray-900);
```

CSS-in-JS

```javascript
styled.div`
  color: ${vars.colors.gray[900]};
`;
```

사용하는 쪽의 index.html

```html
<body>
  <script>
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isDarkMode) {
      document.body.classList.add("theme-dark");
    }

    const mediaQueryList = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    mediaQueryList.addEventListener("change", (e) => {
      const isDarkMode = e.matches;

      if (isDarkMode) {
        document.body.classList.add("theme-dark");
      } else {
        document.body.classList.remove("theme-dark");
      }
    });
  </script>
</body>
```

className으로 사용

```jsx
const App = () => {
  return <Text className='heading4xl'>HELLO</Text>;
};
```

CSS-in-JS 사용

```javascript
const Text = styled.div`
  ${classes.typography.heading["4xl"]};
`;
```
