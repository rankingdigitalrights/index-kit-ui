# scorecard-kit-ui

This template should help get you started developing with Vue 3 in Vite.

## How to update RDR Scorecard Kit indicators for Ranking editor

Update the `indicators.json` file in the `public/data` folder.

## How to update ServiceType and ServiceSubtype

Check the `src/entitites/ServiceType.ts` file. The select options are generated from the `ServiceType` and `ServiceSubtype` enums.

## How to update CompanyType

Check the `src/entitites/CompanyType.ts` file. The select options are generated from the `CompanyType` enum.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

The build will generate static files in the `dist` folder. You can deploy it to any static hosting service. But if you want to deploy it after a path prefix, you need to set the `base` option in `vite.config.ts`

```js
export default defineConfig({
  // ...
  base: '/my-deploy-path/'
})
```

----

## Developing 

### UI Library: Naive UI

Website: https://www.naiveui.com/

Naive UI is used as the UI library and is installed Globally, see [Install Globally](https://www.naiveui.com/en-US/os-theme/docs/usage-sfc#Install-Globally-(Not-Recommended)).

###### Using Naive UI with Volar support

Is possible to `compilerOptions.types` in `tsconfig.json`.

```json
{
  "compilerOptions": {
    // ...
    "types": ["naive-ui/volar"]
  }
}

```


### Pinia: State Management

Website: https://pinia.vuejs.org/
Version: 2.x

### Vue Router: Routing

Website: https://router.vuejs.org/
Version: 4.x

### VueJs: Core

Website: https://v3.vuejs.org/
Version: 3.x

### Vite: Development Server

Website: https://vitejs.dev/
Version: 2.x
Using plugin: @vitejs/plugin-vue

### CSS Pre-processors

According to the ViteJS Documentation, *Vite does provide built-in support for .scss, .sass, .less, .styl and .stylus files. There is no need to install Vite-specific plugins for them, but the corresponding pre-processor itself must be installed:*

```
# .scss and .sass
npm add -D sass
```

Then inside single file components, you can import the styles like this:

```vue
<style lang="scss">
```


### Recommended Tools

- [Vue Devtools](