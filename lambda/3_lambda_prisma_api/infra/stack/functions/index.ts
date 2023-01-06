import {Construct} from "constructs";
import {aws_lambda_nodejs, CfnOutput} from "aws-cdk-lib";
import * as path from "path";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";

export class Functions extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const helloFn = new aws_lambda_nodejs.NodejsFunction(this, "HelloFn", {
            //entry: path.join(__dirname, "..", "..", "..", "app", "src", "functions", "hello.ts"),
            entry: path.join(__dirname, "hello", "index.ts"),
            handler: "handler",
        })

        helloFn.addEnvironment("DATABASE_URL", "file:./dev.db")

        const helloFnUrl = helloFn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})

        new CfnOutput(this, "helloFunctionUrl", {
            value: helloFnUrl.url
        })

        const getAllUsersFn = new aws_lambda_nodejs.NodejsFunction(this, 'GetAllUsersFn', {
            entry: path.join(__dirname, "users", "get-all-users.ts"),
            handler: "handler"
        })
        getAllUsersFn.addEnvironment("DATABASE_URL", "file:./dev.db")
        const getAllUserFnUrl = getAllUsersFn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
        new CfnOutput(this, 'getAllUsersFnUrl', {value: getAllUserFnUrl.url})
    }
}

