import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
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
  );
}
