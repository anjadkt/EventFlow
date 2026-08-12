

export type UserProfile = {

}

export type RegistrForm = {
    name : string,
    email: string,
    password: string
}

export type LoginFrom = {
    email: string,
    password: string
}

export type FormField = {
    name: string;
    type: "text" | "email" | "password";
    label: string;
    placeholder: string;
};