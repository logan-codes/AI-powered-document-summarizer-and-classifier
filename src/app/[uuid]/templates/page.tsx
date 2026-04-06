"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("public", true);

      if (error) {
        console.error("Error fetching templates:", error);
      } else {
        setTemplates(data as Template[]);
      }
      setLoading(false);
    }

    fetchTemplates();
  }, [supabase]);

  if (loading) return <div className="p-6">Loading templates...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 Public Legal Templates</h1>

      {templates.length === 0 ? (
        <p className="text-gray-500">No templates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">{tpl.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {tpl.description}
              </p>

              <div className="flex gap-2">
                {/* View Template */}
                <Link
                  href={`/templates/${tpl.id}`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                >
                  View
                </Link>

                {/* Create Draft from Template */}
                <Link
                  href={`/draft/new?templateId=${tpl.id}`}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
