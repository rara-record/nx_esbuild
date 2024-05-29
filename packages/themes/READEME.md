# @repo/themes

## 파운데이션 만들기

- CSS variable을 이용한 컬러 토큰 만들기
- 타이포그라피 토큰
- shadow, spacing 그외 토큰

1. CSS Object 파일 만들기
2. 스크립트를 통해 동적으로 CSS 파일 만들기 (packages/themes/scripts/build-css-module.js)
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
      "(prefers-color-scheme: dark)",
    ).matches;

    if (isDarkMode) {
      document.body.classList.add("theme-dark");
    }

    const mediaQueryList = window.matchMedia(
      "(prefers-color-scheme: dark)",
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
  return <Text className="heading4xl">HELLO</Text>;
};
```

CSS-in-JS 사용

```javascript
const Text = styled.div`
  ${classes.typography.heading["4xl"]};
`;
```
