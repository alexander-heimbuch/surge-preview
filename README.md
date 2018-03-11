# surge-preview

Publish static assets to surge and sets a status to Github pull requests. Plays well with Drone, Circle or Travis CI.

## CI Usage

Install it as an CI step: `npm install surge-preview -g` or `yarn global add surge-preview` 

1. Create a [surge.sh](https://surge.sh) account and install surge on your local machine
2. Generate a [Github Personal Access Token](https://github.com/settings/tokens) that is scoped to `repo:status`
3. [Generate](https://surge.sh/help/integrating-with-travis-ci) a `SURGE_TOKEN` 
4. Set `SURGE_LOGIN`, `SURGE_TOKEN` and `GITHUB_TOKEN` in your CI environment
5. Add `surge-preview` to your CI yaml file, specify your folder and call it after your assets are generated within the CI

You can specify any parameter as an atribute:

```
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
```

__Notes__

1. `surge-preview` is desigend as an optional CI step and will always exist with status 0 to keep following CI steps running.  

2. In a CI environment don't add tokens or logins as direct parameters. Use CI environment to keep them as a secret.

## Remixes

Install and use it as a package dependency: `npm install surge-preview --save` or `yarn add surge-preview`

All steps are asynchronous and returning a promise. Have a look at `steps/` to require github and surge functionality.
