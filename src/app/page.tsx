import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    id: 1,
    title: "Case Research",
    description:
      "Search and analyze millions of legal cases with advanced filtering and sorting options.",
  },
  {
    id: 2,
    title: "Document Summarization",
    description:
      "Quickly summarize lengthy legal documents and extract key information for efficient review.",
  },
  {
    id: 3,
    title: "Case Resource",
    description:
      "Access a library of resources, including articles, webinars, and tutorials, to enhance your legal knowledge.",
  },
  {
    id: 4,
    title: "Case Workspace",
    description:
      "Manage your cases, documents, and research in a centralized workspace for better organization and collaboration.",
  },
];

const footerLinks = [
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Contact Us", href: "#contact" },
];

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/9] md:aspect-[21/9] flex items-end">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
            
            <div className="relative z-10 p-8 md:p-16 max-w-3xl space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Empowering Legal Professionals with Advanced Research Tools
              </h1>
              <p className="text-base md:text-lg text-slate-200 font-medium">
                Access comprehensive legal databases, summarize complex
                documents, and classify cases efficiently. Enhance your
                legal research and case management with our intuitive
                platform.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                  {/* Placeholder for icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Legal AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
