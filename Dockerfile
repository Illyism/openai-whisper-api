FROM oven/bun

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json bun.lockb /usr/src/app/
RUN bun install --omit=dev

COPY . /usr/src/app/

ENV PORT 8080
ENV NODE_ENV production

EXPOSE ${PORT}
CMD [ "bun", "src/server/server.ts" ]
