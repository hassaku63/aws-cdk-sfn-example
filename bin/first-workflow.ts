#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FirstWorkflowStack } from '../lib/first-workflow-stack';

const app = new cdk.App();
new FirstWorkflowStack(app, 'FirstWorkflowStack');
