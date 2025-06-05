import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    return new Response(
        new ReadableStream({
            start(controller) {
                const ws = new WebSocket('ws://localhost:9000/');

                ws.addEventListener('open', () => {
                    console.log('WebSocket connection established');
                });

                ws.addEventListener('message', (event) => {
                    try {
                        const data = JSON.parse(event.data.toString());
                        console.log(data);
                        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
                    } catch (err) {}
                });

                ws.addEventListener('error', () => {
                    // Handle error
                });

                ws.addEventListener('close', () => {
                    try {
                        controller.close();
                    } catch (err) {}
                });
            },
            cancel() {
                
            }
        }),
        {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-open'
            }
        }
    );
}
