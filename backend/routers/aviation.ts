import { router, publicProcedure } from '../trpc/trpc';
import { handleError } from '../helpers/error-handler';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { fetchFlightsSchema } from '../helpers/input-schema';
import { Config } from 'sst/node/config';

const lambda = new LambdaClient({ region: 'us-east-2' });

export const AviationRouters = router({
    fetchFlights: publicProcedure.input(fetchFlightsSchema).mutation(async ({ input, ctx}) => {
        try {
            const bts_url = `${Config.BTS_DATA_URL}_TODO`;
            return;
        } catch (error: any) {
            throw handleError(error, {
                service: 'aviation',
                operation: 'fetch',
                input
            })
        }
    })
})