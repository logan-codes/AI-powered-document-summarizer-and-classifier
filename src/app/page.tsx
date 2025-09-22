
const features = [
  {
    id: 1,
    
    title: "Case Research",
    description:
      "Search and analyze millions of legal cases with advanced filtering and sorting options.",
    iconAlt: "Vector",
  },
  {
    id: 2,
    
    title: "Document Summarization",
    description:
      "Quickly summarize lengthy legal documents and extract key information for efficient review.",
    iconAlt: "Vector",
  },
  {
    id: 3,
    
    title: "Case Resource",
    description:
      "Access a library of resources, including articles, webinars, and tutorials, to enhance your legal knowledge.",
    iconAlt: "Vector",
  },
  {
    id: 4,
    
    title: "Case Workspace",
    description:
      "Manage your cases, documents, and research in a centralized workspace for better organization and collaboration.",
    iconAlt: "Vector",
  },
];

const footerLinks = [
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Contact Us", href: "#contact" },
];

export default function Landing(){
  return (
    <div className="flex flex-col  items-center justify-between relative bg-white">

      <main className=" items-center justify-center flex-[0_0_auto] flex flex-col relative">
        <section className="w-[1016px] flex-[0_0_auto] flex flex-col items-start relative">
          <div className="p-4 flex-1 grow flex flex-col items-start relative self-stretch w-full">
            <div className="relative self-stretch w-full h-[480px] rounded-lg overflow-hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%)]">
              <div className="flex flex-col w-[848px] items-start gap-2 absolute top-[285px] left-[68px]">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Black',Helvetica] font-black text-white text-5xl tracking-[-2.00px] leading-[60px]">
                    Empowering Legal Professionals with Advanced Research Tools
                  </h2>
                </div>

                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-6">
                    Access comprehensive legal databases, summarize complex
                    documents, and classify cases efficiently. Enhance your
                    legal research and case management with our intuitive
                    platform.
                  </p>
                </div>
              </div>

              <button
                className="inline-flex min-w-[84px] max-w-[480px] h-12 items-center justify-center px-5 py-0 absolute top-[493px] left-[216px] bg-[#197fe5] rounded-lg overflow-hidden hover:bg-[#1565c0] focus:outline-none focus:ring-2 focus:ring-[#197fe5] focus:ring-offset-2 transition-colors"
                type="button"
                aria-label="Get started with Legal AI"
              >
                <div className="inline-flex items-center flex-col relative flex-[0_0_auto]">
                  <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-base text-center tracking-[0] leading-6 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                    Get Started
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col w-[984px] items-center justify-center gap-10 px-4 py-10 relative flex-[0_0_auto]">
          <div className="flex-col items-start gap-4 flex relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col max-w-[720px] w-[720px] items-start relative flex-[0_0_auto]">
              <h2 className="[font-family:'Inter-Black',Helvetica] font-black text-4xl tracking-[-1.00px] leading-[45px] relative self-stretch mt-[-1.00px] text-[#0c141c]">
                Key Features
              </h2>
            </div>

            <div className="flex flex-col max-w-[720px] w-[720px] items-start relative flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#0c141c] text-base tracking-[0] leading-6">
                Explore the powerful tools designed to streamline your legal
                workflow and improve your research outcomes.
              </p>
            </div>
          </div>

          <div className="gap-3 flex-[0_0_auto] flex flex-col items-start relative self-stretch w-full">
            <div className="flex items-center justify-between relative flex-1 self-stretch w-full grow">
              {features.map((feature) => (
                <article
                  key={feature.id}
                  className="flex flex-col w-[223px] items-start gap-3 p-4 relative self-stretch bg-[#f7f9fc] rounded-lg border border-solid border-[#d1dbe8]"
                >
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative flex-1 w-6 grow">
                      
                    </div>
                  </div>

                  <div className="flex items-start gap-1 self-stretch w-full flex-col relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <h3 className="[font-family:'Inter-Bold',Helvetica] font-bold text-base tracking-[0] leading-5 relative self-stretch mt-[-1.00px] text-[#0c141c]">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#4f7296] text-sm tracking-[0] leading-[21px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col w-[1440px] items-start gap-2.5 p-2.5 absolute top-[1024px] left-0">
        <div className="flex h-[152px] items-start justify-center relative self-stretch w-full">
          <div className="max-w-[960px] items-start flex-1 grow flex flex-col relative">
            <div className="gap-6 px-5 py-10 flex-1 self-stretch w-full grow flex flex-col items-start relative">
              <nav
                className="flex-wrap items-center justify-between gap-[24px_24px] flex relative self-stretch w-full flex-[0_0_auto]"
                role="navigation"
                aria-label="Footer navigation"
              >
                {footerLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-40 items-center relative"
                  >
                    <a
                      href={link.href}
                      className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#4f7296] text-base text-center tracking-[0] leading-6 hover:text-[#197fe5] focus:outline-none focus:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#4f7296] text-base text-center tracking-[0] leading-6">
                  © 2025 Legal AI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
