import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Api, HttpIntegration} from "@alma-cdk/openapix";
import * as path from "path";

export class OpenapiImportHttpIntegrationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new Api(this, 'OpeAPIAllIntegration', {
            source: path.join(__dirname, "..", "assets", "openapi.yaml"),
            paths: {
                '/products': {
                    get: new HttpIntegration(this, 'https://dummyjson.com/products', {
                        httpMethod: 'GET'
                    })
                },
                '/products/{productId}': {
                    get: new HttpIntegration(this, 'https://dummyjson.com/products/{productId}', {
                        httpMethod: 'GET',
                        options: {
                            requestParameters: {
                                'integration.request.path.productId': 'method.request.path.productId'
                            }
                        }
                    }),
                    delete: new HttpIntegration(this, 'https://dummyjson.com/products/{productId}', {
                        httpMethod: 'DELETE',
                        options: {
                            requestParameters: {
                                'integration.request.path.productId': 'method.request.path.productId'
                            }
                        }
                    }),
                }
            }
        })
    }
}
