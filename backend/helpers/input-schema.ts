import { z } from 'zod';

export const fetchFlightsSchema = z.object({
    date: z.string()
})