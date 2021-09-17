# rcmndr

collate.
recommend.
discover.
## what is rcmndr?
rcmndr (no vowels for hipster cred) is a social media app for sharing music recommendations, either as genuine suggestions or as proof of how cool you are.

## External documentation
* [Wireframes on Figma](https://www.figma.com/file/4nBKJh6rgLuEqbX054Zw1i/rcmndr?node-id=0%3A1) 
* [Sitemap on Miro](https://miro.com/app/board/o9J_lwh4UFA=/)
* [db diagram on dbdiagram.io](https://dbdiagram.io/d/6068e86cecb54e10c33e926f)

## Local installation steps:
Clone this repo

```js
cd rcmndr
npm install
npm run knex migrate:latest
npm run knex seed:run
cp server/.env.example server/.env
npm run dev 
```

The server will be running on http://localhost:3000.

## Task / feature management
Our tasks are all managed on a Github Project which you can [find here](https://github.com/Pohutukawa-2021/rcmndr/projects/1). There are four columns for each task
- *backlong* - the entry point for new issues
- *to do* - any card on here are ready to be worked on and can be picked up by any dev
- *in progress* - assign yourself to a card / task / issue and move it to this "doing" column so everyone knows it's in progress
- *Code review* - if your issue is ready for lead devs to review then create a PR and move it to this column
- *Done* - once your issue is done, a dev lead can move it here, it's now ready to ship :rocket:

## Branching strategy

### main branch
The ONLY branches that should be merged to main are the current dev branch (once all tests have passed) OR a hotfix (bug) branch.  This branch is what will be deployed to production. If you spot a bug in production sing out to a dev lead. They'll sort you out. We've protected this branch so in theory only the dev leads can push / merge to it.

### dev branch
This is the branch each of your features should be created from (checkout the dev branch then run `git checkout -b myNewBranchName`). NOTHING should be committed directly to dev. We've protected this branch so in theory only the dev leads can push / merge to it.

### feature branches
When starting on a new feature you need to branch off of the _dev_ branch (*NOT MAIN!!!*)

Features should be named something like `feature/addFriendToList`.  The first half (feature) let's folks know what kind of branch this is. A feature branch is in development and is not ready for deployment yet.  The second half is a descriptive name of the feature you are building.

### hotfix
A hotfix branch will happen if a bug is spotted in production. Only dev leads should create a hotfix branch. See them for more info. They follow the same naming convention as feature branches, something like `hotfix/usersCantLogIn`
