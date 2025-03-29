import {ChangeEvent, forwardRef, useEffect, useRef, useState} from "react";
import {ControllerRenderProps} from 'react-hook-form'
import {Input} from "@/components/ui/input.tsx";
import {ImageUpIcon} from "lucide-react";

type Props = {
    name: string
    onChange: ControllerRenderProps['onChange']
    width?: string
    height?: string
}

const ImagePreview = forwardRef<HTMLInputElement, Props>(({name, onChange, width = 'w-80', height = 'h-80'}, ref) => {
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const previewRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (imagePreview && previewRef.current)
            previewRef.current.style.backgroundImage = `url(${imagePreview})`
    }, [imagePreview]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files?.[0])
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (ev) => {
                if (ev.target) {
                    const result = ev.target.result
                    setImagePreview(result);
                }
            }

        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className={`${height} ${width} overflow-hidden relative bg-accent rounded-lg bg-cover bg-no-repeat bg-center`} ref={previewRef}>
            {!imagePreview && <ImageUpIcon size={48} className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] '/>}
            <Input type="file" accept='image/*' name={name} ref={ref}
                   className='w-full h-full absolute top-0 opacity-0 cursor-pointer'
                   onChange={handleImageChange}
            />
        </div>
    );
});

export default ImagePreview