import { NavigationBarSection } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationBarSection />
        {children}
      </body>
    </html>
  );
}
