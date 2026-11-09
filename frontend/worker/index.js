// Serves /eng/resume.pdf from the edge cache and refreshes it from GitHub in the
// background, so the site always tracks the resume repo's latest release
// without a redeploy. Everything else falls through to the static assets.

const RESUME_PATH = "/eng/resume.pdf";
const RESUME_SOURCE =
	"https://github.com/jackjustus/resume/releases/download/latest/Jack_Justus_SWE_Resume.pdf";

// Don't hit GitHub more than once per this interval per data center.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

async function fetchFromGitHub(cache, cacheKey) {
	const upstream = await fetch(RESUME_SOURCE);
	if (!upstream.ok) return null;

	const response = new Response(upstream.body, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": 'inline; filename="Jack_Justus_SWE_Resume.pdf"',
			// How long the edge cache keeps it if nobody visits.
			"Cache-Control": "public, max-age=604800",
			"X-Fetched-At": String(Date.now()),
		},
	});
	await cache.put(cacheKey, response.clone());
	return response;
}

function forBrowser(response) {
	const out = new Response(response.body, response);
	// Keep browser caching short so visitors pick up updates quickly.
	out.headers.set("Cache-Control", "public, max-age=300");
	out.headers.delete("X-Fetched-At");
	return out;
}

async function serveResume(request, ctx) {
	const cache = caches.default;
	const cacheKey = new Request(new URL(RESUME_PATH, request.url).toString());

	const cached = await cache.match(cacheKey);
	if (cached) {
		const fetchedAt = Number(cached.headers.get("X-Fetched-At")) || 0;
		if (Date.now() - fetchedAt > REFRESH_INTERVAL_MS) {
			// Serve the cached copy now; update it for future requests.
			ctx.waitUntil(fetchFromGitHub(cache, cacheKey).catch(() => {}));
		}
		return forBrowser(cached);
	}

	const fresh = await fetchFromGitHub(cache, cacheKey);
	if (fresh) return forBrowser(fresh);

	// GitHub is unavailable and nothing is cached: send them to the source.
	return Response.redirect(RESUME_SOURCE, 302);
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.pathname === RESUME_PATH && request.method === "GET") {
			return serveResume(request, ctx);
		}
		return env.ASSETS.fetch(request);
	},
};