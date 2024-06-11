# Big Sky Agents Standalone React Demo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Craco](https://craco.js.org/docs/getting-started/).

It's an example of how to make a standalone React app that uses the [Big Sky Agents NPM package](https://www.npmjs.com/package/@automattic/big-sky-agents).

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

See the Create React App section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for instructions on how to run in production.

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