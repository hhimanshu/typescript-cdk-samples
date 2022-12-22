import {Construct} from 'constructs';
import {aws_lambda, CfnOutput, Duration} from "aws-cdk-lib";
import * as path from 'path';
import {HttpLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as apigw2 from "@aws-cdk/aws-apigatewayv2-alpha";
import {CorsHttpMethod, HttpMethod} from "@aws-cdk/aws-apigatewayv2-alpha";
import {Platform} from "aws-cdk-lib/aws-ecr-assets";

interface FakerAPIProps {
}

export class FakerApi extends Construct {
    constructor(scope: Construct, id: string, props?: FakerAPIProps) {
        super(scope, id);

        const fakeFunction = new aws_lambda.DockerImageFunction(this, 'FakerFunction', {
            code: aws_lambda.DockerImageCode.fromImageAsset(
                path.join(__dirname, '..', '..', 'src', 'functions', 'fakedata'),
                {
                    platform: Platform.LINUX_AMD64
                }
            ),
        });

        const integration = new HttpLambdaIntegration('FakerIntegration', fakeFunction);
        const httpApi = new apigw2.HttpApi(this, 'HttpApi', {
            apiName: 'fake-api',
            createDefaultStage: true,
            corsPreflight: {
                allowMethods: [CorsHttpMethod.GET],
                allowOrigins: ['*'],
                maxAge: Duration.days(10)
            }
        });

        httpApi.addRoutes({
            path: '/fake',
            methods: [HttpMethod.GET],
            integration: integration
        })

        new CfnOutput(this, 'API Endpoint', {
            value: httpApi.url!
        })
    }
}
