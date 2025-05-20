import { RemovalPolicy } from "aws-cdk-lib/core";
import { StackContext } from "sst/constructs";
import * as sst from 'sst/constructs';

export const BucketsStack = ({ stack, app }: StackContext) => {

    const btsDataBucket = new sst.Bucket(stack, 'BtsDataBucket', {
        name: `${app.stage}-${app.name}-bts-data`,
        cors: [
            {
                allowedHeaders: ['*'],
                allowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
                allowedOrigins: ['*'],
                exposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2', 'ETag'],
                maxAge: '3000 seconds',
            },
        ],
        cdk: {
            bucket: {
                autoDeleteObjects: true,
                removalPolicy: RemovalPolicy.DESTROY,
                blockPublicAccess: {
                    blockPublicAcls: false,
                    ignorePublicAcls: false,
                    blockPublicPolicy: true,
                    restrictPublicBuckets: true,
                },
            }
        }
    });

    return {
        btsDataBucket
    }
}