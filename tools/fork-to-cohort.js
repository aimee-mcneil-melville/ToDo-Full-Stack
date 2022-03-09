const dotenv = require('dotenv')
const https = require('https')
const { Buffer } = require('buffer')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const main = async () => {
    const [_0, _1, cohort, challengeName] = process.argv
    dotenv.config()
    const { GITHUB_ACCESS_TOKEN, GITHUB_USER } = process.env
    if (!(GITHUB_ACCESS_TOKEN && GITHUB_USER)) {
        throw new Error(`GITHUB_ACCESS_TOKEN or GITHUB_USER undefined`)
    }

    console.log({ _0, _1, cohort, challengeName })

    return;
    await createRepo(cohort, challengeName)
    await pushToRepo(cohort, challengeName)
}

const pushToRepo = async (cohort, challengeName) => {
    await exec(
        `git subtree push --prefix=packages/${challengeName} git@github.com:${cohort}/${challengeName} main`
    )
}

const createRepo = (org, name) =>
    new Promise((resolve, reject) => {
        const { GITHUB_ACCESS_TOKEN, GITHUB_USER } = process.env
        const authString = `${GITHUB_USER}:${GITHUB_ACCESS_TOKEN}`
        const authBlob = Buffer.from(authString)
        const authBase64 = authBlob.toString('base64')

        const options = {
            hostname: 'api.github.com',
            path: `/orgs/${org}/repos`,
            port: 443,
            method: 'POST',
            headers: {
                'User-Agent': 'fork-to-cohort',
                Authorization: `Basic ${authBase64}`,
                'Content-Type': 'application/json',
            },
        }

        const req = https.request(options, (res) => {
            if (res.statusCode === 201) {
                resolve()
            } else {
                reject(res.statusCode)
            }
        })

        req.on('error', (e) => {
            reject(e)
        })

        req.end(JSON.stringify({ name }), 'utf8')
    })

main().catch((e) => {
    console.error(`fork-to-cohort failed`)
    console.error(e)
    process.exitCode = 1
})
