export function getUrl(): string {
	if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		return process.env.NEXT_PUBLIC_VERCEL_URL;
	}
	return "http://localhost:3000";
}
