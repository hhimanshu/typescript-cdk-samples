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
1. Create functions as npm repositories.
2. Does not integrate with API Gateway.
3. Creates a Function URL to be accessed over internet without authentication.

## How to run?
- `cdk deploy` to deploy the app
- `cdk destroy` to destroy the app

## How to test Lambda functions locally?
- You must have [`SAM CLI`](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed
- From your project root run the following command
```shell
cdk synth
```
This creates the CloudFormation template in a directory called `cdk.out`. Depending on how many stacks you have, you will find multiple `<stackname>.template.json`.
> Remember to call this command every time you make changes in your stack to generate the latest template.json file

For example
```shell
ls cdk.out 
LambdaWithReposStack.assets.json
LambdaWithReposStack.template.json
asset.04e09d747289f3f525284c2892a3f2a173b721ec88eea5968677f182441cff67
cdk.out
manifest.json
tree.json
```
Here there is one `.template.json` file called `LambdaWithReposStack.template.json`, where `LambdaWithReposStack` is the `id` of the stack.

- In order to invoke a lambda function locally, you need 2 things
    - template json file path, that you found out in the previous step
    - `id` of the lambda function, that you defined when creating a function.
      With that you can invoke the function as defined below for 2 different lambda functions
```shell
cdk synth && sam local invoke -t cdk.out/LambdaWithReposStack.template.json FakerGetFullName
cdk synth && sam local invoke -t cdk.out/LambdaWithReposStack.template.json AuraDbTotalNodes    
```
If the call is successful, you should see the output from your lambda function on your console.
> Here, using `cdk synth` before invoking ensures that the latest template.json file will always be available.

## Resources
[Locally testing AWS CDK applications](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk-testing.html)
