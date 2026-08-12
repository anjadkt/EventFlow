"use client";

import React from "react";
import { ButtonLoader } from "./Loader";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick = () => {},
  className = "",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`inline-flex cursor-pointer items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  );
}