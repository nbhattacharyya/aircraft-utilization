import { Config } from 'sst/node/config';
import * as unzipper from 'unzipper';
import { fetchLatestUploadedMonth, putS3File } from '../../helpers/s3';
import { Readable } from 'stream';

// S3 Naming Convention: bts-data/YYYY/MM/performance.csv

export const handler = async (event: any) => {
    const bucketName = process.env.BTS_DATA_BUCKET_NAME || '';
    const latest = await fetchLatestUploadedMonth(bucketName);
    const s3Key = `bts-data/${latest.year}/${latest.month.toString().padStart(2, '0')}/performance.csv`
    const bts_url = `${Config.BTS_DATA_URL}_${latest.year}_${latest.month}.zip`;

    const response = await fetch(bts_url);
    if (!response || !response.body) {
        throw new Error('Error fetching data from BTS');
    }

    // Convert the Web ReadableStream (response.body) to a Node.js Readable stream
    const nodeReadableStream = Readable.fromWeb(response.body as ReadableStream);

    // Process the zip file
    const zip = unzipper.Parse({ forceStream: true });
    nodeReadableStream.pipe(zip);

    let csvEntry: any;
    for await (const entry of zip) {
        if (entry.path.endsWith('.csv')) {
            csvEntry = entry;
            break;
        } else {
            entry.autodrain();
        }
    }
    if (!csvEntry) {
        throw new Error('No CSV file found in the zip archive.');
    }

    await putS3File(bucketName, s3Key, csvEntry);
    console.log(`Successfully uploaded ${s3Key} to ${bucketName}`);
}