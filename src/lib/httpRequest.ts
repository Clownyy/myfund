import axios from "axios"
import { getSession } from "next-auth/react"

const getRequest = async (jwt: string, baseUrl: string, url: string) => {
    try {
        const response = await axios.get(baseUrl + url, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + jwt
            }
        })
        return response.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const postRequest = async (jwt: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.post(baseUrl + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + jwt,
        },
    });
    return response.data;
};

const putRequest = async (jwt: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.patch(baseUrl + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + jwt,
        },
    });
    return response.data;
};

const deleteRequest = async (jwt: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.delete(baseUrl + url + "/" + body, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + jwt,
        },
    });
    return response.data;
};
export async function httpRequest(baseUrl: string, url: string, method = 'GET', body = {}) {
    const session = await getSession();
    const jwt = session?.accessToken || "";
    switch (method) {
        case "GET":
            return getRequest(jwt, baseUrl, url);
        case "POST":
            return postRequest(jwt, baseUrl, url, body);
        case "PATCH":
            return putRequest(jwt, baseUrl, url, body);
        case "DELETE":
            return deleteRequest(jwt, baseUrl, url, body);
        default:
            console.warn('method not supported');
            break;
    }
}