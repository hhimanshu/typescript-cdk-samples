import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Api, HttpIntegration} from "@alma-cdk/openapix";
import * as path from "path";

export class OpenapiImportAllIntegrationsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Api(this, 'OpeAPIAllIntegration', {
      source: path.join(__dirname, "..", "assets", "openapi.yaml"),
      paths: {
        '/products/{id}': {
          get: new HttpIntegration(this, 'https://dummyjson.com/products', {
            httpMethod: 'GET'
          })
        }
      }
    })
  }
}
