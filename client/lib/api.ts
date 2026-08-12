
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ResponseType = {
    ok : boolean,
    data : any,
    success : boolean,
    message : string,
    status : number
}

export async function api(
    endpoint: string,
    options?: RequestInit
): Promise<ResponseType> {

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw data;
    }

    return data;
}