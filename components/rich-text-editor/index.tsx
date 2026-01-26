"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import { memo, useMemo } from "react";
import { createDebounce } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  debounceMs?: number;
}

const LinkConfig = Link.configure({
  HTMLAttributes: {
    class: "text-blue-500 hover:text-blue-600 underline",
  },
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https"],
  isAllowedUri: (url: string, ctx: any) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const disallowedProtocols = ["ftp", "file", "mailto"];
      const protocol = parsedUrl.protocol.replace(":", "");

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((p: any) =>
        typeof p === "string" ? p : p.scheme,
      );

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
      const domain = parsedUrl.hostname;

      if (disallowedDomains.includes(domain)) {
        return false;
      }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },
  shouldAutoLink: (url) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`https://${url}`);

      // only auto-link if the domain is not in the disallowed list
      const disallowedDomains = [
        "example-no-autolink.com",
        "another-no-autolink.com",
      ];
      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
});

function RichTextEditor({
  content,
  onChange,
  debounceMs = 300,
}: RichTextEditorProps) {
  const debouncedOnChange = useMemo(
    () => createDebounce(onChange, debounceMs),
    [onChange, debounceMs],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, // disable default paragraph to use custom one
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
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "my-4 md:my-6",
          },
        },
      }),
      Paragraph,
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
      LinkConfig,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    textDirection: "auto",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] max-h-[500px] rounded-md border p-2 overflow-y-auto",
      },
    },
    content: content,
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      debouncedOnChange(editor.getHTML());
    },
  });

  return (
    <div className="">
      <MenuBar editor={editor} />
      <div className="h-4" />
      <EditorContent editor={editor} />
    </div>
  );
}

export default memo(RichTextEditor);
