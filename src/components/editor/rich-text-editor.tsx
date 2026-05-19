"use client";

import * as React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  Code2,
  Minus,
  Undo2,
  Redo2,
  Link2,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Eraser,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
};

function readAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("read error"));
    r.readAsDataURL(file);
  });
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  className,
  editorClassName,
}: RichTextEditorProps) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[260px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (current !== next) editor.commands.setContent(next);
  }, [value, editor]);

  const disabled = !editor;
  const isActive = (name: string, attrs?: any) => editor?.isActive(name as any, attrs) ?? false;
  const btn = (active: boolean) => cn("h-9 w-9", active ? "bg-muted" : "bg-transparent");

  const setLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", prev || "");
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const addImageByUrl = () => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (!url?.trim()) return;
    editor.chain().focus().setImage({ src: url.trim() }).run();
  };

  const onPickImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const base64 = await readAsDataURL(file);
    editor.chain().focus().setImage({ src: base64 }).run();
    e.target.value = "";
  };

  return (
    <div className={cn("bg-background rounded-2xl border", className)}>
      <div className="flex flex-wrap items-center gap-1 p-2">
        <Button
          type="button"
          variant="outline"
          className={btn(isActive("bold"))}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={disabled}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("italic"))}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={disabled}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("underline"))}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={disabled}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("strike"))}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={disabled}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-9" />

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("heading", { level: 1 }))}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={disabled}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("heading", { level: 2 }))}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("heading", { level: 3 }))}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-9" />

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("bulletList"))}
          onClick={() => {
            const ok = editor?.chain().focus().toggleBulletList().run();
          }}
          disabled={disabled}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("orderedList"))}
          onClick={() => {
            const ok = editor?.chain().focus().toggleOrderedList().run();
          }}
          disabled={disabled}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("blockquote"))}
          onClick={() => {
            const ok = editor?.chain().focus().toggleBlockquote().run();
          }}
          disabled={disabled}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(false)}
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-9" />

        <Button
          type="button"
          variant="outline"
          className={btn(isActive("code"))}
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={disabled}
        >
          <Code2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(false)}
          onClick={setLink}
          disabled={disabled}
        >
          <Link2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className={btn(false)}
          onClick={addImageByUrl}
          disabled={disabled}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPickImage}
        />
        <Button
          type="button"
          variant="outline"
          className={btn(false)}
          onClick={() => fileRef.current?.click()}
          disabled={disabled}
        >
          <Upload className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-9" />

        <Button
          type="button"
          variant="outline"
          className={btn(false)}
          onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
          disabled={disabled}
        >
          <Eraser className="h-4 w-4" />
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            className={btn(false)}
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={disabled || !(editor?.can().undo() ?? false)}
          >
            <Undo2 className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            className={btn(false)}
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={disabled || !(editor?.can().redo() ?? false)}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={cn("border-t", editorClassName)}>
        <EditorContent
          editor={editor}
          className="[&_blockquote]:border-s-4 [&_blockquote]:ps-4 [&_blockquote]:opacity-80 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:ps-6 [&_ul]:list-disc [&_ul]:ps-6"
        />
      </div>
    </div>
  );
}
