import * as path from "path";
import * as dotenv from 'dotenv'
import {Construct} from "constructs";
import {aws_lambda_nodejs, CfnOutput} from "aws-cdk-lib";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";

dotenv.config();

type EnvVar = {
    key: string,
    value: string
}

type FunctionDefinition = {
    id: string,
    handlerFilePath: string,
    handlerName: string,
    envVariables?: EnvVar[];
}

export const functions: FunctionDefinition[] = [
    {
        id: 'FakerGetFullName',
        handlerFilePath: path.join(__dirname, '..', 'src', '1_faker', 'index.ts'),
        handlerName: 'handler'
    }, {
        id: 'AuraDbTotalNodes',
        handlerFilePath: path.join(__dirname, '..', 'src', '2_auradb', 'index.ts'),
        handlerName: 'handler',
        envVariables: [
            {key: 'uri', value: process.env.DB_URI as string},
            {key: 'user', value: process.env.DB_USER as string},
            {key: 'password', value: process.env.DB_PASSWD as string},
        ]
    }
]

export class Functions extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    create() {
        functions.map(fn => {
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
