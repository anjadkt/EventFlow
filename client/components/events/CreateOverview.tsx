"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { DollarSign, FileText, Clock } from "lucide-react";
import { EventForm } from "@/types/event.types";

type PropsType = {
  error : any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  form: EventForm,
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CreateOverview({ error, form, onChange, onToggle }: PropsType) {

  const labelStyles = "block text-sm uppercase tracking-wider text-white mb-2";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Event Overview</h2>
      </div>

      {/* SECTION 1: DETAILS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex items-center gap-2.5 text-indigo-400 pb-3 border-b border-slate-800/80 pl-1 border-l-2 border-l-indigo-500">
          <FileText className="w-4 h-4 ml-2" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Event Details
          </h3>
        </div>

        <div className="space-y-5">
          <Input
            onChange={onChange}
            value={form.title}
            error={error?.title}
            labelClassName={labelStyles}
            label="Event Title"
            name="title"
            type="text"
            placeholder="e.g. Next.js Developer Meetup 2026"
            className="bg-slate-950/60 border-slate-700/80 text-white placeholder-slate-500 focus:border-indigo-500 hover:border-slate-600"
          />

          <div className="space-y-1.5 w-full text-left">
            <label className={labelStyles}>
              Description
            </label>
            <textarea
              onChange={onChange}
              value={form.description}
              name="description"
              rows={4}
              placeholder="Tell people what your event is about, key highlights, speakers, etc..."
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-950/60 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                error?.description
                  ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-700/80 hover:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              }`}
            />
            {error?.description && (
              <p className="text-xs text-red-400 font-medium mt-1 animate-in fade-in-50">
                {error.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: TIMINGS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex items-center gap-2.5 text-indigo-400 pb-3 border-b border-slate-800/80 pl-1 border-l-2 border-l-indigo-500">
          <Clock className="w-4 h-4 ml-2" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Event Timings & Deadlines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            value={form.startDate}
            onChange={onChange}
            error={error?.startDate}
            labelClassName={labelStyles}
            label="Start Date & Time"
            name="startDate"
            type="datetime-local"
            className="bg-slate-950/60 border-slate-700/80 text-white [color-scheme:dark] focus:border-indigo-500 hover:border-slate-600"
          />

          <Input
            value={form.endDate}
            onChange={onChange}
            error={error?.endDate}
            labelClassName={labelStyles}
            label="End Date & Time"
            name="endDate"
            type="datetime-local"
            className="bg-slate-950/60 border-slate-700/80 text-white [color-scheme:dark] focus:border-indigo-500 hover:border-slate-600"
          />

          <Input
            value={form.deadline}
            onChange={onChange}
            error={error?.deadline}
            labelClassName={labelStyles}
            label="Registration Deadline"
            name="deadline"
            type="datetime-local"
            className="bg-slate-950/60 border-slate-700/80 text-white [color-scheme:dark] focus:border-indigo-500 hover:border-slate-600"
          />
        </div>
      </section>

      {/* SECTION 3: PRICING & CAPACITY */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md">
        <div className="flex items-center gap-2.5 text-indigo-400 pb-3 border-b border-slate-800/80 pl-1 border-l-2 border-l-indigo-500">
          <DollarSign className="w-4 h-4 ml-2" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Pricing & Tickets
          </h3>
        </div>

        <div className="space-y-6">
          {/* Free Event Toggle Switch */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700/80 transition-colors">
            <div>
              <p className="text-sm font-bold text-slate-100">Free Event</p>
              <p className="text-xs text-slate-400">
                Turn on if attendees do not need to pay for tickets
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={onToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              error={form.isFree? "" : error?.price}
              labelClassName={labelStyles}
              label="Registration Fee"
              name="price"
              type="number"
              min="0"
              step="0.01"
              disabled={form.isFree}
              value={form.price || 0}
              onChange={onChange}
              placeholder={form.isFree ? "0.00" : "e.g. 30"}
              className="bg-slate-950/60 border-slate-700/80 text-white disabled:opacity-40 disabled:cursor-not-allowed focus:border-indigo-500 hover:border-slate-600"
            />

            <Input
              value={form.maxTickets || 0}
              onChange={onChange}
              error={error?.maxTickets}
              labelClassName={labelStyles}
              label="Maximum Ticket Count"
              name="maxTickets"
              type="number"
              min="1"
              placeholder="e.g. 150"
              className="bg-slate-950/60 border-slate-700/80 text-white focus:border-indigo-500 hover:border-slate-600"
            />
          </div>
        </div>
      </section>

    </div>
  );
}