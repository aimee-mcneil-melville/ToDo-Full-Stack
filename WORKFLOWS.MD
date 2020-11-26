# Gardenz Github Actions Workflows

> Documentation of GitHub Actions Workflows implemented to date

## CI portion:
### CI Actions taken
1. Test implementation of GitHub actions by implementing Super-Linter
2. Re work Super-Linter to implement Node and call EDA linter
3. Disable Super-Linter as no longer required

### CI mportant notes
1. Issue found with SASS - will only work on node 12.0 or greater.  As such Node Workflow only validates with Windows, MacOS & Ubuntu for Node version 12.0 or greater.
2. Ensuring Heroku uses 12.0 or greater during deployment by adding "engines" into package.json
