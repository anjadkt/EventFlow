import ProfileDropDown from "../ui/ProfileDropDown";
import SearchBar from "../ui/Search";

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Event<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
              <span className="text-indigo-600 dark:text-indigo-400">.</span>
            </span>
          </a>
        </div>

        {/* Search Bar & Profile icon */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          
          <SearchBar/>

          <ProfileDropDown />

        </div>

      </div>
    </header>
  );
}