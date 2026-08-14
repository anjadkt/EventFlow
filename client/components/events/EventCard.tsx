import Link from "next/link";
import { Calendar, MapPin, ArrowRight, User, Edit3 } from "lucide-react";
import { EventListItem } from "@/types/event.types";
import { formatDate } from "@/utils/formatDate";

type EventCardProps = {
  event: EventListItem;
  showEdit?: boolean;
};

export default function EventCard({ event, showEdit = false }: EventCardProps) {
  
  const thumbnailMedia = event.media?.find((m) => m.name === "THUMBNAIL");
  const imageUrl = thumbnailMedia?.url || "/images/event-placeholder.jpg";

  return (
    <div className="group flex flex-col bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Thumbnail Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

        {/* Price / Free Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-md border ${
              event.isFree || event.price === 0
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-md"
                : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 backdrop-blur-md"
            }`}
          >
            {event.isFree || event.price === 0 ? "Free" : `₹ ${event.price}`}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Date & Organiser */}
        <div className="flex items-center justify-between text-xs text-indigo-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.startDate)}</span>
          </div>

          {event.organiser?.name && (
            <div className="flex items-center gap-1 text-slate-400 truncate max-w-[120px]">
              <User className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">{event.organiser.name}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Venue / Location */}
        <div className="flex items-start gap-2 text-xs text-slate-400 mt-auto">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="line-clamp-1">{event.venueName || event.location}</p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 mt-auto flex items-center gap-2">
          <Link
            href={`/events/${event.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-indigo-600 hover:text-white border border-slate-700/80 hover:border-indigo-500 transition-all group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* Edit Button  */}
          {showEdit && (
            <Link
              href={`/events/${event.slug}/edit`} 
              title="Edit Event"
              className="flex items-center justify-center p-2.5 rounded-xl text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-all"
            >
              <Edit3 className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}