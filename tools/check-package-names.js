const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const path = require('path');

const challenges = require('./challenges-list')

const main = async () => {
  for (const challenge of challenges) {
    try {
      const packagePath = path.join(__dirname, '..', 'packages', challenge, 'package.json');
      const packageJson = await fs.readFile(packagePath, 'utf8')
      const package = JSON.parse(packageJson)

      if (package.name !== challenge) {
        console.log(`correcting ${challenge}'s package.name from ${package.name}`)
        const newJson = JSON.stringify({ ...package, name: challenge }, null, 2);
        await fs.writeFile(packagePath, newJson, 'utf8');
      }
    } catch (e) {
      console.error(`check-package-names: ${e}`);
    }
  }
}

main().catch(e => {
  console.error(`check-package-names: ${e}`);
  process.exitCode = 1;
})