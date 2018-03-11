const github = require('octonode')

const updateGithubStatus = config => new Promise((resolve, reject) => {
  const client = github.client(config.githubToken)
  const repo = client.repo(config.repo)

  repo.status(config.hash,
    {
      state: 'success',
      target_url: config.domain,
      description: 'Preview Deployment',
      context: 'surge/preview'
    },
    (err, result) => {
      if (err) {
        return reject(JSON.stringify({error: err, payload: result}))
      }

      resolve(config)
    }
  )
})

module.exports = { updateGithubStatus }
