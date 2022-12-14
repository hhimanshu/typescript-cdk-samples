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

## OpenAPI Spec
This has been take from [here](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml)

## APIs
```shell
curl -v -H "Content-Type:application/json" https://luafd1kyc8.execute-api.us-east-1.amazonaws.com/prod/pets/hello
curl -XPOST -v -H "Content-Type:application/json" https://luafd1kyc8.execute-api.us-east-1.amazonaws.com/prod/pets/
curl -XPOST -d'{}' -v -H "Content-Type:application/json" https://luafd1kyc8.execute-api.us-east-1.amazonaws.com/prod/pets/
```
