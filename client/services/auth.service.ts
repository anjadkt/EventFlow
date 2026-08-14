import { api } from "@/lib/api"
import { LoginFrom, RegistrForm } from "@/types/auth.types";


export const getProfile = async () => {

    const res = await api("/auth/profile");

    return res.data;
}

export const loginService = async (from: LoginFrom) => {

    const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(from)
    });

    return res.data;
}

export const registerService = async (form:RegistrForm) => {

    const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
    });

    return res.data;
}

export const logoutService = async () => {
    const res = await api("/auth/logout", {
        method: "POST"
    });

    return res.data;
}
