"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

export default function SearchBar() {

  const { search, setSearch } = useSearch();

  return (
    <form className="relative block w-36 sm:w-56 lg:w-80">
      <input
        type="text"
        placeholder="Search events, topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-white bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-full shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-600 transition-all duration-200"
      />
      {/* Search Icon */}
      <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </form>
  );
}