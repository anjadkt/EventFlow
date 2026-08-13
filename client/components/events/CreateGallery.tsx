"use client";

import React from "react";
import { Image as ImageIcon, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { EventMedia, MediaName } from "@/types/event.types";
import { MEDIA_CONFIG } from "@/config/event.config";

type PropsType = {
  error: string | null;
  gallery: EventMedia;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: MediaName
  ) => void;
};

export default function CreateGallery({ error, gallery, onFileChange }: PropsType) {
  
  const sectionHeaderStyles =
    "flex items-center gap-2.5 text-indigo-400 pb-3 border-b border-slate-800/80 pl-1 border-l-2 border-l-indigo-500";
  const sectionTitleStyles = "text-xs font-bold uppercase tracking-widest text-slate-500";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Event Gallery</h2>
        <p className="text-sm text-slate-400 mt-1">
          Upload essential brand assets and visual media for your event layout.
        </p>
      </div>

      {/* Dynamic Sections Loop */}
      {gallery?.map((item, index) => {
        
        const config = MEDIA_CONFIG[item.name];

        if (!config) return null;

        const selectedFile = item.file;
        const inputId = `${config.key}-upload-${index}`;

        return (
          <section
            key={`${item.name}-${index}`}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md"
          >
            {/* Header */}
            <div className={sectionHeaderStyles}>
              <ImageIcon className="w-4 h-4 ml-2" />
              <h3 className={sectionTitleStyles}>{config.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Specifications */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">{config.specsTitle}</h4>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  {config.specs.map((spec, specIdx) => (
                    <li key={specIdx}>{spec}</li>
                  ))}
                </ul>
              </div>

              {/* Input Area */}
              <div>
                <label
                  htmlFor={inputId}
                  className={`h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all cursor-pointer bg-slate-950/60 ${
                      selectedFile
                      ? "border-emerald-500/80 hover:border-emerald-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <input
                    id={inputId}
                    name={item.name}
                    type="file"
                    accept={config.accept}
                    className="hidden"
                    onChange={(e) => onFileChange(e, item.name)}
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center space-y-2 text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                      <span className="text-xs font-medium text-slate-200 truncate max-w-[200px]">
                        {typeof selectedFile === "string"
                          ? selectedFile
                          : selectedFile.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Click to replace file
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-slate-400">
                      <Upload className="w-6 h-6 text-indigo-400" />
                      <span className="text-xs font-medium text-slate-300">
                        Upload {config.title}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Drag & drop or browse
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </section>
        );
      })}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium mt-2 animate-in fade-in-50">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}