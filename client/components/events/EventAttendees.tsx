"use client";

import { getAttendees } from "@/services/event.service";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { PageLoader } from "../ui/Loader";

type Props = {
  id: number;
  maxTickets: number;
};

export default function EventAttendees({ id, maxTickets }: Props) {
  const [attendeesList, setAttendeesList] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    let isMounted = true;

    (async () => {
      setLoading(true);
      try {
        const data = await getAttendees(id);
        if (isMounted) {
          setAttendeesList(data || []);
        }
      } catch (error) {
        console.error("Error while loading attendees", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 relative min-h-[220px] flex flex-col justify-center">
        {loading ? <PageLoader/> : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Registered Attendees</h2>
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                {attendeesList?.length || 0} / {maxTickets} Seats Filled
              </span>
            </div>

            {!attendeesList || attendeesList.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <User className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-medium">No RSVPs yet</p>
                <p className="text-xs text-slate-500">
                  Be the first to register for this event!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {attendeesList.map((rsvp: any) => (
                  <div
                    key={rsvp.user.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
                      {rsvp.user.name ? rsvp.user.name.charAt(0) : "A"}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate">
                        {rsvp.user.name || "Anonymous Attendee"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}