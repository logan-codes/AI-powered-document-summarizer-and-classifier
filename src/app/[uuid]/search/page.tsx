"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  description: string;
}

interface Clause {
  id: string;
  title: string;
  content: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const supabase = createClient();

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    // Search templates
    const { data: templateData, error: templateError } = await supabase
      .from("templates")
      .select("id, title, description")
      .ilike("title", `%${query}%`);

    if (templateError) console.error("Template search error:", templateError);
    setTemplates(templateData || []);

    // Search clauses
    const { data: clauseData, error: clauseError } = await supabase
      .from("clauses")
      .select("id, title, content")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`);

    if (clauseError) console.error("Clause search error:", clauseError);
    setClauses(clauseData || []);

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔎 Search Legal Templates & Clauses</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter keyword (e.g. NDA, arbitration, confidentiality)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      {/* Results */}
      {!loading && searched && (
        <div className="space-y-8">
          {/* Templates Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">📄 Templates</h2>
            {templates.length === 0 ? (
              <p className="text-gray-500">No templates found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="border p-4 rounded bg-white shadow-sm"
                  >
                    <h3 className="font-bold">{tpl.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {tpl.description}
                    </p>
                    <Link
                      href={`/templates/${tpl.id}`}
                      className="text-blue-600 text-sm mt-2 inline-block"
                    >
                      View Template →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clauses Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">📜 Clauses</h2>
            {clauses.length === 0 ? (
              <p className="text-gray-500">No clauses found.</p>
            ) : (
              <div className="space-y-3">
                {clauses.map((clause) => (
                  <div
                    key={clause.id}
                    className="border p-4 rounded bg-white shadow-sm"
                  >
                    <h3 className="font-bold">{clause.title}</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-4">
                      {clause.content}
                    </p>
                    <Link
                      href={`/clauses/${clause.id}`}
                      className="text-blue-600 text-sm mt-2 inline-block"
                    >
                      View Clause →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
