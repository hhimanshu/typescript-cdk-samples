import {Construct} from 'constructs';
import {aws_iam, aws_lambda, aws_lambda_nodejs, aws_s3, CfnOutput, Duration} from "aws-cdk-lib";
import {Runtime} from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import {HttpLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as apigw2 from "@aws-cdk/aws-apigatewayv2-alpha";
import {CorsHttpMethod, HttpMethod} from "@aws-cdk/aws-apigatewayv2-alpha";

interface DocumentManagementAPIProps {
    documentBucket: aws_s3.IBucket
}

export class DocumentManagementAPI extends Construct {
    constructor(scope: Construct, id: string, props: DocumentManagementAPIProps) {
        super(scope, id);

        const getDocumentsFunction = new aws_lambda_nodejs.NodejsFunction(this, "GetDocumentsFunction", {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '..', '..', 'src', 'functions', 'getDocuments', 'functions.ts'),
            handler: 'getDocuments',
            bundling: {
                externalModules: [
                    'aws-sdk'
                ],
            },
            environment: {
                DOCUMENTS_BUCKET_NAME: props.documentBucket.bucketName
            }
        })

        const bucketPermissions = new aws_iam.PolicyStatement();
        bucketPermissions.addResources(`${props.documentBucket.bucketArn}/*`);
        bucketPermissions.addActions('s3:GetObject', 's3:PutObject');
        getDocumentsFunction.addToRolePolicy(bucketPermissions);

        const bucketContainerPermissions = new aws_iam.PolicyStatement();
        bucketContainerPermissions.addResources(props.documentBucket.bucketArn);
        bucketContainerPermissions.addActions('s3:ListBucket');
        getDocumentsFunction.addToRolePolicy(bucketContainerPermissions);

        const integration = new HttpLambdaIntegration('DocumentsManagementIntegration', getDocumentsFunction);

        const httpApi = new apigw2.HttpApi(this, 'HttpApi', {
            apiName: 'document-management-api',
            createDefaultStage: true,
            corsPreflight: {
                allowMethods: [CorsHttpMethod.GET],
                allowOrigins: ['*'],
                maxAge: Duration.days(10)
            }
        });

        httpApi.addRoutes({
            path: '/documents',
            methods: [HttpMethod.GET],
            integration: integration
        })

        new CfnOutput(this, 'API Endpoint', {
            value: httpApi.url!
        })
    }
}
