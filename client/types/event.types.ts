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

