import { fileURLToPath } from 'node:url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: process.env.NODE_ENV === 'production' 
		? '.env.production' 
		: '.env.development'
});

const port = Number(process.env.PORT || 4321);

let astroDevProcess: { pid?: number; kill?: () => void } | undefined;
if (process.env.NODE_ENV !== 'production') {
	const env = Object.fromEntries(
		Object.entries(process.env).map(([k, v]) => [k, v?.toString() || ''])
	);
	env.ASTRO_BUN_INTEGRATION = 'true';

	astroDevProcess = Bun.spawn(['astro', 'dev', '--port', '3000'], {
		stdout: 'inherit',
		stderr: 'inherit',
		env
	});

	process.on('exit', () => astroDevProcess?.kill?.());
}

// SSR Handler (production only)
let ssrHandler: ((req: Request) => Promise<Response>) | undefined;
if (process.env.NODE_ENV === 'production') {
    try {
		// @ts-ignore
		const mod = await import('./dist/server/server.js');
		ssrHandler = mod.default?.handler || mod.handler;
    } catch (error) {
      	console.error('Failed to load SSR handler:', error);
    }
}

// Static file serving
async function serveStatic(req: Request): Promise<Response | null> {
	const basePath = process.env.NODE_ENV === 'production'
		? fileURLToPath(new URL('./dist/client', import.meta.url))
		: fileURLToPath(new URL('./public', import.meta.url));

	const urlPath = new URL(req.url).pathname.replace(/^\/+/, '');
	const filePath = path.join(basePath, urlPath);
	
	const file = Bun.file(filePath);
	return await file.exists() ? new Response(file) : null;
}

const server = Bun.serve({
	port,
	hostname: '0.0.0.0',
	idleTimeout: 10,
	async fetch(req, server) {
		const url = new URL(req.url);
		
		// Handle WebSocket upgrade for Vite HMR
		if (url.pathname === '/' && req.headers.get('upgrade') === 'websocket') {
			if (server.upgrade(req)) return new Response(null, { status: 101 });
		}

		// Static files
		if (req.method === 'GET') {
			const staticResponse = await serveStatic(req);
			if (staticResponse) return staticResponse;
		}

		// Production SSR
		if (process.env.NODE_ENV === 'production' && ssrHandler) {
			return await ssrHandler(req);
		}

		// Development proxy (except API routes)
		if (process.env.NODE_ENV !== 'production' && !url.pathname.startsWith('/api/')) {
			try {
				const proxyResponse = await fetch(`http://localhost:3000${url.pathname}${url.search}`, {
					method: req.method,
					headers: req.headers,
					body: req.method === 'GET' ? undefined : req.body
				});
				
				// Inject HMR client (only for HTML responses)
				if (proxyResponse.headers.get('content-type')?.includes('text/html')) {
					const html = await proxyResponse.text();
					return new Response(
						html.replace(
							'</head>',
							`<script>window.__HMR_PORT__ = ${port};</script></head>`
						),
						proxyResponse
					);
				}
				return proxyResponse;
			} catch (error) {
				console.error('Proxy request failed:', error);
				return new Response('Proxy Error', { status: 502 });
			}
		}

		return new Response('Not Found', { status: 404 });
	},
	websocket: {
		open() {
			console.debug('HMR WebSocket connected');
		},
		message(ws, message) {
			ws.send(message);
		},
		close() {
			console.debug('HMR WebSocket disconnected');
		}
	},
	error(error) {
		console.error('Server error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
