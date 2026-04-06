"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Quote, Undo2, Redo2, Heading1, Heading2, Heading3, Link2, Code2, Paintbrush2, Eraser, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createClient } from "@/lib/supabase";
import TextAlign from "@tiptap/extension-text-align";
import { toast } from "sonner";

interface Draft {
  id: string;
  title: string;
  content: string;
  last_edited: string;
}

interface DocumentsEditorProps {
  draftId: string;
  onSendSelectedText?: (text: string) => void;
  registerApi?: (api: { replaceSelection: (html: string) => void; insertAtCursor: (html: string) => void }) => void;
}

const DocumentsEditor: React.FC<DocumentsEditorProps> = ({
  draftId,
  onSendSelectedText,
  registerApi,
}) => {
  const supabase = createClient();
  // Get selected text from editor
  const getSelectedText = () => {
    if (!editor) return "";
    return editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to);
  };

  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [showSelectionTip, setShowSelectionTip] = useState(false);
  const [selectionPos, setSelectionPos] = useState<{ top: number; left: number } | null>(null);

  const [initialContentSet, setInitialContentSet] = useState(false);
  const editor = useEditor({
    extensions: [
      // Use StarterKit which already includes history, blockquote, codeBlock, strike, etc.
      StarterKit.configure({}),
      Link.configure({}),
      Underline.configure({}),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "", // always start empty, set content after draft loads
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDraft(prev => prev && { ...prev, content: editor.getHTML() });
    },
  });

  // Track selection and position a small tooltip near it
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const sel = window.getSelection();
      const hasText = !!sel && sel.rangeCount > 0 && sel.toString().trim().length > 0;
      setShowSelectionTip(Boolean(hasText));
      if (hasText) {
        const range = sel!.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const container = document.getElementById("editor-page-container");
        if (container) {
          const crect = container.getBoundingClientRect();
          setSelectionPos({ top: rect.top - crect.top - 32, left: rect.left - crect.left });
        }
      } else {
        setSelectionPos(null);
      }
    };
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, [editor]);

  useEffect(() => {
    if (!editor || !registerApi) return;
    const api = {
      replaceSelection: (html: string) => {
        editor.chain().focus().insertContent(html).run();
      },
      insertAtCursor: (html: string) => {
        editor.chain().focus().insertContent(html).run();
      },
    };
    // Call once when editor becomes available to avoid parent-child update loops
    registerApi(api);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Load draft and set editor content only after both are ready
  useEffect(() => {
    const fetchDraft = async () => {
      if (!draftId) return;
      const { data, error } = await supabase.from("drafts").select("*").eq("id", draftId).single();
      if (error) console.error(error);
      else if (data) {
        setDraft(data);
      }
    };
    fetchDraft();
  }, [draftId, supabase]);

  useEffect(() => {
    if (editor && draft && !initialContentSet) {
      editor.commands.setContent(draft.content || "");
      setInitialContentSet(true);
    }
  }, [editor, draft, initialContentSet]);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    const { error } = await supabase
      .from("drafts")
      .update({ content: draft.content, last_edited: new Date().toISOString() })
      .eq("id", draft.id);
    if (error) console.error(error);
    setSaving(false);
  };

  if (!draft || !editor) return <div>Loading editor...</div>;

  return (
    <div className="flex-1 flex flex-col h-full bg-background text-foreground">
      <div className="flex justify-between items-center p-4 border-b border-border bg-card sticky top-0 z-10 transition-colors">
        <h1 className="text-2xl font-bold tracking-tight">{draft.title}</h1>
        <button onClick={handleSave} className="bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-sm transition-opacity">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div
        className="flex gap-1 p-2 border-b border-border bg-muted/30 sticky z-10 items-center overflow-x-auto transition-colors"
        style={{ top: 0 }}
      >
        {/* Send selected text to AI chat */}
        <Button
          variant="secondary"
          size="sm"
          title="Send selected text to AI Chat"
          onClick={() => {
            const selected = getSelectedText();
            if (selected && onSendSelectedText) {
              onSendSelectedText(selected);
              toast.success("Text sent to AI context");
            }
          }}
        >
          Send to AI Chat
        </Button>
        {/* Undo/Redo */}
        <Button variant="ghost" size="icon" title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 /></Button>
        <Button variant="ghost" size="icon" title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 /></Button>
        <span className="mx-2 border-l h-6" />

        {/* Formatting */}
        <Button variant={editor.isActive('bold') ? 'secondary' : 'ghost'} size="icon" title="Bold" onClick={() => editor.chain().focus().toggleMark('bold').run()}><Bold /></Button>
        <Button variant={editor.isActive('italic') ? 'secondary' : 'ghost'} size="icon" title="Italic" onClick={() => editor.chain().focus().toggleMark('italic').run()}><Italic /></Button>
        <Button variant={editor.isActive('strike') ? 'secondary' : 'ghost'} size="icon" title="Strikethrough" onClick={() => editor.chain().focus().toggleMark('strike').run()}><Strikethrough /></Button>
  <Button variant={editor.isActive('underline') ? 'secondary' : 'ghost'} size="icon" title="Underline" onClick={() => editor.chain().focus().toggleMark('underline').run()}><UnderlineIcon /></Button>
        <span className="mx-2 border-l h-6" />

        {/* Headings */}
        <Button variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'} size="icon" title="Heading 1" onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph', { level: 1 }).run()}><Heading1 /></Button>
        <Button variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'} size="icon" title="Heading 2" onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph', { level: 2 }).run()}><Heading2 /></Button>
        <Button variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'} size="icon" title="Heading 3" onClick={() => editor.chain().focus().toggleNode('heading', 'paragraph', { level: 3 }).run()}><Heading3 /></Button>
        <span className="mx-2 border-l h-6" />

        {/* Lists */}
        <Button variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'} size="icon" title="Bullet List" onClick={() => editor.chain().focus().toggleList('bulletList', 'listItem').run()}><List /></Button>
        <Button variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'} size="icon" title="Numbered List" onClick={() => editor.chain().focus().toggleList('orderedList', 'listItem').run()}><ListOrdered /></Button>
        <span className="mx-2 border-l h-6" />

        {/* Blockquote, Code, Link */}
        <Button variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'} size="icon" title="Blockquote" onClick={() => editor.chain().focus().toggleNode('blockquote', 'paragraph').run()}><Quote /></Button>
        <Button variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'} size="icon" title="Code Block" onClick={() => editor.chain().focus().toggleNode('codeBlock', 'paragraph').run()}><Code2 /></Button>

        {/* Alignment */}
        <span className="mx-2 border-l h-6" />
        <Button variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'} size="icon" title="Align left" onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft /></Button>
        <Button variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'} size="icon" title="Align center" onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter /></Button>
        <Button variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'} size="icon" title="Align right" onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight /></Button>
        <Button variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'ghost'} size="icon" title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()}><AlignJustify /></Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={editor.isActive('link') ? 'secondary' : 'ghost'} size="icon" title="Insert Link"><Link2 /></Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Paste or type a link..."
              className="border rounded px-2 py-1 text-sm"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  editor.chain().focus().extendMarkRange('link').setMark('link', { href: (e.target as HTMLInputElement).value }).run();
                }
              }}
            />
            <Button size="sm" onClick={() => editor.chain().focus().unsetMark('link').run()}>Remove Link</Button>
          </PopoverContent>
        </Popover>
        <span className="mx-2 border-l h-6" />

        {/* Color and Clear formatting (optional, demo only) */}
        <Button variant="ghost" size="icon" title="Text Color" disabled><Paintbrush2 /></Button>
        <Button variant="ghost" size="icon" title="Clear Formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}><Eraser /></Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/10">
        <div id="editor-page-container" className="relative mx-auto bg-card shadow-sm border border-border w-full max-w-4xl min-h-[800px] transition-colors">
          <div className="p-4 sm:p-8 prose dark:prose-invert max-w-none prose-p:leading-relaxed">
            <EditorContent editor={editor} />
          </div>
          {showSelectionTip && selectionPos && (
            <button
              className="absolute z-10 text-xs px-2 py-1 rounded bg-black/80 text-white hover:bg-black"
              style={{ top: Math.max(4, selectionPos.top), left: Math.max(4, selectionPos.left) }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const selected = getSelectedText();
                if (selected && onSendSelectedText) {
                  onSendSelectedText(selected);
                  toast.success("Text sent to AI context");
                }
              }}
            >
              Send to AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default DocumentsEditor;
