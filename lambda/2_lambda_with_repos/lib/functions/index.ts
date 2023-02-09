import {Construct} from "constructs";
import {aws_lambda_nodejs, CfnOutput} from "aws-cdk-lib";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";
import {functionDefinitions} from "./allFunctions";

export class Functions extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    create() {
        functionDefinitions.map(fn => {
            const aFunction = new aws_lambda_nodejs.NodejsFunction(this, fn.id, {
                entry: fn.handlerFilePath,
                handler: fn.handlerName,
            })

            // add environment variables if available
            if (fn.envVariables) {
                fn.envVariables.forEach(envVariable => {
                    aFunction.addEnvironment(envVariable.key, envVariable.value)
                })
            }

            const functionUrl = aFunction.addFunctionUrl({
                authType: FunctionUrlAuthType.NONE
            })
            new CfnOutput(this, `${fn.id}Url`, {
                value: functionUrl.url
            })
        })
    }
}
