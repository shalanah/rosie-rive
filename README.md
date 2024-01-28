# Rosie

A animation study of Rosie the Robot using Rive, no affiliation with the The Jetsons. This is a for-fun fan project not for profit.

## Screenshots / Video

## Credits / tech / apps used

- [Feather Icons](https://feathericons.com/)
- ["Mellow Mind" by Eric Matyas](https://soundimage.org/jazz-big-band/) by Eric Matyas
- [Adobe Illustrator](https://www.adobe.com/products/illustrator.html)
- [Adobe Audition](https://www.adobe.com/products/audition.html)
- [Rive](https://rive.app/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Running locally

- Use version of node in **.nvmrc** file
- `npm install` or `yarn install`
- `npm run dev` or `yarn dev`

===

### Vite Installation Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
