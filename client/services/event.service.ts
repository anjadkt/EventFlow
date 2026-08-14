import { api } from "@/lib/api";
import { EventData } from "@/types/event.types";


export const createEvent = async (form: EventData) => {
  
  const res = await api("/events", {
    method: "POST",
    body: JSON.stringify(form)
  });

  return res.data;
}

export const updateEvent = async (form: EventData, eventId:number) => {
  
  const res = await api(`/events/${eventId}`, {
    method: "PUT",
    body: JSON.stringify(form)
  });

  return res.data;
}

export const getEvents = async () => {
  
  const res = await api("/events", {
    next: {
      revalidate: 60,
    },
  });

  return res.data;
}

export const getEachEvent = async (slug:string) => {

  const res = await api(`/events/${slug}`,{
    cache: "no-store",
  });

  return res.data;
}

export const getAttendees = async (id: number) => {
  
  const res = await api(`/events/${id}/attendees`,{
    cache: "no-store",
  });

  return res.data;

}

export const getMyEvents = async () => {
  
  const res = await api("/events/my-events");

  return res.data;
}