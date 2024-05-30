# front-project

## Nx

모노레포 관리 도구 중 하나인 Nx

> 모노레포
여러 프로젝트를 하나의 리포지토리에서 효율적으로 관리하고, 빌드, 테스트, 배포 작업을 최적화합니다.

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
