export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.maisonsarddinnah.com") {
      url.hostname = "maisonsarddinnah.com";
      return Response.redirect(url, 301);
    }

    return env.ASSETS.fetch(request);
  }
};
