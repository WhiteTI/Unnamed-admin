import {StarterKit} from "@tiptap/starter-kit";
import {EditorProvider, useCurrentEditor} from "@tiptap/react";
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {BoldIcon, Heading2Icon, Heading3Icon, ItalicIcon, RedoIcon, UndoIcon} from "lucide-react";
import {ControllerRenderProps} from "react-hook-form";

interface Props {
    value: any
    onChange: ControllerRenderProps['onChange']
}

const extensions = [
    StarterKit.configure({
        code: false,
        blockquote: false,
        codeBlock: false,
        heading: {levels: [2, 3]}
    }),
    Color,
    TextStyle,
]

const colors = {
    '5 star': '#FFCC33',
    '4 star': '#9A69D4',
    pyro: '#FF6640',
    hydro: '#00c0ff',
    dendro: '#9be53d',
    electro: '#cc80ff',
    anemo: '#33d7a0',
    cryo: '#7af2f2',
    geo: '#ffb00d'
}

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
                {Object.entries(colors).map(([element, color]) => (
                    <Button
                        type='button' key={element}
                        variant={editor.isActive('textStyle', {color: color}) ? 'default': 'outline'}
                        onClick={() => editor?.chain().focus().setColor(color).run()}
                    >
                        {element}
                    </Button>
                ))}
                <Button
                    type='button'
                    variant={'outline'}
                    onClick={() => editor?.chain().focus().unsetColor().run()}
                >
                    Unset color
                </Button>
            </div>
            <Separator className="my-1"/>
        </div>
    )
}

const Editor = ({value, onChange}: Props) => {
    return (
        <div className='border border-solid border-white rounded'>
            <EditorProvider extensions={extensions} slotBefore={<MenuBar/>} content={value} editorProps={{
                attributes: {
                    class: 'prose prose-sm sm:prose-base min-h-20 max-h-60 overflow-y-scroll lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
                }
            }} onUpdate={({editor}) => {onChange(editor.getHTML())}}>
            </EditorProvider>
        </div>
    )
}

export default Editor;