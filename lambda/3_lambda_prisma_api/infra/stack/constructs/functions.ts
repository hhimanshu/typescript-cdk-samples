import {Construct} from "constructs";
import {aws_lambda_nodejs, CfnOutput} from "aws-cdk-lib";
import * as path from "path";
import {FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";

interface FunctionsProps {
    db: DatabaseInstance
}

export class Functions extends Construct {
    constructor(scope: Construct, id: string, props: FunctionsProps) {
        super(scope, id);

        const functionsDir = path.join(__dirname, "..", "functions")

        const helloFn = new aws_lambda_nodejs.NodejsFunction(this, "HelloFn", {
            entry: path.join(functionsDir, "hello", "index.ts"),
            handler: "handler",
        })

        helloFn.addEnvironment("DATABASE_URL", "file:./dev.db")

        const helloFnUrl = helloFn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})

        new CfnOutput(this, "helloFunctionUrl", {
            value: helloFnUrl.url
        })

        const getAllUsersFn = new aws_lambda_nodejs.NodejsFunction(this, 'GetAllUsersFn', {
            entry: path.join(functionsDir, "users", "get-all-users.ts"),
            handler: "handler"
        })
        const dbSecret = props.db.secret;
        dbSecret?.grantRead(getAllUsersFn)
        const host = dbSecret?.secretValueFromJson("host").unsafeUnwrap();
        const port = dbSecret?.secretValueFromJson("port").unsafeUnwrap();
        const engine = dbSecret?.secretValueFromJson("engine").unsafeUnwrap();
        const user = dbSecret?.secretValueFromJson("username").unsafeUnwrap();
        const password = dbSecret?.secretValueFromJson("password").unsafeUnwrap();
        const db = dbSecret?.secretValueFromJson("dbname").unsafeUnwrap();

        const DATABASE_URL = `${engine}://${user}:${password}@${host}:${port}/${db}?schema=${db}&connection_limit=1`
        console.log({DATABASE_URL})

        for (const envVar in [host, port, engine, user, password]) {
            getAllUsersFn.addEnvironment("DATABASE_URL", DATABASE_URL)
        }

        const getAllUserFnUrl = getAllUsersFn.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
        new CfnOutput(this, 'getAllUsersFnUrl', {value: getAllUserFnUrl.url})
    }
}

