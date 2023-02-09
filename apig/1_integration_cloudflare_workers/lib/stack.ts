import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Cors, HttpIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
import {HttpMethod} from "aws-cdk-lib/aws-events";
import {CfnOutput} from "aws-cdk-lib";

export class IntegrationCloudflareWorkersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "workers-api", {
      defaultCorsPreflightOptions: {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: Cors.DEFAULT_HEADERS
      }
    })

    const hello = api.root.addResource("hello")
    hello.addMethod(HttpMethod.GET, new HttpIntegration('https://api-gateway-handler.harit.workers.dev/', {
      httpMethod: HttpMethod.GET,
      proxy: true
    }))
    new CfnOutput(this, "ApiUrl", {
      value: api.url
    })
  }
}
