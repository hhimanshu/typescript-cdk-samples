import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Api, InternalIntegrationType, MockIntegration} from "@alma-cdk/openapix";
import * as path from "path";

export class OpenapiImportMockIntegrationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new Api(this, 'PetStoryMockApi', {
            source: path.join(__dirname, '..', 'assets', 'openapi.yaml'),
            paths: {
                '/pets': {
                    get: new MockIntegration({
                        requestTemplates: {
                            "application/json": JSON.stringify({statusCode: 200})
                        },
                        integrationResponses: [
                            {statusCode: '200'}
                        ]
                    }),
                    post: new MockIntegration({
                        requestTemplates: {
                            "application/json": JSON.stringify({statusCode: 200})
                        },
                        integrationResponses: [
                            {statusCode: '201'}
                        ]
                    })
                },
                '/pets/{petId}': {
                    get: new MockIntegration({
                        requestTemplates: {
                            "application/json": JSON.stringify({statusCode: 200})
                        },
                        integrationResponses: [
                            { statusCode: '200' }
                        ]
                    })
                }
            }
        })
    }
}
