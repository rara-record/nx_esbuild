# front-project

## nx.json

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
