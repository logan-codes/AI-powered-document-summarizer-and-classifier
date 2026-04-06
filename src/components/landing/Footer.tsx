const footerLinks = [
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  return (
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
  );
}
