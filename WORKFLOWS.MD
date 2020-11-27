# Gardenz Github Actions Workflows

> Documentation of GitHub Actions Workflows implemented to date

## CI portion:

### CI Actions taken

1. Test implementation of GitHub actions by implementing Super-Linter
2. Re work "Super-Linter" Workflow to implement "Node.js CI" to run node and relevant commands including EDA linting
3. Disable "Super-Linter" Workflow as no longer required
4. Add in test execution commands into "Node.js CI" Workflow
5. Verify Playwright E2E test executions via listening to "navigation" branch
6. Revert "Node.js CI" branch to listen to "main"
7. Add in Workflow badges to README file.

### CI Actions taken to deploy to Heroku:

1. Create a blank Heroku app, do not link to github repo.
2. Obtain API key from your user account.
3. We flailed wildly.
4. Began to research 'jobs' and 'needs' (github actions documentation).
5. Added names to jobs so that we are able to watch what is running.
6. Added a deployment job to our workflow.
7. The deployment job needs the linting and tests to pass.
8. Created github secrets to add our Heroku API key, app name, & email.
9. Added secrets by using ${{secrets.HEROKU_API_KEY}} etc.
10. We tested a deployment by removing the test:e2e script.
11. Successfully deployed.

### CI important notes

1. Issue found with SASS - will only work on node 12.0 or greater. As such Node Workflow only validates with Windows, MacOS & Ubuntu for Node version 12.0 or greater.
2. Ensuring Heroku uses 12.0 or greater during deployment by adding "engines" into package.json
