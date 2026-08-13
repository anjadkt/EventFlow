import { api } from "@/lib/api";
import { EventData } from "@/types/event.types";


export const createEvent = async (form: EventData) => {
  
  const response = await api("/events", {
    method: "POST",
    body: JSON.stringify(form)
  });

  return response.data;
}

export const getEvents = async () => {
  
  const response = await api("/events", {
    next: {
      revalidate: 60,
    },
  });

  return response.data;
}