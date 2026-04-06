"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pencil, Trash2, Download, Plus } from "lucide-react";

interface Draft {
  id: string;
  title: string;
  last_edited: string;
  created_at?: string;
  content?: string;
}

export default function DashboardClient({ 
  initialDrafts, 
  uuid 
}: { 
  initialDrafts: Draft[];
  uuid: string;
}) {
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleNewBlank = async () => {
    const { data, error } = await supabase
      .from("drafts")
      .insert({ user_id: uuid, title: "Untitled Document", content: "" })
      .select()
      .single();

    if (error) return console.error(error);
    router.push(`/${uuid}/draft/${data.id}`);
  };

  const handleUploadDocx = async (file: File) => {
    try {
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
      const title = file.name.replace(/\.docx$/i, "");
      const { data, error } = await supabase
        .from("drafts")
        .insert({ user_id: uuid, title: title || "Imported Document", content: html })
        .select()
        .single();
      if (error) return console.error(error);
      router.push(`/${uuid}/draft/${data.id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to import .docx. Please ensure it is a valid Word document.");
    }
  };

  const handleDownloadDocx = async (draft: Draft) => {
    try {
      const html = draft.content ?? (await (async () => {
        const { data } = await supabase.from("drafts").select("content").eq("id", draft.id).single();
        return (data?.content as string) || "";
      })());
      const htmlDocx = (await import("html-docx-js/dist/html-docx")).default;
      const blob = htmlDocx.asBlob(`<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>${html}</body></html>`);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${draft.title || "document"}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to export as .docx");
    }
  };

  const handleRenameConfirm = async () => {
    if (!renameId || !newTitle) return;
    const { error } = await supabase
      .from("drafts")
      .update({ title: newTitle, last_edited: new Date().toISOString() })
      .eq("id", renameId);

    if (!error)
      setDrafts((prev) =>
        prev.map((d) => (d.id === renameId ? { ...d, title: newTitle } : d))
      );

    setRenameId(null);
    setNewTitle("");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <Popover open={newOpen} onOpenChange={setNewOpen}>
          <PopoverTrigger asChild>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 inline-flex items-center gap-2">
              <Plus size={16} /> New
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="flex flex-col gap-2">
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100" onClick={() => { setNewOpen(false); handleNewBlank(); }}>
                Create blank document
              </button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100" onClick={() => fileInputRef.current?.click()}>
                Upload .docx
              </button>
              <input ref={fileInputRef} type="file" accept=".docx" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                setNewOpen(false);
                if (f) handleUploadDocx(f);
                e.currentTarget.value = "";
              }} />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Drafts Table */}
      {drafts.length === 0 ? (
        <div className="text-gray-500">No drafts found. Click &quot;New&quot; to create one.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Last Edited</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((draft) => (
                <tr
                  key={draft.id}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push(`/${uuid}/draft/${draft.id}`)}
                >
                  <td className="px-4 py-3">{draft.title}</td>
                  <td className="px-4 py-3 text-gray-500">{draft.last_edited ? new Date(draft.last_edited).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{draft.created_at ? new Date(draft.created_at).toLocaleString() : "—"}</td>
                  <td
                    className="px-4 py-3 flex justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-2 rounded hover:bg-gray-100" title="Rename">
                          <Pencil size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Rename Document</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="New title"
                            className="w-full border rounded px-2 py-1"
                            value={newTitle}
                            onChange={(e) => {
                              setRenameId(draft.id);
                              setNewTitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <AlertDialogCancel
                            onClick={() => {
                              setRenameId(null);
                              setNewTitle("");
                            }}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleRenameConfirm}>
                            Rename
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Download DOCX */}
                    <button className="p-2 rounded hover:bg-gray-100" title="Download as .docx" onClick={() => handleDownloadDocx(draft)}>
                      <Download size={16} />
                    </button>

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="p-2 rounded hover:bg-red-50 text-red-600"
                          onClick={() => setDeleteId(draft.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Document</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{draft.title}&quot;?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-4 flex justify-end gap-2">
                          <AlertDialogCancel onClick={() => setDeleteId(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              if (!deleteId) return;
                              const { error } = await supabase
                                .from("drafts")
                                .delete()
                                .eq("id", deleteId);
                              if (!error) setDrafts((prev) => prev.filter((d) => d.id !== deleteId));
                              setDeleteId(null);
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
