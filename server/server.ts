

// To set the current working directory to the directory of the current file
// (instead of the directory from which the program was run)
const currentFileDirectory = new URL(import.meta.url).pathname;
Deno.chdir(currentFileDirectory.substring(0, currentFileDirectory.lastIndexOf("/")));


async function handlerHttp(request: Request) {
  const url = new URL(request.url);
  let filepath = "../dist"+url.pathname;
  if (filepath.endsWith("/")) {
    filepath += "index.html";
  }
  //console.log("REQUESTED FILE: ", filepath);

  let file;
  try{
    file = await Deno.open(filepath, { read: true });
  } catch {
    // If the file cannot be opened, return a "404 Not Found" response
    const notFoundResponse = new Response("404 Not Found", { status: 404 });
    return notFoundResponse;
  }

  let contentType = "text/plain";
  if (filepath.endsWith(".html")) {
    contentType = "text/html";
  } else if (filepath.endsWith(".js")) {
    contentType = "text/javascript";
  } else if (filepath.endsWith(".css")) {
    contentType = "text/css";
  } else if (filepath.endsWith(".png")) {
    contentType = "image/png";
  } else if (filepath.endsWith(".jpg") || filepath.endsWith(".jpeg")) {
    contentType = "image/jpeg";
  } else if (filepath.endsWith(".gif")) {
    contentType = "image/gif";
  } else if (filepath.endsWith(".svg")) {
    contentType = "image/svg+xml";
  }
  const headers = new Headers();
  headers.set("content-type", contentType);
  const readableStream = file.readable;
  const response = new Response(readableStream, { headers });
  return response;
}

//Deno.serve({ port: 8080 }, handlerHttp);

Deno.serve({
  port: 443,
  cert: Deno.readTextFileSync("./cert.pem"),
  key: Deno.readTextFileSync("./key.pem")
}, handlerHttp);


////////////////////////////////////SOME STUFF////////////////////////////////////


/* const handler1 = (request: Request): Response => {
  const html = `
  <html>
    <head>
      <title>My First Deno Server</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
    </body>
  </html>`;
  const body = new TextEncoder().encode(html);
  return new Response(body, { status: 200 });
}; */

/* const handler2 = async (request: Request) => {
  console.log("Method:", request.method);
  const url = new URL(request.url);

  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);
  console.log("Headers:", request.headers);

  if (request.body) {
    const body = await request.text();
    console.log("Body:", body);
  }

  return new Response("Hello, World!", {
    headers: { "content-type": "text/plain" },
  });
} */

/* async function handler3(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    // Use the request pathname as filepath
    const url = new URL(requestEvent.request.url);
    const filepath = decodeURIComponent(url.pathname);

    // Try opening the file
    let file;
    try {
      file = await Deno.open("./index.html", { read: true });
    } catch {
      // If the file cannot be opened, return a "404 Not Found" response
      const notFoundResponse = new Response("404 Not Found", { status: 404 });
      await requestEvent.respondWith(notFoundResponse);
      continue;
    }

    // Build a readable stream so the file doesn't have to be fully loaded into
    // memory while we send it
    const readableStream = file.readable;

    // Build and send the response
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
} */

////////////////////////////////////////////////////////////////////////////////////////////////////