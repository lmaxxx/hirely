import {useEffect} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import "@/assets/rich-editor.css"

type Props = {
  content: string;
  setContent: (content: string) => void;
  valueToReset?: string
  editorClassName?: string;
}

export default function RichEditor({content, setContent, valueToReset, editorClassName}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content
  });

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        setContent(editor.getHTML());
      });
    }
  }, [editor]);

  useEffect(() => {
    if(content === valueToReset) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  if (!editor) return null;

  return (
    <div className={"max-w-2xl"}>
      <div className={"flex flex-wrap gap-1 mb-2 items-center"}>
        <p>Description:</p>
        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
          className={`${editor.isActive("heading", {level: 1}) && "font-semibold bg-muted"}`}
        >
          H1
        </Button>
        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
          className={`${editor.isActive("heading", {level: 2})} && "font-semibold bg-muted"`}
        >
          H2
        </Button>
        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
          className={`${editor.isActive("heading", {level: 3}) && "font-semibold bg-muted"}`}
        >
          H3
        </Button>
        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") && "font-semibold bg-muted"}`}
        >
          Bold
        </Button>

        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive("italic") && "font-semibold bg-muted"}`}
        >
          Italic
        </Button>

        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive("bulletList") && "font-semibold bg-muted"}`}
        >
          Bullet List
        </Button>

        <Button
          variant={"outline"}
          type={"button"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive("orderedList") && "font-semibold bg-muted"}`}
        >
          Ordered List
        </Button>
      </div>

      <div className={cn("editor-container", editorClassName)}>
        <EditorContent editor={editor}/>
      </div>
    </div>
  );
};