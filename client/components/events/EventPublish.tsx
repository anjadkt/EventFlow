"use client";

import React from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";

type Props = {
  declaration: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EventPublish({ declaration, onChange }: Props) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Review & Publish
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Double check your details and review the terms before going live.
        </p>
      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-sm flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-indigo-200">Ready for Launch</p>
          <p className="text-xs text-indigo-300/80 mt-0.5">
            Your event details are complete. Once published, attendees will be able to discover and register for your event.
          </p>
        </div>
      </div>

      {/* Declaration Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Organizer Declaration
        </h3>

        <label
          htmlFor="event-declaration"
          className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            declaration
              ? "bg-indigo-950/20 border-indigo-500/50"
              : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
          }`}
        >
          <input
            id="event-declaration"
            type="checkbox"
            checked={declaration}
            onChange={onChange}
            className="mt-1 h-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/40 focus:ring-offset-slate-900 accent-indigo-500 cursor-pointer"
          />

          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-semibold text-slate-200">
              I confirm that all provided event details are accurate and comply with terms.
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              By checking this box, I declare that I am the authorized organizer for this event, all venue and ticketing information is true, and this event complies with community guidelines and safety regulations.
            </p>
          </div>
        </label>
        
      </div>
    </div>
  );
}