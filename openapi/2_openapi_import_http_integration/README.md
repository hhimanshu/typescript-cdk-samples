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

## OpenApi Spec
This is a hand-written spec and is available [here](./assets/openapi.yaml)

## HTTP API
This project leverages external API hosted on [dummyjson](https://dummyjson.com/docs/products)

### DELETE a Product
```shell
curl -v -XDELETE https://ngx8lylaok.execute-api.us-east-1.amazonaws.com/prod/products/1
```
where `https://ngx8lylaok.execute-api.us-east-1.amazonaws.com/prod` is your API endpoint that you get after running `cdk deploy` command.

returns the following data
```json5
{"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]}
```

### CREATE a Product
```shell
curl -v -XPOST -d"{title: 'BMW Pencil'}" https://ngx8lylaok.execute-api.us-east-1.amazonaws.com/prod/products/add
```
where `https://ngx8lylaok.execute-api.us-east-1.amazonaws.com/prod` is your API endpoint that you get after running `cdk deploy` command.

returns the following data
```json5
{"id":101}
```

## Resources
- [How to map/forward inputs to HTTP Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#input-variable-reference)