#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SecretSantaStack } from '../lib/secret-santa-stack';

const app = new cdk.App();
new SecretSantaStack(app, 'SecretSantaStack', {
  env: { region: 'ap-southeast-2' },
});