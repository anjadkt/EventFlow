"use client";

import { useEffect, useState } from "react";
import { formatFullDateTime } from "@/utils/formatDate";
import { AlertCircle, CheckCircle2, XCircle, Clock, ShieldCheck } from "lucide-react";
import { createRsvp, getEventRsvp } from "@/services/rsvp.service";
import Button from "../ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {
  eventId: number;
  deadline: string;
  organiserId: number;
};

export default function EventRsvpCta({
  organiserId,
  eventId,
  deadline,
}: Props) {

  const [loading, setLoading] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const isDeadlinePassed = now > deadlineDate;

  const { user } = useAuth();
  const isOrganiser = Boolean(user?.id && user.id === organiserId);
  const router = useRouter();

  const isAttending = rsvpStatus === "GOING" || rsvpStatus === "MAYBE_GOING";

  const handleRegOrCancel = async () => {
    if (isDeadlinePassed) return;
    if (!user) router.push("/auth");

    try {
      setLoading(true);
      const res = await createRsvp(eventId);
      setRsvpStatus(res.status);
    } catch (error:any) {
      console.log("RSVP Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOrganiser) return;

    let isMounted = true;
    (async () => {
      try {
        const res = await getEventRsvp(eventId);
        if (isMounted) {
          setRsvpStatus(res?.status || null);
        }
      } catch (error) {
        console.log("Error while loading event rsvp", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [eventId, isOrganiser]);

  return (
    <div className="w-full md:w-auto border border-slate-800/60 bg-slate-900/30 p-5 rounded-2xl flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-stretch gap-4 shrink-0 backdrop-blur-sm">
      {/* 1. STATUS BADGE & DEADLINE TEXT */}
      <div className="text-xs space-y-1">
        {isDeadlinePassed ? (
          <div className="flex items-center gap-1.5 text-rose-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>RSVP Closed</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Registration Deadline</span>
          </div>
        )}

        <p className="text-slate-200 font-medium">
          {formatFullDateTime(deadline)}
        </p>
      </div>

      {/* 2. CONDITIONAL BUTTON / ORGANISER STATES */}
      {isOrganiser ? (
        /* Organiser State */
        <div className="w-full py-3 px-6 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold text-sm rounded-xl flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>You are hosting this event</span>
        </div>
      ) : isDeadlinePassed ? (
        isAttending ? (
          /* State 1: Deadline passed & user IS registered -> Disabled button */
          <Button
            disabled
            className="w-full py-3 px-6 bg-slate-800/80 text-slate-400 border border-slate-700/50 font-semibold text-sm rounded-xl gap-2 cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>RSVP Closed (Registered)</span>
          </Button>
        ) : (
          /* State 2: Deadline passed & user is NOT registered -> Disabled button */
          <Button
            disabled
            className="w-full py-3 px-6 bg-slate-800/50 text-slate-500 border border-slate-800 font-semibold text-sm rounded-xl gap-2 cursor-not-allowed"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Registration Closed</span>
          </Button>
        )
      ) : isAttending ? (
        /* State 3: Deadline NOT passed & user IS registered -> Low-highlight Cancel button */
        <Button
          loading={loading}
          onClick={handleRegOrCancel}
          className="w-full py-3 px-6 bg-slate-800/80 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 font-semibold text-sm rounded-xl transition-all gap-2"
        >
          <span>Cancel RSVP</span>
          <XCircle className="w-4 h-4 text-slate-400 hover:text-rose-400" />
        </Button>
      ) : (
        /* State 4: Deadline NOT passed & user NOT registered -> Primary Register button */
        <Button
          loading={loading}
          onClick={handleRegOrCancel}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/25 gap-2"
        >
          <span>Register Now</span>
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}