import { Stack, StackProps } from 'aws-cdk-lib';
import {
  LambdaRestApi,
  MockIntegration,
  PassthroughBehavior,
  TokenAuthorizer,
} from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SecretSantaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const backendLambda = new NodejsFunction(this, 'backend', {
      handler: 'handler',
      environment: {
        CODE: process.env.CODE!,
        WALLET: process.env.WALLET!,
        API_KEY: process.env.API_KEY!,
        API_KEY_SECRET: process.env.API_KEY_SECRET!,
      },
    });
    const api = new LambdaRestApi(this, 'SecretSantaApi', {
      handler: backendLambda,
      proxy: false,
    });

    const authLambda = new NodejsFunction(this, 'auth', {
      handler: 'handler',
    });
    const auth = new TokenAuthorizer(this, 'SecretSantaAuthorizer', {
      handler: authLambda,
    });

    const methodResponses = [
      {
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
          'method.response.header.Access-Control-Allow-Headers': true,
          'method.response.header.Access-Control-Allow-Methods': true,
        },
      },
    ];
    const integrationResponses = [
      {
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Headers':
            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,x-api-key'",
          'method.response.header.Access-Control-Allow-Origin': "'*'",
          'method.response.header.Access-Control-Allow-Methods':
            "'OPTIONS,POST'",
        },
      },
    ];
    const requestTemplates = { 'application/json': '{ "statusCode": 200 }' };
    const login = api.root.addResource('login');
    login.addMethod('POST', undefined, {
      authorizer: auth,
      methodResponses,
    });
    login.addMethod(
      'OPTIONS',
      new MockIntegration({
        integrationResponses,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
        requestTemplates,
      }),
      {
        methodResponses,
      }
    );

    const complete = api.root.addResource('complete');
    complete.addMethod('POST', undefined, {
      authorizer: auth,
      methodResponses,
    });
    complete.addMethod(
      'OPTIONS',
      new MockIntegration({
        integrationResponses,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
        requestTemplates,
      }),
      {
        methodResponses,
      }
    );

    const websiteBucket = new Bucket(this, 'SecretSantaBucket', {
      bucketName: 'versent-secret-santa-site',
    });
  }
}
