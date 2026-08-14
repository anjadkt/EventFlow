import { api } from "@/lib/api"


export const getEventRsvp = async (eventId: number) => {
  
  const res = await api(`/rsvp/${eventId}`);

  return res.data;
  
}


export const createRsvp = async (eventId: number) => {
  const res = await api(`/rsvp/${eventId}`, {
    method : "POST"
  });

  return res.data;
}