/*
Router for Aviation Stack Procedures
*/

import { router, publicProcedure } from '../trpc/trpc';
import { handleError } from '../helpers/error-handler';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { fetchFlightsSchema } from '../helpers/input-schema';

const lambda = new LambdaClient({ region: 'us-east-2' });

export const AviationRouters = router({
    fetchFlights: publicProcedure.input(fetchFlightsSchema).mutation(async ({ input, ctx}) => {
        try {
            //const games = await fetchGamesHandler(input);
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