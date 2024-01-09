//import handleAPI from "./api.ts";

// To set the current working directory to the directory of the current file
// (instead of the directory from which the program was run)
const currentFileDirectory = new URL(import.meta.url).pathname;
Deno.chdir(currentFileDirectory.substring(0, currentFileDirectory.lastIndexOf("/")));

async function handlerHttp(request: Request, info: Deno.ServeHandlerInfo) {
  const url = new URL(request.url);
  let filepath = "../dist"+url.pathname;
  if (filepath.endsWith("/")) {
    filepath += "index.html";
  }

  // log the IP address of the request in log/log.txt
  const ip = info.remoteAddr.hostname;
  const log = `${ip};${request.method};${request.url};${new Date().toISOString()}\n`;
  //create the folder ./log if it does not exist
  if(!await Deno.stat("./log").catch(() => false)){
    await Deno.mkdir("./log");
  }
  await Deno.writeTextFile("./log/log.txt", log, { append: true });


/*   if(url.pathname.startsWith("/api/")){ // c'est une manière de faire mais on peut faire autrement
    const apiResponse = await handleAPI(request);
    return apiResponse;
  } */

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


// print the current working directory
console.log(Deno.cwd());

// print the content of the current directory
for await (const dirEntry of Deno.readDir(".")) {
  console.log(dirEntry.name);
}

//verify the presence of the certificates and the private key and wait for the server to start
while(!await Deno.stat("./fullchain.pem").catch(() => false) || !await Deno.stat("./privkey.pem").catch(() => false)){
  console.log("Waiting for certificates...");
  await new Promise(resolve => setTimeout(resolve, 1000));
}

//Deno.serve({ port: 8080 }, handlerHttp);

Deno.serve({
  port: 443,
  cert: Deno.readTextFileSync("./fullchain.pem"),
  key: Deno.readTextFileSync("./privkey.pem")
}, handlerHttp);

