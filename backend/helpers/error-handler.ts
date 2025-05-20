import { TRPCError } from '@trpc/server';

export function handleError(error: unknown, context: { service: string; operation: string; input?: any }): TRPCError {
  
    // Extract relevant information for logging
    const errorDetails = {
      service: context.service,
      operation: context.operation,
      input: context.input || {},
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    };
  
    // Log the error with appropriate severity
    //logger.error(errorDetails, `Error in ${context.service}.${context.operation}`);
  
    // TODO: Convert to TRPC error with appropriate code
    let code = 'INTERNAL_SERVER_ERROR';
  
    // If error already has a cause with requestId, preserve it
    const cause = error instanceof TRPCError && error.cause ? error.cause : undefined;
  
    return new TRPCError({
      code: code as any,
      message: `Error in ${context.service}.${context.operation}: ${errorDetails.errorMessage}`,
      cause: cause || error,
    });
  }