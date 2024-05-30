# Front-Project #1

- 패키지 매니저: yarn berry
- 빌드 시스템 도구 : Nx
- 번들러 : esbuild

## Nx

- 현재 가장 많은 기능을 제공하는 모노레포를 위한 도구
- 설정이 굉장히 다양하고 세밀하게 할 수 있음

### **Nx와 esbuild**

- Nx는 esbuild를 활용하여 각 프로젝트의 빌드 작업을 수행함
- esbuild는 개별 프로젝트를 빠르게 번들링하고 트랜스파일링하는 데 사용
- Nx는 이러한 개별 빌드 작업을 조정하고 최적화함

### nx.json

[공식문서](https://nx.dev/reference/nx-json)

```json
{
  "extends": "nx/presets/npm.json", // 불필요한 파일이나 폴더를 제어 (대표적으로 node_modules)
  "affected": {
    "defaultBase": "main" // 베이스 브랜치 이름
  },
  "workspaceLayout": {
    // workspace 정의
    "appsDir": "services",
    "libsDir": "packages"
  },
  "tasksRunnerOptions": {
    // 빌드 러너를 어디서 할 것인지
    "another": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build"]
      }
    }
  },
  "targetDefaults": {
    // 일관되게 명령어 프리셋을 지정
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

## root package.json

```json
  "scripts": {
    "build": "nx build",
    "graph": "nx run-many --target=build --graph", //  여러 프로젝트의 build 타겟을 실행하고 의존성 그래프 보기
    "dev:all": "yarn dev:storybook & yarn dev:packages",
    "dev:storybook": "nx storybook @repo/storybook", // 스토리북을 개발 모드로 실행
    "dev:packages": "nx run-many --target=dev --projects='@repo/react-components-*'" // @repo/react-components- 에 대한 모든 프로젝트를 dev로 빌드
  },
```
