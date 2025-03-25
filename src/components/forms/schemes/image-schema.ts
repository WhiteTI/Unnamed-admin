import {z} from "zod";

const imageSchema = z.instanceof(File)
    .refine(
        (file) => [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/svg+xml",
            "image/webp",
        ].includes(file.type),
        {message: 'Неверный тип файла (っ °Д °;)っ'}
    ).optional()

export default imageSchema