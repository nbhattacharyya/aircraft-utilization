import * as AWS from 'aws-sdk';
import csvV2 from 'csv-parser';
import { Readable } from 'stream';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as csv from '@fast-csv/parse';

const s3Client = new S3Client({});

const s3 = new AWS.S3();

export const putS3File = async (bucket: string, key: string, body: any): Promise<any> => {
  try {
    return s3
      .putObject({
        Bucket: bucket,
        Key: key,
        Body: body,
      })
      .promise();
  } catch (err) {
    console.error('File Error: ' + (err as any).message);
    return Promise.resolve(null);
  }
};

export const listS3Objects = async (bucket: string) => {
    try {
        return s3.listObjectsV2({
            Bucket: bucket,
            Prefix: 'bts-data/'
        })
        .promise();
    } catch (err) {
        console.error('List Error: ' + (err as any).message);
        return Promise.resolve(null);
    }
}

export const fetchLatestUploadedMonth = async (bucket: string) => {
    const s3Objects = await listS3Objects(bucket);
    const keys = s3Objects?.Contents?.map((obj: any) => obj.Key ?? '') ?? [];
    const matches = keys.map((key: string) => key.match(/bts-data\/(\d{4})\/(\d{2})\//))
                        .filter(Boolean) as RegExpMatchArray[];
    const sorted = matches.map((m: any) => ({ year: parseInt(m[1]), month: parseInt(m[2])}))
                            .sort((a: any, b: any) => (a.year - b.year) || (a.month - b.month));
    const latest = sorted[sorted.length - 1];
    return latest.month === 12 ? { year: latest.year + 1, month: 1 } : { year: latest.year, month: latest.month + 1 };
}