import { api } from "@/lib/api"
import { LoginFrom, RegistrForm } from "@/types/auth.types";


export const getProfile = async () => {

    const response = await api("/auth/profile");

    return response.data;
}

export const loginService = async (from: LoginFrom) => {

    const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(from)
    });

    return response.data;
}


export const registerService = async (form:RegistrForm) => {

    const response = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
    });

    return response.data;
}
