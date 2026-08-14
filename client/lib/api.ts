
const API_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL!
    : process.env.NEXT_PUBLIC_API_URL!;

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

    let retry = true ;

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (response.status === 401 && retry) {

        const refreshResponse = await fetch(
          `${API_URL}/auth/refresh`,
          {
            credentials: "include",
          }
        );

        const refreshData = await refreshResponse.json();
    
        if (!refreshResponse.ok) {
            throw refreshData;
        }

        retry = false;
        return api(endpoint, options);
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw data;
    }

    return data;
}