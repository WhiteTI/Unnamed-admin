import {z, RefinementCtx} from "zod";
import imageSchema from "@/components/forms/schemes/image-schema.ts";

const numberInString = (val: string, ctx: RefinementCtx) => {
    const parsed = parseInt(val)
    if (isNaN(parsed)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not a number",
        });
        return z.NEVER;
    }
    return parsed
}

const formSchema = z.object({
    name: z.string().min(2),
    title: z.string().min(2),
    description: z.string(),
    image: imageSchema,
    bgImage: imageSchema,
    listImage: imageSchema,
    rarity: z.string(),
    region: z.string(),
    elementName: z.string(),
    weaponTypeName: z.string(),
    levels: z.object({
        level: z.string().transform(numberInString),
        health: z.string().transform(numberInString),
        attack: z.string().transform(numberInString),
        defense: z.string().transform(numberInString),
        additionalStat: z.string()
    }).array(),
    skills: z.object({
        name: z.string(),
        image: imageSchema,
        description: z.string(),
        skillStats: z.object({
            level: z.string().transform(numberInString),
            value: z.string()
        }).array()
    }).array(),
    passiveSkills: z.object({
        name: z.string(),
        image: imageSchema,
        description: z.string(),
    }).array(),
    constellations: z.object({
        name: z.string(),
        image: imageSchema,
        description: z.string(),
    }).array(),
})

export default formSchema;