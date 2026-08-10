export type SocialPlatform = "INSTAGRAM" | "TWITTER" | "LINKEDIN" | "FACEBOOK" | "YOUTUBE" | "TIKTOK";

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";

export type SocialLinkInput = {
    platform: SocialPlatform;
    url: string;
};

export type CreateEventPayload = {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    deadline: Date;
    isFree: boolean;
    price?: number;
    maxTickets?: number;
    regLink?: string;
    website?: string;
    socialLinks?: SocialLinkInput[];
    location: string;
    locationLink: string;
    venueName: string;
    status: EventStatus;
    bannerImage?: string;
    logoImage?: string;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;
