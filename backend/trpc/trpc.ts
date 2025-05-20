import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import { v4 as uuidv4 } from 'uuid';

const trpc = initTRPC.context<Context>().create({
    errorFormatter(opts) {
        const { shape, error } = opts;
        return {
            ...shape,
            data: {
                ...shape.data,
                requestId: error.cause?.requestId || uuidv4(),
              },
        }
    }
})

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const middleware = trpc.middleware;

//TODO: setup private procedure with isAuthed/isLoggedIn