# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## Features
1. Does not create handler as a repo. The function code resides in a single file inside a directory.
2. Does not integrate with API Gateway.
3. Creates a Function URL to be accessed over internet without authentication.

## How to run?
- `cdk deploy` to deploy the app
- `cdk destroy` to destroy the app