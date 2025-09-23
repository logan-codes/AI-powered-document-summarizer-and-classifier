"use client";

import { useEffect, useState } from "react";
import client from "@/lib/supabase";
import { useParams } from "next/navigation";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function TemplateViewPage() {
  const params = useParams();
  const templateId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      const { data, error } = await client
        .from("templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (error) {
        console.error("Error fetching template:", error);
      } else {
        setTemplate(data as Template);
      }
    }

    fetchTemplate();
  }, [templateId]);

  if (!template) return <div className="p-6">Loading template...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
      <p className="text-gray-600 mb-4">{template.description}</p>

      <div className="border p-4 bg-white rounded shadow-sm whitespace-pre-wrap">
        {template.content}
      </div>
    </div>
  );
}
