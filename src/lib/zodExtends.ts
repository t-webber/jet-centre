// superRefine<RefinedOutput extends Output>(refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput): ZodEffects<this, RefinedOutput, Input>;

import { RefinementCtx, z } from 'zod';

export const EMPTY_STRING = z.string().max(0);

export function required(val: any, ctx: RefinementCtx) {
    if (val === undefined || (typeof val === 'string' && val.length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Requis'
        });
    }
}

export function stringDate(val: any, ctx: RefinementCtx) {
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (typeof val === 'string') {
        if (!dateRegex.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid date format, expected YYYY-MM-DD'
            });
        }
    } else {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: z.ZodParsedType.string,
            received:
                z.ZodParsedType[typeof val as keyof typeof z.ZodParsedType] ||
                z.ZodParsedType.unknown
        });
    }
}
