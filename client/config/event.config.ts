import { MediaConfigItem, MediaName, SocialPlatforms } from "@/types/event.types";
import { MessageCircle } from "lucide-react";

export const STEPS = [
  { step: 1, label: "Overview", description: "Basic details & title" },
  { step: 2, label: "Gallery", description: "Media & banners" },
  { step: 3, label: "Contact", description: "Organizer info" },
  { step: 4, label: "Publish", description: "Review & launch" },
];



export const MEDIA_CONFIG: Record<MediaName, MediaConfigItem> = {
  LOGO: {
    key: "logo",
    title: "Event Logo",
    specsTitle: "Logo Specifications",
    specs: [
      "Recommended ratio: 1:1 (Square)",
      "Recommended size: 512 x 512 px",
      "Formats: PNG, SVG, WEBP",
      "Maximum file size: 5MB",
    ],
    accept: "image/png, image/jpeg, image/webp, image/svg+xml",
  },
  THUMBNAIL: {
    key: "image",
    title: "Event Thumbnail",
    specsTitle: "Thumbnail Specifications",
    specs: [
      "Recommended aspect ratio: 16:9",
      "Recommended resolution: 1280 x 720 px",
      "Formats: PNG, JPG, WEBP",
      "Maximum file size: 8MB",
    ],
    accept: "image/png, image/jpeg, image/webp",
  },
  BANNER: {
    key: "banner",
    title: "Event Banner",
    specsTitle: "Banner Specifications",
    specs: [
      "Recommended aspect ratio: 3:1 (Wide)",
      "Recommended resolution: 1920 x 640 px",
      "Used as main page header backdrop",
      "Maximum file size: 10MB",
    ],
    accept: "image/png, image/jpeg, image/webp",
  }
};


export const SOCIAL_PLATFORMS: { value: SocialPlatforms; label: string; icon: React.ElementType }[] = [
  { value: "INSTAGRAM" as SocialPlatforms, label: "Instagram", icon: MessageCircle },
  { value: "TWITTER" as SocialPlatforms, label: "Twitter / X", icon: MessageCircle },
  { value: "LINKEDIN" as SocialPlatforms, label: "LinkedIn", icon: MessageCircle },
  { value: "FACEBOOK" as SocialPlatforms, label: "Facebook", icon: MessageCircle },
  { value: "YOUTUBE" as SocialPlatforms, label: "YouTube", icon: MessageCircle },
];