"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginFrom } from "@/types/auth.types"; // Fixed typo alias if needed
import { loginSchema } from "@/validations/auth.validate";
import { loginService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { loginFields } from "@/config/auth.config";
import { useRouter } from "next/navigation";

const initialState = {
    email: "",
    password: "",
};

export default function LoginForm({ toggle }: { toggle: () => void}) {

    const [form, setForm] = useState(initialState);
    const [error, setError] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const { authenticateUser } = useAuth();

    const router = useRouter();

    const validate = (formData: LoginFrom) => {

        const data = loginSchema.safeParse(formData);

        if (!data.success) {
        
            const errorMessages = {
                email: "",
                password: "",
            };

            for (const issue of data.error.issues) {

                const field = issue.path[0] as keyof typeof initialState;

                if (field in errorMessages && !errorMessages[field]) {
                    errorMessages[field] = issue.message;
                }
            }

            setError(errorMessages);
            return false;
        }

        setError(initialState);
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };

        setForm(updatedForm);
        validate(updatedForm);

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate(form)) return;

        setIsLoading(true);

        try {

        await loginService(form);
        authenticateUser();

        router.push("/");

        } catch (err: any) {
        
            const errorObj:any = {}

            switch(err.status){
                case 400:
                    errorObj.email = "Invalid email or password";
                    break;
                case 404:
                    errorObj.email = "Invalid email or password";
                    break;
                case 500:
                    errorObj.email = "Something went wrong";
                    break;
                default:
                    errorObj.email = "Something went wrong";
                    break;
            }
            setError(errorObj);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none space-y-6">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

                {
                    loginFields.map((field, index) => (
                        <Input
                            key={index}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.name as keyof LoginFrom]}
                            onChange={handleChange}
                            name={field.name}
                            label={field.label}
                            error={error[field.name as keyof typeof error]}
                        />
                    ))
                }

                {/* Submit Button */}
                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full py-2.5 mt-2 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                    Login
                </Button>

                {/* Sign-in Link */}
                <p className="md:hidden text-center text-xs text-slate-500 dark:text-slate-400">
                    Don&apos;t have an account?{" "}
                <span
                    onClick={toggle}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                    Sign up instead
                </span>
                </p>
            </form>
        </div>
    );
    }