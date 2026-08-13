import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">

      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 pb-12 sm:pb-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}