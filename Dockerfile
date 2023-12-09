FROM ubuntu:latest

EXPOSE 443

COPY ./dist /app/dist/
COPY ./server /app/server/

RUN apt update && \
    apt-get install -y unzip && \
    apt install -y curl && \
    curl -fsSL https://deno.land/x/install/install.sh | sh && \
    export DENO_INSTALL="/root/.deno" && \
    export PATH="$DENO_INSTALL/bin:$PATH"

ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

#WORKDIR /app/server/

ENTRYPOINT ["deno", "run", "--allow-net", "--allow-read", "/app/server/server.ts"]