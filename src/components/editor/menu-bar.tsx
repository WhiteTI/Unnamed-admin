import {useCurrentEditor} from "@tiptap/react";
import {Button} from "@/components/ui/button.tsx";
import {BoldIcon, Heading2Icon, Heading3Icon, ItalicIcon, RedoIcon, UndoIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";

const MenuBar = () => {
    const {editor} = useCurrentEditor()

    if (!editor)
        return null;

    return (
        <div className='m-5'>
            <div className='flex flex-wrap gap-2'>
                <Button
                    type='button' size='icon'
                    variant={'outline'}
                    onClick={() => editor?.chain().focus().undo().run()}
                >
                    <UndoIcon/>
                </Button>
                <Button
                    type='button' size='icon'
                    variant={'outline'}
                    onClick={() => editor?.chain().focus().redo().run()}
                >
                    <RedoIcon/>
                </Button>
                <Button
                    type='button' size='icon'
                    variant={editor.isActive('bold') ? 'default': 'outline'}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                >
                    <BoldIcon/>
                </Button>
                <Button
                    type='button' size='icon'
                    variant={editor.isActive('italic') ? 'default': 'outline'}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                >
                    <ItalicIcon/>
                </Button>
                <Button
                    type='button' size='icon'
                    variant={editor.isActive('heading', {level: 2}) ? 'default': 'outline'}
                    onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}
                >
                    <Heading2Icon/>
                </Button>
                <Button
                    type='button' size='icon'
                    variant={editor.isActive('heading', {level: 3}) ? 'default': 'outline'}
                    onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}
                >
                    <Heading3Icon/>
                </Button>
            </div>
            <Separator className="my-1"/>
        </div>
    )
}

export default MenuBar;