"use client";

import React from "react";
import DocumentEditor from "@/components/DocumentsEditor";

interface DraftEditorPageProps {
  params: { draftId: string };
}

export default function DraftEditorPage(props: DraftEditorPageProps) {
  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Main Editor Area */}
      <div
        className={`flex-1 flex flex-col p-6 overflow-hidden transition-all duration-300 `}
      >
        <div className="flex-1 border rounded-lg bg-white shadow overflow-hidden">
          <DocumentEditor />
        </div>
      </div>  
    </div>
  );
}
