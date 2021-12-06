import { Stack, StackProps } from 'aws-cdk-lib'
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import { IFunction } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

declare const backend: IFunction
export class SecretSantaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        new LambdaRestApi(this, 'SecretSantaApi', {
            handler: backend,
            proxy: false,
        })
    }
}
