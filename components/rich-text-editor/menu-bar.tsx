"use client";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

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

  const menuItems = [
    {
      name: "heading1",
      icon: Heading1,
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      canActivate:
        editor.can().chain().toggleHeading({ level: 1 }).run() ?? false,
    },
    {
      name: "heading2",
      icon: Heading2,
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      canActivate:
        editor.can().chain().toggleHeading({ level: 2 }).run() ?? false,
    },
    {
      name: "heading3",
      icon: Heading3,
      action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      canActivate:
        editor.can().chain().toggleHeading({ level: 3 }).run() ?? false,
    },
    {
      name: "quote",
      icon: Quote,
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      canActivate: editor.can().chain().toggleBlockquote().run() ?? false,
    },
    {
      name: "bold",
      icon: Bold,
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      canActivate: editor.can().chain().toggleBold().run() ?? false,
    },
    {
      name: "italic",
      icon: Italic,
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      canActivate: editor.can().chain().toggleItalic().run() ?? false,
    },
    {
      name: "underline",
      icon: Underline,
      action: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      canActivate: editor.can().chain().toggleUnderline().run() ?? false,
    },
    {
      name: "strike",
      icon: Strikethrough,
      action: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      canActivate: editor.can().chain().toggleStrike().run() ?? false,
    },
    {
      name: "align left",
      icon: AlignLeft,
      action: () => editor?.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive("textAlign", { align: "left" }),
      canActivate: editor.can().chain().setTextAlign("left").run() ?? false,
    },
    {
      name: "align center",
      icon: AlignCenter,
      action: () => editor?.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive("textAlign", { align: "center" }),
      canActivate: editor.can().chain().setTextAlign("center").run() ?? false,
    },
    {
      name: "align right",
      icon: AlignRight,
      action: () => editor?.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive("textAlign", { align: "right" }),
      canActivate: editor.can().chain().setTextAlign("right").run() ?? false,
    },
    {
      name: "bullet list",
      icon: List,
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      canActivate: editor.can().chain().toggleBulletList().run() ?? false,
    },
    {
      name: "ordered list",
      icon: ListOrdered,
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      canActivate: editor.can().chain().toggleOrderedList().run() ?? false,
    },
    {
      name: "horizontal rule",
      icon: Minus,
      action: () => editor?.chain().focus().setHorizontalRule().run(),
      isActive: editor.isActive("horizontalRule"),
      canActivate: editor.can().chain().setHorizontalRule().run() ?? false,
    },
    {
      name: "image",
      icon: Image,
      action: () => addImage(),
      isActive: editor.isActive("image"),
      canActivate: true,
    },
    {
      name: "youtube video",
      icon: YoutubeIcon,
      action: () => addYoutubeVideo(),
      isActive: editor.isActive("youtubeVideo"),
      canActivate: true,
    },
    {
      name: "undo",
      icon: Undo,
      action: () => editor?.chain().focus().undo().run(),
      isActive: false,
      canActivate: editor.can().chain().undo().run() ?? false,
    },
    {
      name: "redo",
      icon: Redo,
      action: () => editor?.chain().focus().redo().run(),
      isActive: false,
      canActivate: editor.can().chain().redo().run() ?? false,
    },
    {
      name: "clear formatting",
      icon: Eraser,
      action: () => editor?.chain().focus().clearNodes().run(),
      isActive: false,
      canActivate: editor.can().chain().clearNodes().run() ?? false,
    },
  ];
  console.log("isActive", editor.isActive("bold"));

  const renderMenuItems = menuItems.map(({ icon: IconComponent, ...item }) => (
    <Tooltip key={item.name}>
      <TooltipTrigger>
        <Toggle
          aria-label={item.name}
          key={item.name}
          name={item.name}
          pressed={item.isActive}
          onPressedChange={item.action}
          disabled={!item.canActivate}
          size="default"
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
