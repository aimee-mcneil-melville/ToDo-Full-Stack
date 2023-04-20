# Dependencies

run these commands from the root, replace PACKAGE with the package you're migrating

```
npm uninstall -w $PACKAGE \
    webpack webpack-cli \
    @babel/core \
    @babel/preset-env \
    @babel/preset-react  \
    @babel/preset-typescript \
    babel-loader \
    babel-jest \
    ts-jest \
    jest \
    jest-environment-jsdom
```

```
npm i -w $PACKAGE  -D vite vitest @vitejs/plugin-react @vitest/coverage-c8
```

# Remove a bunch of shit from the package.json

- [ ] remove the whole jest key
- [ ] remove the whole babel key

# Update scripts

'build': should be 'run-s build:client build:server'
'build:client' should be 'vite build'
'build:server' should be 'tsc -p server/tsconfig.json'
'dev:client' should be 'vite'
'test' should be 'vitest'

# Add a tsconfig.json to the server folder

```json
{
  "extends": "../tsconfig.json",
  "include": [".", "../common"],
  "compilerOptions": {
    "outDir": "../dist",
    "noEmit": false
  }
}
```

# delete the old config

it's probably at `client/webpack.config.js`

# add the new config

this should be in vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
```

# move assets into the client folder

css, images, favicons etc

# move the index.html

This will be in `./client/index.html` but we want it in
`./index.html`

replace

```html
<script src="/bundle.js" type="text/javascript"></script>
```

with:

```html
<script src="./client/index.tsx" type="module"></script>
```

update references to css and other assets

# convert the tests

This is a manual process, see [this post](https://github.com/enspiral-dev-academy/burying-the-lede/blob/main/posts/22-testing-changes.md) for differences

# rewrite the solutions?
