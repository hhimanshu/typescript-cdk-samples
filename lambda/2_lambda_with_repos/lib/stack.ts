import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Functions} from "./functions";

export class LambdaWithReposStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const functions = new Functions(this, 'LambdaWithReposFunctions')
        functions.create();
    }
}
