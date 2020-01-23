import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import FirstWorkflow = require('../lib/first-workflow-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new FirstWorkflow.FirstWorkflowStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
