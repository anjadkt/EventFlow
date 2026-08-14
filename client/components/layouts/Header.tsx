import ProfileDropDown from "../ui/ProfileDropDown";
import SearchBar from "../ui/Search";
import Link from "next/link";

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0B0F17]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Event<span className="text-indigo-400">Flow</span>
            </span>
          </Link>
        </div>

        {/* Search Bar & Profile */}
        <div className="flex items-center gap-4">
          <div className="w-48 sm:w-64 lg:w-80">
            <SearchBar />
          </div>
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <ProfileDropDown />
        </div>

      </div>
    </header>
  );
}