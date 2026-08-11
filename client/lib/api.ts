
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {

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