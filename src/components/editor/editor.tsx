import {StarterKit} from "@tiptap/starter-kit";
import {EditorProvider, BubbleMenu} from "@tiptap/react";
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {ControllerRenderProps} from "react-hook-form";
import MenuBar from "@/components/editor/menu-bar.tsx";
import ColorMenu from "@/components/editor/color-menu.tsx";

type Props = {
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

const Editor = ({value, onChange}: Props) => {
    return (
        <div className='border border-solid border-white rounded'>
            <EditorProvider extensions={extensions} slotBefore={<MenuBar/>} content={value} editorProps={{
                attributes: {
                    class: 'prose prose-sm sm:prose-base min-h-20 max-h-60 overflow-y-scroll lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
                }
            }} onUpdate={({editor}) => {onChange(editor.getHTML())}}>
                <BubbleMenu tippyOptions={{placement: 'bottom'}} editor={null}><ColorMenu colors={colors}/></BubbleMenu>
            </EditorProvider>
        </div>
    )
}

export default Editor;