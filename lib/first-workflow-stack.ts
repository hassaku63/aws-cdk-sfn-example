import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import sfn = require('@aws-cdk/aws-stepfunctions');
import tasks = require('@aws-cdk/aws-stepfunctions-tasks');


export class FirstWorkflowStack extends cdk.Stack {
  stateMachine: sfn.StateMachine;
  helloFunction: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // StateMachineで実行するLambda Functionの定義
    const helloFunction = new lambda.Function(this, 'firstWorkflowHelloFunction', {
      functionName: 'first-workflow-hello',
      code: lambda.Code.fromAsset('functions/hello', {
        exclude: ['*.ts']
      }),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(30)
    });

    // StateMachineを構成する各Stateの定義
    // const helloTask = new tasks.RunLambdaTask(helloFunction)
    const helloTask = new sfn.Task(this, 'helloTask', {
      task: new tasks.InvokeFunction(helloFunction)
    })
    const dummyTask = new sfn.Pass(this, 'dummyTask')
    const successState = new sfn.Succeed(this, 'successState')

    // 各Stateをつなぎ合わせる
    // CDKでは、ASLのJSONを記述する代わりにStateのメソッドチェーンによって状態遷移のフローを記述する
    const workflow = helloTask
      .next(dummyTask)
      .next(successState);

    // StateMachineの定義
    this.stateMachine = new sfn.StateMachine(this, 'firstStateMachine', {
      stateMachineName: 'first-state-machine',
      definition: workflow
    });
  }
}
