export type SocialPlatform = "INSTAGRAM" | "TWITTER" | "LINKEDIN" | "FACEBOOK" | "YOUTUBE" | "TIKTOK";

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";

export type RSVPStatus = "GOING" | "MAYBE_GOING" | "NOT_GOING";

export type MediaNames = "IMAGE" | "LOGO" | "BANNER" | "THUMBNAIL"

export type SocialLinkInput = {
    platform: SocialPlatform;
    url: string;
};

export type MediaInput = {
    name: MediaNames;
    url : string
}

export type CreateEventPayload = {
    title: string;
    description: string;

    startDate: Date;
    endDate: Date;
    deadline: Date;

    isFree: boolean;
    price?: number;
    maxTickets?: number;
    
    socialLinks?: SocialLinkInput[];
    media: MediaInput[];

    location: string;
    locationLink: string;
    venueName: string;
    status: EventStatus;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;
