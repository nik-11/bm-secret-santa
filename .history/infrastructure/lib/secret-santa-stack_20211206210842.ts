import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

declare const backend: IFunction;
export class SecretSantaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new LambdaRestApi(this, 'SecretSantaApi', {
      handler: backend,
      proxy: false,
    });

    const authLambda = new NodejsFunction(this, 'AuthLambda');

    const login = api.root.addResource('login');
    login.addMethod('POST');

    const complete = api.root.addResource('complete');
    complete.addMethod('POST');

    const loginLambda = 
  }
}
