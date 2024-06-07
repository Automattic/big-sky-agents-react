# Big Sky Agents Standalone React Demo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Craco](https://craco.js.org/docs/getting-started/).

It's an example of how to make a standalone React app that uses the [Big Sky Agents NPM package](https://github.com/Automattic/big-sky-agents).

## Prerequisite: Authenticating to Github package registry

Because the `@automattic/big-sky-agents` package is published [privately on Github](https://github.com/Automattic/big-sky-agents/pkgs/npm/big-sky-agents), you will need to perform the following steps before you can npm-install it in this project:

1. Create a Github [Personal Access Token](https://github.com/settings/tokens). Be sure to select a "Classic" token, not a fine-grained one. Select "No Expiration" unless you want your dev environment to break by surprise in the future.

2. Select at least the "read:packages" scope. If you want to use this token to publish the package, then also select the "write:packages" scope.

3. Log into NPM on the command line:

```bash
npm login --scope=@automattic --auth-type=legacy --registry=https://npm.pkg.github.com
Username: yourgithubusername
Password: # a spinner will appear here, just paste your token
```

Now, `npm install` should work.

## Getting started

```bash
npm install
npm start
```

To test:

```bash
npm test
```

To build the app:

```bash
npm run build
```

To set the default OpenAI API key, put this in `.env`. It is important to include the `REACT_APP_` prefix for the variable to be picked up by Create React App:

```bash
REACT_APP_OPENAI_API_KEY=sk-...
```

See the Create React App section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Developing against a live version of the Big Sky Agents package

```bash
git clone git@github.com:Automattic/big-sky-agents.git
cd big-sky-agents
npm install
npm link
npm run dev # this will continuously build the package
```

Then, in this project:

```bash
npm install
npm link @automattic/big-sky-agents
npm start # this will launch the app on http://localhost:3000
```