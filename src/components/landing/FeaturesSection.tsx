import { Search, FileText, Library, LayoutDashboard } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Case Research",
    description:
      "Search and analyze millions of legal cases with advanced filtering and sorting options.",
    icon: Search,
  },
  {
    id: 2,
    title: "Document Summarization",
    description:
      "Quickly summarize lengthy legal documents and extract key information for efficient review.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Case Resource",
    description:
      "Access a library of resources, including articles, webinars, and tutorials, to enhance your legal knowledge.",
    icon: Library,
  },
  {
    id: 4,
    title: "Case Workspace",
    description:
      "Manage your cases, documents, and research in a centralized workspace for better organization and collaboration.",
    icon: LayoutDashboard,
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Key Features
        </h2>
        <p className="text-lg text-slate-600">
          Explore the powerful tools designed to streamline your legal
          workflow and improve your research outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <article
            key={feature.id}
            className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
