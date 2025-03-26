import {z} from "zod";
import imageSchema from "@/components/forms/schemes/image-schema.ts";

const formSchema = z.object({
    name: z.string().min(2),
    title: z.string().min(2),
    description: z.string(),
    image: imageSchema,
    bgImage: imageSchema,
    listImage: imageSchema,
    rarity: z.string(),
    region: z.string(),
    elementId: z.string(),
    weaponTypeId: z.string(),
    levels: z.object({
        level: z.number(),
        health: z.number(),
        attack: z.number(),
        defense: z.number(),
        additionalStat: z.string()
    }).array(),
    skills: z.object({
        name: z.string(),
        image: imageSchema,
        description: z.string(),
        skillStats: z.object({
            level: z.number(),
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