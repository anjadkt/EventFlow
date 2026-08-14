import { getEachEvent } from "@/services/event.service";
import EventCreate from "../../create/page"
import { mediaState } from "@/config/event.config";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LoadEdit({ params }:Props) {

  const { slug } = await params;

  const data = await getEachEvent(slug);

  const initialForm = {
    title: data.title ?? "",
    description: data.description ?? "",

    startDate: data.startDate,

    endDate: data.endDate,

    deadline: data.deadline,

    isFree: data.isFree ?? true,
    price: data.isFree? undefined : data.price ,
    maxTickets: data.maxTickets ?? undefined,

    socialLinks: data.socialLinks ?? [],

    location: data.location ?? "",
    locationLink: data.locationLink ?? "",
    venueName: data.venueName ?? "",
    helpEmail: data.helpEmail ?? "",
  };

  const initialMedia: any = [];
  
  const media = [...mediaState]

  for (let v of media ) {
    const item = data.media.find((val: any) => val.name === v.name);
    if (item) {
      initialMedia.push({name:item.name, file:item.url})
    } else {
      initialMedia.push(v);
    }
  }

  return (
    <EventCreate
      eventId={data.id}
      isEdit={true}
      initialMedia={initialMedia}
      initialForm={initialForm}
    />
  )
}