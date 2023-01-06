import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Network} from "./constructs/network";
import {Functions} from "./functions";

export class InfraStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const network = new Network(this, "PrismaVpcId")
        const functions = new Functions(this, "PrismaFunctions")
    }


}
