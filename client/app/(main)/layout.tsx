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

      <main className="flex-1 w-full mx-auto pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}