"use client";

import React from "react";
import {
  MapPin,
  Share2,
  Mail,
  Plus,
  Trash2,
} from "lucide-react";
import Input from "../ui/Input";
import { EventForm, SocialLink, SocialPlatforms } from "@/types/event.types";
import { SOCIAL_PLATFORMS } from "@/config/event.config";

type Props = {
  data: EventForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors?: Record<string, string>;
  handleSocials: (socials: SocialLink[]) => void;
};

export default function CreateContact({ data, onChange, errors, handleSocials }: Props) {
  
  const handleAddSocial = () => {
    const existingPlatforms = data.socialLinks.map((s) => s.platform);
    const availablePlatform =
      SOCIAL_PLATFORMS.find((p) => !existingPlatforms.includes(p.value))?.value || "INSTAGRAM";

    const newSocial: SocialLink = {
      platform: availablePlatform as SocialPlatforms,
      url: "",
    };

    handleSocials([...data.socialLinks, newSocial]);
  };

  const handleRemoveSocial = (platform: SocialPlatforms) => {
    const updated = data.socialLinks.filter((item) => item.platform !== platform);
    handleSocials(updated);
  };

  const handleSocialChange = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const updated = data.socialLinks.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    handleSocials(updated);
  };

  const sectionHeaderStyles =
    "flex items-center gap-2 text-indigo-400 pb-3 border-b border-slate-800/80 pl-1 border-l-2 border-l-indigo-500 font-bold uppercase tracking-wider text-xs";

  const labelStyle = "text-xs font-bold pb-3 text-white/80 uppercase tracking-wider";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Contact & Location</h2>
        <p className="text-sm text-slate-400 mt-1">
          Provide venue details and support channels so attendees can easily reach out.
        </p>
      </div>

      {/* SECTION 1: ORGANIZER SUPPORT EMAIL */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className={sectionHeaderStyles}>
          <Mail className="w-4 h-4 ml-2" />
          <span>Support Contact</span>
        </div>

        <Input
          label="Organizer Email"
          labelClassName={labelStyle}
          name="helpEmail"
          type="email"
          placeholder="organizer@domain.com"
          value={data?.helpEmail || ""}
          onChange={onChange}
          error={errors?.helpEmail}
          className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
        />
      </section>

      {/* SECTION 2: VENUE & ADDRESS DETAILS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className={sectionHeaderStyles}>
          <MapPin className="w-4 h-4 ml-2" />
          <span>Venue & Address</span>
        </div>

        <div className="space-y-4">
          <Input
            label="Venue Name"
            labelClassName={labelStyle}
            name="venueName"
            placeholder="e.g., Grand Convention Center / Online"
            value={data?.venueName || ""}
            onChange={onChange}
            error={errors?.venueName}
            className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
          />

          <Input
            label="Full Address"
            labelClassName={labelStyle}
            name="location"
            placeholder="Street name, City, State, ZIP code"
            value={data.location || ""}
            onChange={onChange}
            error={errors?.location}
            className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
          />

          <Input
            label="Google Maps / Location Link"
            labelClassName={labelStyle}
            name="locationLink"
            type="url"
            placeholder="https://maps.google.com/..."
            value={data.locationLink || ""}
            onChange={onChange}
            error={errors?.locationLink}
            className="bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
          />
        </div>
      </section>

      {/* SECTION 3: SOCIAL MEDIA LINKS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className={sectionHeaderStyles + " border-b-0 pb-0"}>
            <Share2 className="w-4 h-4 ml-2" />
            <span>Social Media Links</span>
          </div>

          <button
            type="button"
            onClick={handleAddSocial}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social Link</span>
          </button>
        </div>

        {data.socialLinks.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-4">
            No social media links added yet. Click above to add one.
          </p>
        ) : (
          <div className="space-y-4">
            {data.socialLinks.map((social, index) => {
              const SelectedIcon =
                SOCIAL_PLATFORMS.find((p) => p.value === social.platform)?.icon || Share2;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80"
                >
                  {/* Select Platform Dropdown */}
                  <div className="sm:w-48 relative flex-shrink-0">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Platform
                    </label>
                    <div className="relative flex items-center">
                      <SelectedIcon className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                      <select
                        value={social.platform}
                        onChange={(e) =>
                          handleSocialChange(index, "platform", e.target.value)
                        }
                        className="w-full pl-9 pr-8 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                      >
                        {SOCIAL_PLATFORMS.map((platform) => (
                          <option key={platform.value} value={platform.value}>
                            {platform.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Input for URL */}
                  <div className="flex-1">
                    <Input
                      label="Profile / Page URL"
                      labelClassName="text-[10px] text-slate-400 uppercase tracking-wider"
                      placeholder={`https://${social.platform.toLowerCase()}.com/...`}
                      value={social.url}
                      onChange={(e) =>
                        handleSocialChange(index, "url", e.target.value)
                      }
                      error={errors?.[`social_${index}`]}
                      className="bg-slate-900 border-slate-700/80 text-white placeholder:text-slate-600 focus:border-indigo-500"
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-end justify-end sm:self-end pb-0.5">
                    <button
                      type="button"
                      onClick={() => handleRemoveSocial(social.platform)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove social link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}