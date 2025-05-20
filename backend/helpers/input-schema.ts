import { z } from 'zod';

export const fetchFlightsSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
})