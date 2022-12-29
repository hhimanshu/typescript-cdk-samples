import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {functions} from "./functions";
import {aws_lambda_nodejs, CfnOutput} from "aws-cdk-lib";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";

export class LambdaWithReposStack extends cdk.Stack {
    createFunctions = () => {
        functions.map(fn => {
            const aFunction = new aws_lambda_nodejs.NodejsFunction(this, fn.id, {
                entry: fn.handlerFilePath,
                handler: fn.handlerName,
            })

            // add environment variables if available
            if (fn.envVariables) {
                fn.envVariables.forEach(envVariable => aFunction.addEnvironment(envVariable.key, envVariable.value))
            }

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
        this.createFunctions()
    }
}
