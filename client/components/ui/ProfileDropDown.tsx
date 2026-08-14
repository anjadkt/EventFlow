"use client";

import React, { useState } from "react";
import { User, PlusCircle, LogOut, Calendar } from "lucide-react";
import Link from "next/link";
import { logoutService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function ProfileDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout, user } = useAuth();
  const router = useRouter();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log("Logout Error", error);
    } finally {
      setIsOpen(false);
    }
  };

  if (!user) {
    return (
      <Button
        onClick={() => router.push("/auth")}
        className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-indigo-400/30"
      >
        Sign in
      </Button>
    );
  }

  return (
    <div
      tabIndex={-1}
      onBlur={handleBlur}
      className="relative inline-block text-left outline-none"
    >
      {/* Profile Button*/}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2.5 cursor-pointer text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 rounded-full border border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/60 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        aria-label="User Profile"
        aria-expanded={isOpen}
      >
        <User className="w-5 h-5" />
      </button>

      {/* Dark Theme Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 py-2 text-slate-200 z-50 origin-top-right transition-all animate-in fade-in zoom-in-95 duration-150">
          
          {/* User Email Indicator */}
          {user.email && (
            <div className="px-4 py-2 border-b border-slate-800/80 mb-1">
              <p className="text-xs text-slate-400 truncate font-medium">
                {user.email}
              </p>
            </div>
          )}

          <div className="py-1">

            {/* My Events Action */}
            <Link
              href="/my-events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>My Events</span>
            </Link>

            {/* Create Event Action */}
            <Link
              href="/events/create"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-slate-800 hover:text-indigo-400 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-indigo-400" />
              <span>Create Event</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="border-t border-slate-800/80 pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}