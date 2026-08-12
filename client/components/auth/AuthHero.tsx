"use client";

import Button from "../ui/Button";

interface AuthHeroProps {
  mode: "login" | "register";
  title: string;
  description: string;
  onToggle: () => void;
  buttonText: string;
}

export default function AuthHero({
  mode,
  title,
  description,
  onToggle,
  buttonText,
}: AuthHeroProps) {
  const isLogin = mode === "login";

  return (
    <div
      className={`hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-12 flex-col justify-between items-center text-center transition-all duration-700 ease-in-out absolute top-0 bottom-0 z-20 ${
        isLogin
          ? "left-0 translate-x-0 rounded-r-[100px]"
          : "right-0 translate-x-0 rounded-l-[100px]"
      }`}
    >
      {/* Brand Header */}
      <div className="w-full flex justify-start">
        <span className="text-xl font-bold tracking-tight text-white/90">
          Event Flow<span className="text-indigo-300">.</span>
        </span>
      </div>

      {/* Dynamic Content */}
      <div className="my-auto space-y-4 max-w-xs transition-all duration-500">
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-sm text-indigo-100/80 leading-relaxed">
          {description}
        </p>

        {/* Question */}
        <p className="text-xs font-medium text-indigo-200/90 pt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>

        <Button
          type="button"
          onClick={onToggle}
          className="cursor-pointer px-8 py-2.5 border-2 border-white/80 hover:border-white text-white font-semibold rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200 text-sm"
        >
          {buttonText}
        </Button>
      </div>

      {/* Footer */}
      <div className="text-xs text-indigo-200/60">
        &copy; {new Date().getFullYear()} EventFlow. All rights reserved.
      </div>
    </div>
  );
}