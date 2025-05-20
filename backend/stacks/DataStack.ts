import { StackContext } from "sst/constructs";
import * as sst from 'sst/constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export const DataStack = ({ stack, app }: StackContext) => {

    const btsDataBucketName = `${app.stage}-${app.name}-bts-data`;
    const fetchBtsDataBucketAccessPolicy = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['s3:*'],
    resources: [`arn:aws:s3:::${btsDataBucketName}`, `arn:aws:s3:::${btsDataBucketName}/*`],
  });

    const fetchRawBtsData = new sst.Function(stack, 'FetchRawBtsData', {
        functionName: `${app.stage}-${app.name}-fetch-raw-bts-data`,
        handler: 'services/brs-data/index.handler',
        timeout: '15 minutes',
        logRetention: 'one_month',
        tracing: 'active',
        environment: {
            BTS_DATA_BUCKET_NAME: btsDataBucketName
        }
    })

    fetchRawBtsData.addToRolePolicy(fetchBtsDataBucketAccessPolicy);
}