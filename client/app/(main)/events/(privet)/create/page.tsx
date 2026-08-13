"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Check, ArrowLeft, ArrowRight, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateOverview from "@/components/events/CreateOverview";
import CreateGallery from "@/components/events/CreateGallery";
import CreateContact from "@/components/events/CreateContact";
import EventPublish from "@/components/events/EventPublish";
import { STEPS } from "@/config/event.config";
import { EventForm, EventMedia } from "@/types/event.types";
import { overviewValidation } from "@/validations/event.validate";

const initialState = {
        title: "",
        description: "",

        startDate: "",
        endDate: "",
        deadline: "",

        price: "",
        maxTickets: "",

        location: "",
        locationLink: "",
        venueName: ""
}

export default function EventCreate() {
  const [currentStep, setCurrentStep] = useState(2);
  const [form, setForm] = useState<EventForm>({

      title: "",
      description: "",

      startDate: "",
      endDate: "",
      deadline: "",

      isFree: true,
      price: undefined,
      maxTickets: undefined,

      socialLinks: [],

      location: "",
      locationLink: "",
      venueName: "",

      status: "DRAFT",
  });
  const [error, setError] = useState<any>(null);
  const [mediaError, setMediaError] = useState<null|string>(null);
  const [media, setMedia] = useState<EventMedia>([
    { name: "LOGO", file: null },
    {name : "THUMBNAIL", file : null},
    {name : "BANNER", file : null}
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

      const { name, value } = e.target;
      const updatedForm = {
        ...form,
        [name]: value,
      };
    
      setForm(updatedForm);
    
      if (validate(updatedForm)) return setError(null);
    
      setError((pre:any) => ({...pre , [name] : ""}))
  }

  const handleFreeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
      setForm(pre => ({ ...pre, isFree: checked }));
      
    if (checked) {
        setForm(pre => ({...pre , price : 0}));
    } else {
        setForm(pre => ({...pre , price : 30}));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "LOGO" | "BANNER" | "THUMBNAIL"
  ) => {
    const file = e.target.files?.[0];
  
    if (!file) return;

    setMediaError(null);
  
    setMedia((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, file }
          : item
      )
    );
  };

  const validate = (formData: EventForm = form) => {
    
    const schema = overviewValidation 

      const data = schema.safeParse(formData);
    
      if (!data.success) {
      
          const errorMessages = {...initialState};

          for (const issue of data.error.issues) {

              const field = issue.path[0] as keyof typeof initialState;

              if (field in errorMessages && !errorMessages[field]) {
                  errorMessages[field] = issue.message;
              }
          }

          setError(errorMessages);
          return false;
      }
  
      setError(null);
      return true;
        
  }

  const mediaValidate = () => {

    const data = media.filter((v) => (v.name=== "LOGO" && !!v.file) || (v.name === "THUMBNAIL" && !!v.file))

    console.log(data,media);

    if (data.length !== 2) {
      setMediaError("Logo & Thumbnail required!");
      return false;
    }

    setMediaError("");
    return true;
  }

  const router = useRouter();

  const handleNext = () => {
    
    if (currentStep === 1 && !validate()) return;
    if (currentStep === 2 && !mediaValidate()) return;

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Publishing Event...");
    }
  };

  const handleBack = () => {
      if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Step Wizard Header */}
      <header className="bg-slate-900/80 border border-slate-700 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Event</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Fill in the details to publish your event to the community
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-indigo-400 self-start sm:self-auto">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </div>
        </div>

        {/* Steps Progress Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isActive = currentStep === s.step;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => isCompleted && setCurrentStep(s.step)}
                disabled={!isCompleted && !isActive}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? "bg-indigo-600/10 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10"
                    : isCompleted
                    ? "bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 cursor-pointer"
                    : "bg-slate-900/40 border-slate-800/80 text-slate-500 cursor-not-allowed"
                }`}
              >
                {/* Step Icon / Number */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/30"
                      : isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-500 border border-slate-700/50"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.step}
                </div>

                <div className="overflow-hidden">
                  <h3 className={`text-sm font-semibold truncate ${isActive ? "text-indigo-400" : ""}`}>
                    {s.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                    {s.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Step Form Body */}
      <main className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl min-h-[400px]">
        {currentStep === 1 && (
            <CreateOverview
              error={error}
              form={form}
              onToggle={handleFreeToggle}
              onChange={handleChange}
            />
        )}

        {currentStep === 2 && (
          <CreateGallery 
              error={mediaError}
              gallery={media}
              onFileChange={handleFileChange}
          />
        )}

        {currentStep === 3 && (
          <CreateContact />
        )}

        {currentStep === 4 && (
          <EventPublish />
        )}
      </main>

      {/* Navigation Footer Toolbar */}
      <footer className="bg-slate-900/80 border border-slate-700 backdrop-blur-md rounded-2xl p-4 shadow-xl flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        {/* Left Action: Draft */}
        <Button
          disabled={error}
          onClick={() => console.log("Draft saved")}
          className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl gap-2 transition-all active:scale-95"
        >
          <Save className="w-4 h-4 text-slate-400" />
          <span>Save Draft</span>
        </Button>

        {/* Right Actions: Cancel / Back / Next */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button
            onClick={() => router.push("/")}
            className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl gap-1.5 transition-all"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </Button>

          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl gap-2 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          )}

          <Button
            disabled={error || mediaError}
            onClick={handleNext}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 gap-2 transition-all active:scale-95"
          >
            <span>{currentStep === STEPS.length ? "Publish Event" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}