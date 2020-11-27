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

### CI important notes
1. Issue found with SASS - will only work on node 12.0 or greater.  As such Node Workflow only validates with Windows, MacOS & Ubuntu for Node version 12.0 or greater.
2. Ensuring Heroku uses 12.0 or greater during deployment by adding "engines" into package.json

