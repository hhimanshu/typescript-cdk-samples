import * as cdk from 'aws-cdk-lib';
import {aws_lambda, CfnOutput, RemovalPolicy} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Code, Function, FunctionUrlAuthType, LayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaPrismaLayerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helperLayer = new LayerVersion(this, "HelperLayer", {
      code: Code.fromAsset(path.join(__dirname, "../src/layers/helper")),
      description: "Common helper utility",
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const fn = new aws_lambda.Function(this, "HelloFunction", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../lambda")),
      handler: "index.handler",
      layers: [helperLayer]
    })

    const fnUrl = fn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
    new CfnOutput(this, "helloFnUrl", {
      value: fnUrl.url
    })

    const dbLayer = new LayerVersion(this, "DBLayer", {
      code: Code.fromAsset(path.join(__dirname, "../src/layers/database")),
      description: "Database Layer",
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const getUsersFn = new Function(this, "GetUsersFunction", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, "../lambda")),
      handler: "db.handler",
      layers: [dbLayer]
    })

    const getUsersFnUrl = getUsersFn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
    new CfnOutput(this, "prismaFnUrl", {
      value: getUsersFnUrl.url
    })
  }
}
