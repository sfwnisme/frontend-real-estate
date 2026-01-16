"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from "@tiptap/extension-youtube";

interface RichTextEditorProps {
  content?: string;
}
export default function RichTextEditor({
  content = "<p>Hello World! 🌎️</p>",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
      }),
      Image,
      Youtube.configure({
        controls: false,
        nocookie: true,
        width: 840,
        height: 480,
      }),
      HorizontalRule,
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] max-h-[500px] rounded-md border p-2 overflow-y-auto",
      },
    },
    content: content,
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
  });
  return (
    <div className="m-8">
      <MenuBar editor={editor} />
      <div className="h-4" />
      <EditorContent editor={editor} />
    </div>
  );
}
