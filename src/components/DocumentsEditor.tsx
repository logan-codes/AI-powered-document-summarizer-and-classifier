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
    content: "", // Start empty
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
        editor?.commands.setContent(data.content || ""); // ✅ Set editor content after fetch
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
        last_edited: new Date().toISOString(), // ✅ safer timestamp
      })
      .eq("id", draft.id);

    if (error) console.error("Save error:", error);
    setSaving(false);
  };

  if (!draft || !editor) return <div>Loading editor...</div>;

  return (
    <div className="flex h-screen">
      {/* AI Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r overflow-auto">
        <h2 className="font-bold text-lg mb-2">AI Assistant</h2>
        <div className="text-sm text-gray-600">
          {/* You can integrate AI chat here */}
          Ask AI to suggest edits or summaries.
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-bold">{draft.title}</h1>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 mb-2">
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

        <div className="flex-1 border p-2 rounded overflow-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
