import * as theme from "../dist/index.js";

/** CSS 파일 만들기: Object CSS 제네레이트 */

Object.entries(theme.vars).forEach(([key, value]) => {
  console.log(key, value); // colors { '$scale': [Getter], '$static': [Getter] }
});
