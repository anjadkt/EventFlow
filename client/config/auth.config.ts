import { FormField } from "@/types/auth.types";

export const loginFields: FormField[] = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "name@example.com",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
    },
  ];
  
  export const registerFields: FormField[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "name@example.com",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
    }
  ];