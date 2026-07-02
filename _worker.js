export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Serve static assets from root
    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    }

    // Try to serve the file from assets
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
    } catch (e) {
      // Asset binding might not be available in all environments
    }

    // Fallback: serve from filesystem
    try {
      const file = await env.ASSETS.fetch(
        new Request(new URL(pathname, request.url).toString(), {
          method: 'GET'
        })
      );
      return file;
    } catch (e) {
      // If no ASSETS binding, return 404
      return new Response('Not Found', { status: 404 });
    }
  }
};
