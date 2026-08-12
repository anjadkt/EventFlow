"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthTemplate from "@/components/auth/AuthHero";

export default function FormWrapper() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 md:p-8">

      <div className="relative w-full max-w-4xl min-h-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row">
        
        {/* Dynamic Sliding Hero Side Panel */}
        <AuthTemplate
          mode={isLogin ? "login" : "register"}
          title={isLogin ? "Welcome Back" : "Welcome to EventFlow"}
          description={
            isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to create and join events"
          }
          buttonText={isLogin ? "Create Account" : "Access your account"}
          onToggle={handleToggle}
        />

        {/* Active Form Area (Slides horizontally based on mode) */}
        <div
          className={`w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center transition-transform duration-700 ease-in-out z-10 ${
            isLogin ? "md:translate-x-full" : "md:translate-x-0"
          }`}
        >
          {isLogin ? (
            <LoginForm toggle={handleToggle} />
          ) : (
            <RegisterForm toggle={handleToggle} />
          )}
        </div>

      </div>

    </main>
  );
}