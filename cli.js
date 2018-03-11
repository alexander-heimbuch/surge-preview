#! /usr/bin/env node
'use strict'

const chalk = require('chalk')
const meow = require('meow')

const { createConfig, verifyConfig } = require('./steps/config')
const { deploySurge } = require('./steps/surge')
const { updateGithubStatus } = require('./steps/github')

const cli = meow(
  `
    Usage
      $ surge-preview <folder> [options]

    Inputs
      <folder>       Folder to be published, defaults to './dist'

    Options
      --domain       domain to publish, defaults to '#sha.surge.sh'
      --surge-login  surge login, defaults to 'env.SURGE_LOGIN'
      --surge-token  surge token, defaults to 'env.SURGE_TOKEN'
      --hash         commit hash, defaults to CI env
      --github-token Github Token, defaults to 'env.GITHUB_TOKEN'
      --repo         Github repository, defaults to CI env

`,
  {
    flags: {
      domain: {
        type: 'string'
      },
      surgeLogin: {
        type: 'string'
      },
      surgeToken: {
        type: 'string'
      },
      hash: {
        type: 'string'
      },
      githubToken: {
        type: 'string'
      },
      repo: {
        type: 'string'
      }
    }
  }
)

const [ folder ] = cli.input

createConfig({
  folder,
  ...cli.flags
})
.then(verifyConfig)
.then(deploySurge)
.then(updateGithubStatus)
.then(config => {
  console.log(`
  ${chalk.green.underline('Surge Preview Deployment')}
  ${chalk.gray('Repo:  ')} ${chalk.yellow(config.repo)}
  ${chalk.gray('Commit:')} ${chalk.yellow(config.hash)}
  ${chalk.gray('Folder:')} ${chalk.yellow(config.folder)}
  ${chalk.gray('Domain:')} ${chalk.yellow(config.domain)}
  `)

  process.exit(0)
})
.catch(err => {
  console.warn(chalk.yellow(err))
  process.exit(0)
})
