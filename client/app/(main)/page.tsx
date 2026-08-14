import EventCard from "@/components/events/EventCard";
import { getEvents } from "@/services/event.service";
import { Calendar, Sparkles, Grid } from "lucide-react";
import { EventListItem } from "@/types/event.types";

export const revalidate = 60;

export default async function EventsPage() {

  const events: EventListItem[] = (await getEvents()) || [];

  return (
    <main className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. HERO / HEADER CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl shadow-slate-950/50">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Opportunities</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Upcoming Events
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Discover hackathons, tech summits, and local workshops. Connect with leaders and boost your skills.
              </p>
            </div>

            {/* Event Count Counter Badge */}
            <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
              <Grid className="w-4 h-4 text-indigo-400" />
              <span>
                Showing <strong className="text-white font-bold">{events.length}</strong> published event{events.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </section>

        {/* 3. EVENT GRID SECTION */}
        <section className="pt-4 border-t border-slate-800/80">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 text-center px-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 mb-4 shadow-inner">
                <Calendar className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No Events Found</h3>
              <p className="text-sm text-slate-400 max-w-sm">
                There are currently no upcoming events scheduled. Check back later for new announcements!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}