import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEachEvent } from "@/services/event.service";
import EventNavTabs from "@/components/events/EventNavTabs";
import { EventDetail } from "@/types/event.types";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Mail,
  User,
  Globe,
  Ticket,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { formatDate, formatFullDateTime, formatTime } from "@/utils/formatDate";
import EventAttendees from "@/components/events/EventAttendees";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event: EventDetail | null = await getEachEvent(slug);

  if (!event) {
    notFound();
  }

  const bannerMedia = event.media?.find(
    (m) => m.name === "BANNER" || m.name === "THUMBNAIL"
  );
  const logoMedia = event.media?.find((m) => m.name === "LOGO");

  const bannerUrl =
    bannerMedia?.url || "/images/event-banner-placeholder.jpg";
  const logoUrl = logoMedia?.url;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-[200px]">
      {/* 1. HEADER & HERO BANNER SECTION */}
      <section className="relative w-full border-b border-slate-800/40">
        
        {/* Top Banner Background */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
          
          {/* Back Button Overlay */}
          <Link
            href="/"
            className="absolute top-6 left-4 sm:left-8 z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-900/90 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md text-xs font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>

          <img
            src={bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        </div>

        {/* Hero Content Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 sm:-mt-36 relative z-10 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Title, Logo, Event Date, Pricing */}
            <div className="flex flex-col sm:flex-row items-start gap-5 w-full md:w-auto">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Event Logo"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-700/60 bg-slate-900/90 shadow-2xl shrink-0"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 backdrop-blur-md">
                  <Ticket className="w-10 h-10 text-indigo-400" />
                </div>
              )}

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      event.isFree || event.price === 0
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                    }`}
                  >
                    {event.isFree || event.price === 0 ? "Free Event" : `₹${event.price}`}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-slate-800/80 bg-slate-900/40 text-slate-400 uppercase tracking-wider">
                    {event.status}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {event.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-indigo-300/90 font-medium">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{formatFullDateTime(event.startDate)}</span>
                </div>
              </div>
            </div>

            {/* Deadline & RSVP Action Card */}
            <div className="w-full md:w-auto border border-slate-800/60 bg-slate-900/30 p-5 rounded-2xl flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-stretch gap-4 shrink-0 backdrop-blur-sm">
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Final day to RSVP</span>
                </div>
                <p className="text-slate-200 font-medium">
                  {formatFullDateTime(event.deadline)}
                </p>
              </div>

              <button className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2">
                <span>Register Now</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. NAVIGATION BAR (Overview / Attendees) */}
      <EventNavTabs
        organiserId={event.organiser.id}
        children={{
          overview: (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Description & Venue */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Event Description */}
                  <section className="border border-slate-800/50 rounded-2xl p-6 sm:p-8 space-y-4">
                    <h2 className="text-lg font-bold text-white tracking-tight">About the Event</h2>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {event.description}
                    </p>
                  </section>

                  {/* Venue & Location Details */}
                  <section className="border border-slate-800/50 rounded-2xl p-6 sm:p-8 space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                      <span>Location & Venue</span>
                    </h2>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-slate-100">
                        {event.venueName}
                      </h3>
                      <p className="text-slate-400 text-sm leading-normal">
                        {event.location}
                      </p>
                    </div>

                    {event.locationLink && (
                      <div className="pt-2">
                        <a
                          href={event.locationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-semibold text-indigo-300 hover:text-white transition-all"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </section>
                </div>

                {/* Right Column: Organiser & Capacity */}
                <div className="space-y-6">
                  {event.organiser && (
                    <section className="border border-slate-800/50 rounded-2xl p-6 space-y-4">
                      <h3 className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                        Organised By
                      </h3>

                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-full border border-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-white truncate text-sm">
                            {event.organiser.name}
                          </h4>
                          <a
                            href={`mailto:${event.organiser.email}`}
                            className="text-xs text-slate-400 hover:text-indigo-400 truncate block transition-colors"
                          >
                            {event.organiser.email}
                          </a>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Quick Capacity Details */}
                  <div className="border border-slate-800/50 rounded-2xl p-6 space-y-3 text-xs text-slate-400">
                    <div className="flex justify-between items-center">
                      <span>Max Capacity</span>
                      <span className="font-semibold text-slate-200">{event.maxTickets} seats</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3. SCHEDULE & TIMELINE BREAKDOWN SECTION */}
              <section className="border border-slate-800/50 rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span>Important Dates & Schedule</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Start Date */}
                  <div className="p-4 rounded-xl border border-slate-800/60 space-y-1">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Event Begins
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatTime(event.startDate)}
                    </p>
                  </div>

                  {/* End Date */}
                  <div className="p-4 rounded-xl border border-slate-800/60 space-y-1">
                    <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                      Event Ends
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {formatDate(event.endDate)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatTime(event.endDate)}
                    </p>
                  </div>

                  {/* RSVP Deadline */}
                  <div className="p-4 rounded-xl border border-slate-800/60 space-y-1">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      Registration Deadline
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {formatDate(event.deadline)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatTime(event.deadline)}
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. SOCIAL LINKS & HELP CONTACT SECTION */}
              <footer className="border border-slate-800/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-sm font-bold text-white">Have questions?</h3>
                  <p className="text-xs text-slate-400">
                    Reach out directly to the organiser or connect through social links.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {event.organiser?.email && (
                    <a
                      href={`mailto:${event.organiser.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Contact Organiser</span>
                    </a>
                  )}

                  {event.socialLinks && event.socialLinks.length > 0 && (
                    <div className="flex items-center gap-2">
                      {event.socialLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
                          title={link.platform || "Social Link"}
                        >
                          <Globe className="w-4 h-4 text-indigo-400" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </footer>

            </div>
          ),
          attendees: (
            <EventAttendees
              id={event.id}
              maxTickets={event.maxTickets}
            />
          ),
        }}
      />
    </main>
  );
}