# OpenaI Whisper Docker Server

This is a simple Bun.sh based HTTP server. It's made in multiple files to be easy to understand.

This is a lot more performant than Express, Koa, NestJs, tRPC, Fastify or other frameworks just running it in Node.js, as it's a plain barebones HTTP server with 0 dependencies.

But running it in Bun.sh makes it even more performant. Easily being able to handle 10x more requests per second than the above frameworks.

I've avoided routing here by simply reading the filesystem in src/controllers, any files you put in there will be automatically routed to and will become an endpoint. There are no "params" in the path like `/users/123`, however, but you can simply use query strings /users?id=123, HEADERs or JSON bodies.