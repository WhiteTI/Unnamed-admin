
// let abc = JSON.parse(JSON.stringify(bytes.join())) as string

import {z} from "zod";
import formSchema from "@/components/forms/genshin/schemes/create-character-schema.ts";

type ImageInfo = {
    name: string
    type: string
    bytes: string
}

async function imageToObject(image: File | undefined): Promise<ImageInfo | undefined> {
    if (!image)
        return;

    const bytes = await image.bytes()

    return {
        name: image.name,
        type: image.type,
        bytes: bytes.join(),
    }
}

function objectToImage(imageInfo: ImageInfo): File {
    const bytes = new Uint8Array(imageInfo.bytes.split(',').map(item => +item))
    return new File([bytes], imageInfo.name, {type: imageInfo.type})
}

async function transformImagesInObject(obj: z.infer<typeof formSchema>) {
    const [charImages, skillsImages, passiveSkillsImages, constellationsImages] = await Promise.all([
        new Promise<(ImageInfo | undefined)[]>(resolve => resolve(
            Promise.all([
                imageToObject(obj.image),
                imageToObject(obj.bgImage),
                imageToObject(obj.listImage),
            ])
        )),
        new Promise<(ImageInfo | undefined)[]>(resolve => resolve(
            Promise.all([
                ...obj.skills.map(skill => imageToObject(skill.image))
            ])
        )),
        new Promise<(ImageInfo | undefined)[]>(resolve => resolve(
            Promise.all([
                ...obj.passiveSkills.map(passiveSkill => imageToObject(passiveSkill.image))
            ])
        )),
        new Promise<(ImageInfo | undefined)[]>(resolve => resolve(
            Promise.all([
                ...obj.constellations.map(constellation => imageToObject(constellation.image))
            ])
        )),
    ])

    return {charImages, skillsImages, passiveSkillsImages, constellationsImages}
}
//
// async function f(item: object | [] | File | string | number) {
//     if (Array.isArray(item)) {
//         return item.map(o => f(o))
//     }
//
//     if (item instanceof File) {
//         return await imageToObject(item)
//     }
//
//     if (typeof item === 'object')  {
//         const t = Object.entries(item).map(async ([k, v]) => [k, await f(v)])
//
//         return Object.fromEntries(t)
//     }
//
//     if (typeof item === 'string' || typeof item === 'number') {
//         return item
//     }
// }

export {
    imageToObject,
    objectToImage,
    transformImagesInObject
}