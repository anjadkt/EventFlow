export type EventForm = {
  title: string;
  description: string;

  startDate: string;
  endDate: string;
  deadline: string;

  isFree: boolean;
  price: number | undefined;
  maxTickets: number | undefined;

  socialLinks: {
    platform:
      | "INSTAGRAM"
      | "TWITTER"
      | "LINKEDIN"
      | "FACEBOOK"
      | "YOUTUBE"
      | "TIKTOK";
    url: string;
  }[];

  location: string;
  locationLink: string;
  venueName: string;

  status: "DRAFT" | "PUBLISHED" ;
};

export type EventMedia = {
    name: "BANNER" | "VIDEO" | "LOGO" | "IMAGE";
    file: File;
}[]

