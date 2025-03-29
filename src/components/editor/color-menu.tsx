import {useCurrentEditor} from "@tiptap/react";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

type Props = {
    colors: {
        [key: string]: string
    }
}

const ColorMenu = ({colors}: Props) => {
    const {editor} = useCurrentEditor()

    if (!editor)
        return null;

    return (
        <div className='bg-zinc-900 rounded-lg p-1 px-3 w-50 shadow-lg'>
            <div className='grid grid-cols-5 gap-1 justify-items-center'>
                {Object.entries(colors).map(([element, color]) => (
                    <TooltipProvider key={element}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className={`w-7 h-7 bg-zinc-900 hover:bg-zinc-900 hover:border-2 ${editor.isActive('textStyle', {color: color}) && 'border-2'}`}
                                    style={{borderColor: editor.isActive('textStyle', {color: color}) ? `color(from ${color} srgb r g b / 0.8)` : `color(from ${color} srgb r g b / 0.4)`}}
                                    type='button' size='icon'
                                    variant='outline'
                                    onClick={() => editor?.chain().focus().setColor(color).run()}
                                >
                                    <span className='font-semibold' style={{color: color}}>A</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>{element}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className='w-7 h-7 bg-zinc-900  hover:bg-zinc-900 hover:border-2'
                                style={{borderColor: `color(from #fff srgb r g b / 0.4)`}}
                                type='button'
                                size='icon'
                                variant={'outline'}
                                onClick={() => editor?.chain().focus().unsetColor().run()}
                            >
                                <span className='font-semibold'>A</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>default</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default ColorMenu;