export type EventForm = {
  title: string;
  description: string;

  startDate: string;
  endDate: string;
  deadline: string;

  isFree: boolean;
  price: number | undefined;
  maxTickets: number | undefined;

  socialLinks: SocialLink[];

  location: string;
  locationLink: string;
  venueName: string;
  helpEmail: string
};

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED"

export type SocialPlatforms = 
| "INSTAGRAM"
| "TWITTER"
| "LINKEDIN"
| "FACEBOOK"
| "YOUTUBE"
| "TIKTOK";

export type SocialLink = {
  platform: SocialPlatforms;
  url: string;
}

export type MediaName = "BANNER" | "LOGO" | "THUMBNAIL";

export type EventMedia = {
    name: MediaName;
    file?: File | string | null;
}[]

export type MediaConfigItem = {
  key: string;
  title: string;
  specsTitle: string;
  specs: string[];
  accept: string;
};

export type EventMediaType = { name: MediaName, url:string}


export type EventData = EventForm & { media :EventMediaType[] } & { status : EventStatus }

export type EventListItem = {
  id: number;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  venueName: string;
  location: string;
  isFree: boolean;
  price: number;
  status: string;
  media: EventMediaType[];
  organiser: { name: string };
};


export type Organiser = {
  id: number;
  name: string;
  email: string;
};


export type EventDetail = {
  id: number;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  deadline: string;
  venueName: string;
  location: string;
  locationLink?: string;
  isFree: boolean;
  price: number;
  maxTickets: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  media: EventMediaType[];
  organiser: Organiser;
  socialLinks: SocialLink[];
};