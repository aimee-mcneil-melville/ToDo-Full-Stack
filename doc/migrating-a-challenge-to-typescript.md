# Migrating a challenge to typescript

## Install typescript packages

```sh
npm install -D \
  typescript ts-node ts-jest \
  @types/react @types/express @types/react-dom
```

Make sure to align-versions after adding these packages (use `npm run align-versions`)

## Add a tsconfig file to the root

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* Projects */
    /* Language and Environment */
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "jsx": "react-jsx" /* Specify what JSX code is generated. */,

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,

    /* Interop Constraints */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict
    "allowJs": true
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */,
    "noEmit": true
  }
}
```

## Rename .js and .jsx files to .ts and .tsx

Often our entry point is called `index.js` even if it does use jsx syntax, but typescript is fussier about this than webpack so we rename it to `index.tsx`

Then you should update your entrypoint in your webpack config to point to `index.tsx`

When the README refers to specific source files, make sure that those references are updated

## Convert server typescript to esm

This means replacing `require` with `import` and `module.export` with the `export` keyword.

## Update babel-config to `runtime: automatic`

This means that each `.tsx` file doesn't need to import React

```json
  "presets": [
      "@babel/preset-typescript",
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic"
        }
      ]
    ]
```

## Fix type errors

run `npx tsc` in your project root. It won't generate any new files because we
have set `noEmit: true` but it will typecheck your code.

## update your npm scripts

`server` should use `ts-node` instead of `node`, and `server:watch` can still use
nodemon (which supports ts out of the box) but it should specify the full name of the file it launches.

`lint` should add typescript extensions.

```json
  "server": "ts-node server",
  "client:watch": "npm run webpack -- --watch",
  "server:watch": "nodemon server/index.ts",
  "lint": "eslint --ext .js,.ts,.tsx ."
```

## migrate to ts-jest

in your package.json

```json
"jest": {
  "preset": "ts-jest", // TODO: sophia will update this if we need a different preset
  "testEnvironment": "node", // or "jsdom"
},
```

## run tests, run lint, try it out in the browser etc

done! you're a garlic girl
