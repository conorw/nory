#Dockerfile

# Use this image as the platform to build the app
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# A small line inside the image to show who made it
LABEL Developers="NoryDev <"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY . .

ENV PUBLIC_LOCATION_ID=1

# Clean install all node modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build SvelteKit app
RUN pnpm build

# Delete source code files that were used to build the app that are no longer needed
RUN rm -rf src/ static/ docker-compose.yml

USER root
#RUN chmod 777 /app/data
RUN chown -R node:node /app/data

# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

EXPOSE 3000

# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","build/index.js"]