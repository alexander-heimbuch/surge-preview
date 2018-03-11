const { get } = require('lodash')
const { repo, sha } = require('ci-env')

const createConfig = config => new Promise(resolve => {
  resolve({
    folder: get(config, 'folder', './dist'),
    domain: get(config, 'domain', `http://${sha}.surge.sh`),
    surgeToken: get(config, 'surgeToken', process.env.SURGE_TOKEN),
    surgeLogin: get(config, 'surgeLogin', process.env.SURGE_LOGIN),
    githubToken: get(config, 'githubToken', process.env.GITHUB_TOKEN),
    repo: get(config, 'repo', repo),
    hash: get(config, 'hash', sha)
  })
})

const verifyConfig = config => {
  const requiredFields = {
    'folder': 'Missing folder, ensure that it is provided as a parameter',
    'domain': 'Missing domain, ensure that it is provided as a parameter',
    'repo': 'Missing repo, ensure that is set in environment or provided as a parameter',
    'surgeToken': 'Missing SURGE_TOKEN, ensure that is set in environment or provided as a parameter value',
    'surgeLogin': 'Missing SURGE_LOGIN, ensure that is set in environment or provided as a parameter value',
    'githubToken': 'Missing GITHUB_TOKEN, ensure that is set in environment or provided as a parameter value',
    'hash': 'Missing commit sha, ensure that is set in environment or provided as a parameter value'
  }

  Object.keys(requiredFields).map(field => {
    const value = get(config, field, undefined)

    if (value === undefined) {
      throw new Error(requiredFields[field])
    }
  })

  return config
}

module.exports = { createConfig, verifyConfig }
