"use client";

import React, { useState } from "react";
import { Info, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type EventNavTabsProps = {
  organiserId: number;
  children: {
    overview: React.ReactNode;
    attendees: React.ReactNode;
  };
};

export default function EventNavTabs({ organiserId, children }: EventNavTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "attendees">("overview");
  const { user } = useAuth();

  return (
    <div>
      {/* Navigation Bar below Header - Softened border & background blur */}
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8" aria-label="Event sections">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {organiserId === user?.id && (
              <button
                onClick={() => setActiveTab("attendees")}
                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-all ${
                  activeTab === "attendees"
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Attendees</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "overview" && children.overview}
        {activeTab === "attendees" && organiserId === user?.id && children.attendees}
      </div>
    </div>
  );
}