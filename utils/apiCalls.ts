import { getUrl } from "./actual-url";
import axios from "axios";

type AllowedHttpMethod = "GET" | "POST";

interface HttpHeaders {
	[key: string]: string;
}

export async function callApiRoute<T>(
	path: string,
	method: AllowedHttpMethod,
	headersArg?: HttpHeaders
): Promise<T> {
	try {
		const headers = getHeaders(headersArg);

		const url = `${getUrl()}/${path}`;
		if (method === "GET") {
			const response = await axios.get<T>(url, { headers });
			console.log("La réponse de ma GET de mon api", response)
			return response.data;
		} else if (method === "POST") {
			const response = await axios.post<T>(url, {}, { headers });
			return response.data;
		}
		return Promise.reject(new Error("HTTP Method Not Allowed"));
	} catch (error: any) {
		return Promise.reject(new Error("Error"));
	}
}

function getHeaders(headers?: HttpHeaders): HttpHeaders {
	if (headers) {
		return {
			...headers,
		};
	}
	return {
		"Content-Type": "application/json",
	};
}
