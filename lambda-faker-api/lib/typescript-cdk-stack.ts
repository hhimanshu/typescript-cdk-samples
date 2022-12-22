import * as cdk from 'aws-cdk-lib';
import {Tags} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Networking} from "./networking";
import {FakerApi} from "./apis/fakerApi";

export class TypescriptCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const networkingStack = new Networking(this, "NetworkingConstruct", {
            maxAzs: 2
        })
        Tags.of(networkingStack).add("Module", "Networking")

        const fakeApi = new FakerApi(this, "FakerApi");
        Tags.of(fakeApi).add('Module', 'API')
    }
}
