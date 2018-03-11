const surge = require('surge')

const deploySurge = config => new Promise(resolve => {
  process.env.SURGE_TOKEN = config.surgeToken
  process.env.SURGE_LOGIN = config.surgeLogin

  const deploy = surge().publish({
    postPublish: () => {
      resolve(config)
    }
  })

  deploy([
    config.folder,
    '--domain', config.domain
  ])
})

module.exports = { deploySurge }
