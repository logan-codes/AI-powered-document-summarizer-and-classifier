"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
import { Pencil, Trash2, Download, Plus, FileX } from "lucide-react";

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
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Documents</h1>
        <Popover open={newOpen} onOpenChange={setNewOpen}>
          <PopoverTrigger asChild>
            <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 inline-flex items-center gap-2 shadow-sm transition-opacity">
              <Plus size={16} /> New Document
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 rounded-xl shadow-lg border border-border bg-popover text-popover-foreground">
            <div className="flex flex-col gap-1">
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors" onClick={() => { setNewOpen(false); handleNewBlank(); }}>
                Create blank document
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors" onClick={() => fileInputRef.current?.click()}>
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

      {/* Drafts Table / Empty State */}
      {drafts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border mt-2 rounded-2xl bg-muted/30"
        >
          <div className="bg-card p-4 rounded-2xl shadow-sm mb-5 border border-border">
            <FileX className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6 leading-relaxed">
            Get started by creating a new blank document or importing an existing .docx file from your computer.
          </p>
          <button 
            onClick={() => setNewOpen(true)}
            className="bg-card border border-border text-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-muted transition-colors shadow-sm"
          >
            Create
          </button>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border rounded-xl bg-card shadow-sm overflow-hidden">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground text-sm font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 text-left">Document Name</th>
                <th className="px-5 py-4 text-left">Last Edited</th>
                <th className="px-5 py-4 text-left">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {drafts.map((draft, index) => (
                  <motion.tr
                    key={draft.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/${uuid}/draft/${draft.id}`)}
                  >
                    <td className="px-5 py-4 font-medium text-foreground">{draft.title}</td>
                    <td className="px-5 py-4 text-muted-foreground text-sm">{draft.last_edited ? new Date(draft.last_edited).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground text-sm">{draft.created_at ? new Date(draft.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}</td>
                    <td
                      className="px-5 py-4 flex justify-end gap-1 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Rename">
                            <Pencil size={16} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl border-border bg-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Rename Document</AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="New title"
                              className="w-full border border-input rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-ring focus:outline-none bg-background text-foreground"
                              value={newTitle}
                              onChange={(e) => {
                                setRenameId(draft.id);
                                setNewTitle(e.target.value);
                              }}
                            />
                          </div>
                          <div className="mt-5 flex justify-end gap-2">
                            <AlertDialogCancel
                              className="rounded-lg border-border hover:bg-muted"
                              onClick={() => {
                                setRenameId(null);
                                setNewTitle("");
                              }}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-primary hover:opacity-90 text-primary-foreground rounded-lg" onClick={handleRenameConfirm}>
                              Rename
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Download DOCX */}
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Download as .docx" onClick={() => handleDownloadDocx(draft)}>
                        <Download size={16} />
                      </button>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            onClick={() => setDeleteId(draft.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl border-border bg-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Document</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Are you sure you want to delete &quot;{draft.title}&quot;? This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="mt-5 flex justify-end gap-2">
                            <AlertDialogCancel className="rounded-lg border-border hover:bg-muted" onClick={() => setDeleteId(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg"
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
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
