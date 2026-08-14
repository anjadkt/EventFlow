"use client"

import EventCard from "@/components/events/EventCard";
import { getMyEvents } from "@/services/event.service";
import { Calendar, Sparkles, Grid, Plus } from "lucide-react";
import { EventListItem } from "@/types/event.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/ui/Loader";

export default function MyEvents() {

  const [events, setEvents] = useState<null | EventListItem[]> (null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyEvents();
        setEvents(data);
      } catch (error) {
        console.log("Error while loading user events", error)
      }
    })();
  }, []);

  if(!events) return <PageLoader />

  return (
    <main className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. HERO / HEADER CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl shadow-slate-950/50">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Host Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                My Events
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Manage, monitor, and track engagement for all the events you are hosting.
              </p>
            </div>

            {/* Action Bar: Counter Badge & Create Button */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
                <Grid className="w-4 h-4 text-indigo-400" />
                <span>
                  Hosting <strong className="text-white font-bold">{events.length}</strong> event{events.length === 1 ? "" : "s"}
                </span>
              </div>

              <Link
                href="/events/create"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. EVENT GRID SECTION */}
        <section className="pt-4 border-t border-slate-800/80">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 text-center px-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-inner">
                <Calendar className="w-8 h-8 text-slate-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No Created Events Yet</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  You haven&apos;t published or hosted any events. Start hosting your first workshop or meetup today!
                </p>
              </div>
              <Link
                href="/events/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Event</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard showEdit={true} key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}