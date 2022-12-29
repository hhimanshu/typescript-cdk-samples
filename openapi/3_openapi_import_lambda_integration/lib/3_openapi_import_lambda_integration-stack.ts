import * as cdk from 'aws-cdk-lib';
import {aws_lambda_nodejs, CfnOutput} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as path from "path";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";

export class OpenapiImportLambdaIntegrationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const helloWorldSimpleFn = new aws_lambda_nodejs.NodejsFunction(this, "HelloWorldSimple", {
            entry: path.join(__dirname, '..', 'src', 'functions', '1_helloworld', 'index.ts'),
            handler: 'handler'
        })

        const hwFnUrl = helloWorldSimpleFn.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE
        })
        new CfnOutput(this, 'HelloWordSimpleFnUrl', {
            value: hwFnUrl.url
        })
    }
}
