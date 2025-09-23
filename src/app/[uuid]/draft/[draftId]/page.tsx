"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DocumentsEditor from "@/components/DocumentsEditor";
import AISidebar from "@/components/AISideBar";
import client from "@/lib/supabase";

export default function DraftPage() {
  const params = useParams();
  const draftId = typeof params.draftId === "string" ? params.draftId : "";
  const [uuid, setUuid] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(true);
  const [selectedText, setSelectedText] = useState<string>("");
  const MIN_EDITOR_WIDTH_PX = 850; // prevent editor area from collapsing too much
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 320;
    const saved = window.localStorage.getItem('aiSidebarWidth');
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const maxByViewport = Math.max(200, Math.min(600, vw - MIN_EDITOR_WIDTH_PX - 16));
    return saved ? Math.max(200, Math.min(maxByViewport, parseInt(saved))) : Math.min(320, maxByViewport);
  });
  const [isResizing, setIsResizing] = useState(false);
  const [editorApi, setEditorApi] = useState<{ replaceSelection: (html: string) => void; insertAtCursor: (html: string) => void } | null>(null);

  useEffect(() => {
    const onUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mouseup', onUp);
    }
    return () => window.removeEventListener('mouseup', onUp);
  }, [isResizing]);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await client.auth.getUser();
      if (!user || error) window.location.href = "/login";
      else setUuid(user.id);
    };
    fetchUser();
  }, []);

  if (!uuid) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 h-full"
        style={{
            marginRight: aiOpen ? sidebarWidth : 48, 
            height: `calc(100vh - 64px)`,
            minWidth: MIN_EDITOR_WIDTH_PX,
          }}>
        <DocumentsEditor
          draftId={draftId}
          onSendSelectedText={setSelectedText}
          registerApi={(api) => setEditorApi(api)}
        />
      </div>
      {/* Drag handle */}
      {aiOpen && (
        <div
          className="z-20 fixed top-[64px] h-[calc(100vh-64px)] w-1 cursor-col-resize"
          style={{ right: sidebarWidth }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        />
      )}
      <div className="z-10">
        <AISidebar
          isOpen={aiOpen}
          setIsOpen={setAiOpen}
          topBarHeight={64}
          userId={uuid}
          draftId={draftId}
          selectedText={selectedText}
          width={sidebarWidth}
          {...(editorApi ? { editorApi } : {})}
        />
      </div>
      {isResizing && (
        <div
          className="fixed inset-0 z-30"
          onMouseMove={(e) => {
            const x = e.clientX;
            const vw = window.innerWidth;
            const maxByViewport = Math.max(200, Math.min(600, vw - MIN_EDITOR_WIDTH_PX - 16));
            const desired = vw - x; 
            const clamped = Math.max(200, Math.min(maxByViewport, desired));
            setSidebarWidth(clamped);
          }}
          onMouseUp={() => {
            setIsResizing(false);
            try { window.localStorage.setItem('aiSidebarWidth', String(sidebarWidth)); } catch {}
          }}
          onClick={(e) => { e.stopPropagation(); }}
          onMouseDown={(e) => { e.preventDefault(); }}
        />
      )}
    </div>
  );
}
