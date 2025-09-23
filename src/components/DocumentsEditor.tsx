"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import client from "@/lib/supabase";
import { useParams } from "next/navigation";

interface Draft {
  id: string;
  title: string;
  content: string;
  last_edited: string;
}

export default function DocumentEditor() {
  const params = useParams();
  const draftId = Array.isArray(params.draftId) ? params.draftId[0] : params.draftId;

  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDraft((prev) => prev && { ...prev, content: editor.getHTML() });
    },
  });

  // Fetch draft on mount
  useEffect(() => {
    const fetchDraft = async () => {
      if (!draftId) return;
      const { data, error } = await client
        .from("drafts")
        .select("*")
        .eq("id", draftId)
        .single();

      if (error) {
        console.error("Error fetching draft:", error);
      } else if (data) {
        setDraft(data as Draft);
        editor?.commands.setContent(data.content || "");
      }
    };

    fetchDraft();
  }, [draftId, editor]);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);

    const { error } = await client
      .from("drafts")
      .update({
        content: draft.content,
        last_edited: new Date().toISOString(),
      })
      .eq("id", draft.id);

    if (error) console.error("Save error:", error);
    setSaving(false);
  };

  if (!draft || !editor) return <div>Loading editor...</div>;

  return (
    <div className="flex h-full">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Top Bar (Title + Save button) */}
        <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold">{draft.title}</h1>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Fixed Toolbar */}
        <div className="flex gap-2 p-2 border-b bg-gray-50 sticky top-[64px] z-10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "italic text-blue-600" : ""}
          >
            I
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            • List
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            1. List
          </button>
          <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            H1
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            H3
          </button>
        </div>

        {/* Scrollable Editor Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      
    </div>
  );
}
