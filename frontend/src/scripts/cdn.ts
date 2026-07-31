export const cdn = (path: string, width: number, opts = 'format=auto,quality=85') =>
    `https://static.jackjust.com/cdn-cgi/image/width=${width},${opts}/${path}`;

export const srcset = (path: string, widths: number[]) =>
    widths.map((w) => `${cdn(path, w)} ${w}w`).join(', ');

const cache = new Map<string, string>();


export async function lqip(path: string): Promise<string> {
    const hit = cache.get(path);
    if (hit !== undefined) return hit;

    let uri = '';
    try {
        const res = await fetch(cdn(path, 24, 'format=webp,quality=30'));
        if (res.ok) {
            const bytes = new Uint8Array(await res.arrayBuffer());
            uri = `data:image/webp;base64,${btoa(String.fromCharCode(...bytes))}`;
        }
    } catch {
        // leave empty — the CSS background-color is the fallback
    }

    cache.set(path, uri);
    return uri;
}