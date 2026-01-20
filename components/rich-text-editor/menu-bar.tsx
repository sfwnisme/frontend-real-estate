"use client";
import { Editor, useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  HighlighterIcon,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  PilcrowLeft,
  PilcrowRight,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useCallback } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  //---------------------
  // actions
  //---------------------
  const addImage = () => {
    const url = window.prompt("URL of the image");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };
  const addYoutubeVideo = () => {
    const url = window.prompt("URL of the youtube video");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        // width: 640,
        // height: 480,
      });
    }
  };
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  const setHighlight = useCallback(() => {
    editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run();
  }, [editor]);

  //---------------------
  // editor state
  //---------------------
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isQuote: ctx.editor.isActive("blockquote"),
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isAlignLeft: ctx.editor.isActive("textAlign", { align: "left" }),
      isAlignCenter: ctx.editor.isActive("textAlign", { align: "center" }),
      isAlignRight: ctx.editor.isActive("textAlign", { align: "right" }),
      isLTR: ctx.editor.isActive("ltr"),
      isRTL: ctx.editor.isActive("rtl"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isHorizontalRule: false,
      isImage: false,
      isYoutubeVideo: false,
      isUndo: false,
      isRedo: false,
      isClearFormatting: false,
      isLink: ctx.editor.isActive("link"),
      isLinkActive: ctx.editor.isActive("link"),
      isHighlight: ctx.editor.isActive("highlight"),
    }),
  });

  const menuItems = [
    {
      name: "heading1",
      icon: Heading1,
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editorState.isHeading1,
      canActivate:
        editor.can().chain().toggleHeading({ level: 1 }).run() ?? false,
    },
    {
      name: "heading2",
      icon: Heading2,
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editorState.isHeading2,
      canActivate:
        editor.can().chain().toggleHeading({ level: 2 }).run() ?? false,
    },
    {
      name: "heading3",
      icon: Heading3,
      action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editorState.isHeading3,
      canActivate:
        editor.can().chain().toggleHeading({ level: 3 }).run() ?? false,
    },
    {
      name: "quote",
      icon: Quote,
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editorState.isQuote,
      canActivate: editor.can().chain().toggleBlockquote().run() ?? false,
    },
    {
      name: "bold",
      icon: Bold,
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: editorState.isBold,
      canActivate: editor.can().chain().toggleBold().run() ?? false,
    },
    {
      name: "italic",
      icon: Italic,
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editorState.isItalic,
      canActivate: editor.can().chain().toggleItalic().run() ?? false,
    },
    {
      name: "underline",
      icon: Underline,
      action: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: editorState.isUnderline,
      canActivate: editor.can().chain().toggleUnderline().run() ?? false,
    },
    {
      name: "strike",
      icon: Strikethrough,
      action: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editorState.isStrike,
      canActivate: editor.can().chain().toggleStrike().run() ?? false,
    },
    {
      name: "highlight",
      icon: HighlighterIcon,
      action: () => setHighlight(),
      isActive: editorState.isHighlight,
      canActivate: editor.can().chain().toggleHighlight().run() ?? false,
    },
    {
      name: "align left",
      icon: AlignLeft,
      action: () => editor?.chain().focus().setTextAlign("left").run(),
      isActive: editorState.isAlignLeft,
      canActivate: editor.can().chain().setTextAlign("left").run() ?? false,
    },
    {
      name: "align center",
      icon: AlignCenter,
      action: () => editor?.chain().focus().setTextAlign("center").run(),
      isActive: editorState.isAlignCenter,
      canActivate: editor.can().chain().setTextAlign("center").run() ?? false,
    },
    {
      name: "align right",
      icon: AlignRight,
      action: () => editor?.chain().focus().setTextAlign("right").run(),
      isActive: editorState.isAlignRight,
      canActivate: editor.can().chain().setTextAlign("right").run() ?? false,
    },
    {
      name: "text direction LTR",
      icon: PilcrowRight,
      action: () => editor.commands.setTextDirection("ltr"),
      isActive: editorState.isLTR,
      canActivate: editor.can().chain().setTextDirection("ltr").run() ?? false,
    },
    {
      name: "text direction RTL",
      icon: PilcrowLeft,
      action: () => editor.commands.setTextDirection("rtl"),
      isActive: editorState.isRTL,
      canActivate: editor.can().chain().setTextDirection("rtl").run() ?? false,
    },
    {
      name: "bullet list",
      icon: List,
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editorState.isBulletList,
      canActivate: editor.can().chain().toggleBulletList().run() ?? false,
    },
    {
      name: "ordered list",
      icon: ListOrdered,
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editorState.isOrderedList,
      canActivate: editor.can().chain().toggleOrderedList().run() ?? false,
    },
    {
      name: "horizontal rule",
      icon: Minus,
      action: () => editor?.chain().focus().setHorizontalRule().run(),
      isActive: editorState.isHorizontalRule,
      canActivate: editor.can().chain().setHorizontalRule().run() ?? false,
    },
    {
      name: "link",
      icon: Link,
      action: () => setLink(),
      isActive: editorState.isLink,
      canActivate: true,
    },
    {
      name: "image",
      icon: Image,
      action: () => addImage(),
      isActive: editorState.isImage,
      canActivate: true,
    },
    {
      name: "youtube video",
      icon: YoutubeIcon,
      action: () => addYoutubeVideo(),
      isActive: editorState.isYoutubeVideo,
      canActivate: true,
    },
    {
      name: "undo",
      icon: Undo,
      action: () => editor?.chain().focus().undo().run(),
      isActive: editorState.isUndo,
      canActivate: editor.can().chain().undo().run() ?? false,
    },
    {
      name: "redo",
      icon: Redo,
      action: () => editor?.chain().focus().redo().run(),
      isActive: editorState.isRedo,
      canActivate: editor.can().chain().redo().run() ?? false,
    },
    {
      name: "clear formatting",
      icon: Eraser,
      action: () => editor?.chain().focus().clearNodes().run(),
      isActive: editorState.isClearFormatting,
      canActivate: editor.can().chain().clearNodes().run() ?? false,
    },
  ];

  const renderMenuItems = menuItems.map(({ icon: IconComponent, ...item }) => (
    <Tooltip key={item.name}>
      <TooltipTrigger type="button">
        <Toggle
          aria-label={item.name}
          key={item.name}
          name={item.name}
          pressed={item.isActive}
          onPressedChange={item.action}
          disabled={!item.canActivate}
          size="default"
          variant="outline"
        >
          <IconComponent className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{item.name}</TooltipContent>
    </Tooltip>
  ));
  return (
    <div className="flex gap-2 border rounded-sm w-full p-2 overflow-x-auto">
      {renderMenuItems}
    </div>
  );
}
