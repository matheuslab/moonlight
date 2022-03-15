# Moonlight - Serverless AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from
the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/)
.

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)` or superior, and npm `(v.8.1.4)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

- Run `npm i` to install the project dependencies
- Run `npm run sls:deploy:dev` to deploy this stack to AWS on dev environment. You need to be logged locally on aws
  using `aws_login` script, from `dev_setup` repository.

> **WARNING**: If there is other developers deploying to the same environment,
> their serverless config file **will overwrite** the old ones, so it may change or delete
> your lambda in there!

### Locally

In order to test lambda functions locally, run the following command:

- `npx sls invoke local -f <function-name> --path <inputFunctionMock>`

Check
the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/)
for more information.

## Moonlight features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `database` - containing database configuration code
- `handlers` - containing code base and configuration for lambda functions
- `models` - containing models of postgres database
- `modules` = containing several modules shared between lambdas
- `types` - containing interfaces and general types

```
├── src
│   ├── handlers                # Lambda source code
│   │
│   ├── models                  # Postgres database models
│   │
│   ├── database                # Database configuration
│   │
│   └── modules                 # Lambda shared code
│   │    └── requests           # General equests
│   │    └── parsers            # All parsers used on code
│   │    └── helpers.ts         # Code helpers
│   │
│   └── types                   # Interfaces and general types
│   │
│   └── config.ts               # Shared config code
│
├── tests
│   ├── __fixtures__            # Fixtures folder
│   │
│   ├── handlers                # Lambda tests folder
│   │
│   └── modules                 # Modules tests folder
│
│
├── package.json
├── serverless.ts               # Serverless service file
└── tsconfig.json               # Typescript compiler configuration
```

### 3rd party libraries

- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for
  your `serverless.ts` service file
