FROM ubuntu

RUN apt update
RUN apt install -y curl unzip
RUN curl -fsSL https://bun.com/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app
COPY . .

RUN bun install
RUN bunx prisma generate
CMD ["bun", "run","server.ts"]