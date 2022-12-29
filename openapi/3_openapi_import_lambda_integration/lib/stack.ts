import * as cdk from 'aws-cdk-lib';
import {aws_lambda_nodejs, CfnOutput} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";
import {functions} from "./functions";

export class OpenapiImportLambdaIntegrationStack extends cdk.Stack {
    createFunctions = () => {
        functions.map(fn => {
            const aFunction = new aws_lambda_nodejs.NodejsFunction(this, fn.id, {
                entry: fn.handlerFilePath,
                handler: fn.handlerName
            })

            const functionUrl = aFunction.addFunctionUrl({
                authType: FunctionUrlAuthType.NONE
            })
            new CfnOutput(this, `${fn.id}Url`, {
                value: functionUrl.url
            })
        })
    }

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.createFunctions();
    }
}
