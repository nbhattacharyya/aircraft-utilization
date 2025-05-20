import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { inferAsyncReturnType } from '@trpc/server';

// Creates server-side TRPC context
export function createTRPCContext({ event }: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
    // Fetch request headers or generate our own
    const requestId = event.headers['x-request-id'] || uuidv4();

    return {
        event,
        apiVersion: (event as { version?: string}).version ?? '1.0',
        requestId,
        input: event.body ? JSON.parse(event.body) : undefined
    }
}

export type Context = inferAsyncReturnType<typeof createTRPCContext> & {
    user?: {
        sub: string,
        [key: string]: any
    }
}