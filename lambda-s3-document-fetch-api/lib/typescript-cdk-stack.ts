import * as cdk from 'aws-cdk-lib';
import {Tags} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Networking} from "./networking";
import {FakerApi} from "./apis/fakerApi";

export class TypescriptCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // const bucket = new aws_s3.Bucket(this, 'DocumentsBucket', {
        //     encryption: aws_s3.BucketEncryption.S3_MANAGED,
        // });
        //
        // new aws_s3_deployment.BucketDeployment(this, "DocumentsDeployment", {
        //     sources: [aws_s3_deployment.Source.asset(path.join(__dirname, '../', 'documents'))],
        //     destinationBucket: bucket,
        //     memoryLimit: 512
        // })
        //
        // new cdk.CfnOutput(this, "DocumentsBucketNameExport", {
        //     value: bucket.bucketName,
        //     exportName: "DocumentsBucketName"
        // })

        const networkingStack = new Networking(this, "NetworkingConstruct", {
            maxAzs: 2
        })
        Tags.of(networkingStack).add("Module", "Networking")

        /*const docsApi = new DocumentManagementAPI(this, "DocumentManagementAPI", {
            documentBucket: bucket
        });
        Tags.of(docsApi).add('Module', 'API')*/

        const fakeApi = new FakerApi(this, "FakerApi");
        Tags.of(fakeApi).add('Module', 'API')
    }
}
