"use client";

import React from "react";
import DocumentEditor from "@/components/DocumentsEditor";

interface DraftEditorPageProps {
  params: { draftId: string };
}

export default function DraftEditorPage(props: DraftEditorPageProps) {
  const { draftId } = props.params; // Access via props.params

  return (
    <div className="flex w-full h-full bg-gray-50">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Editing Draft
          </h1>
          <p className="text-sm text-gray-500">
            Draft ID: {draftId}
          </p>
        </header>

        <div className="flex-1 border rounded-lg bg-white shadow overflow-hidden">
          <DocumentEditor/>
        </div>
      </div>
    </div>
  );
}
