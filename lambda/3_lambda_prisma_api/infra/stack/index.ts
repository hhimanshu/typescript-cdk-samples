import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Network} from "./constructs/network";
import {Functions} from "./constructs/functions";
import {Database} from "./constructs/database";

export class InfraStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const network = new Network(this, "PrismaVpcId")

        const dbInstance = new Database(this, "PrismaDB", {
            vpc: network.vpc,
            dbUser: "postgres"
        })
        const functions = new Functions(this, "PrismaFunctions", {db: dbInstance.db})
    }
}
