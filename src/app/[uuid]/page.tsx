"use client";

import React, { useEffect, useState } from "react";
import client from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // ShadCN alert dialog

interface Draft {
  id: string;
  title: string;
  last_edited: string;
}

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid as string;

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await client.auth.getUser();
      if (error || !user) router.push("/login");
      else setUserId(user.id);
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (!userId) return;
    const fetchDrafts = async () => {
      setLoading(true);
      const { data, error } = await client
        .from("drafts")
        .select("*")
        .eq("user_id", userId)
        .order("last_edited", { ascending: false });

      if (error) console.error(error);
      else setDrafts(data as Draft[]);
      setLoading(false);
    };

    fetchDrafts();
  }, [userId]);

  const handleNewDraft = async () => {
    if (!userId) return;
    const { data, error } = await client
      .from("drafts")
      .insert({ user_id: userId, title: "Untitled Document", content: "" })
      .select()
      .single();

    if (error) return console.error(error);
    router.push(`/${uuid}/draft/${data.id}`);
  };

  const handleRenameConfirm = async () => {
    if (!renameId || !newTitle) return;
    const { error } = await client
      .from("drafts")
      .update({ title: newTitle, last_edited: new Date() })
      .eq("id", renameId);

    if (!error)
      setDrafts((prev) =>
        prev.map((d) => (d.id === renameId ? { ...d, title: newTitle } : d))
      );

    setRenameId(null);
    setNewTitle("");
  };

  if (!userId) return <div>Loading dashboard...</div>;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button
          onClick={handleNewDraft}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          + New
        </button>
      </div>

      {/* Drafts Table */}
      {loading ? (
        <div>Loading drafts...</div>
      ) : drafts.length === 0 ? (
        <div>No drafts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg bg-white shadow-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Last Edited</th>
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
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(draft.last_edited).toLocaleString()}
                  </td>
                  <td
                    className="px-4 py-3 flex justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
                          Rename
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

                    {/* Delete AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => setDeleteId(draft.id)} // set the ID when opening dialog
                        >
                          Delete
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
                              const { error } = await client
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
