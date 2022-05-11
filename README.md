# Challenges

Challenges is a monorepo that contains the standard challenges we use in bootcamp

Each challenge package is in `packages`, e.g. the pupparazzi challenge is in
`packages/pupparazzi`

## Forking to cohort

Since we have all challenges in one repository we can't use the old process of
forking each challenge into each new cohort organisation on github anymore.

[Spork](https://github.com/dev-academy-challenges/spork) is a CLI tool that
provides a new workflow.

## Workspaces

We're using the [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) feature set to manage the
packages. This means we have one `package-lock.json` file in the repo root.

`npm` should be called from the repo root as well.

To install modules for all packages:

```sh
npm install
```

To install a new package into pupparazzi:

```sh
npm install --save-dev --workspace pupparazzi vite@2.9.9
```

To run lint for pupparazzi:

```sh
npm run --workspace pupparazzi lint
```

To run lint for all packages (if they have a lint script):

```sh
npm run --workspaces --if-present lint
```

## Aligned versions

Aligning versions of dependencies is intended to reduce the burden of
maintenance, when we upgrade e.g. react versions, we can do all the challenges
at once. We can run `npm audit` and fix it in once place, etc. It was a big part
of the motivation for a monorepo.

Each challenge should have the same version string for any given package in
their `package.json`, e.g. if they have a dependency on `knex` it should be on
`^1.0.3`. These versions are listed in `tools/align-versions.js`

In order to see a list of versions that are not correctly aligned run:

```sh
npm run unaligned-versions
```

Based on the output of this script, you should update `tools/align-versions.js`
by choosing one of the versions, and then run:

```sh
npm run align-versions
```

(This is just an alias for `node tools/align-versions.js`)
