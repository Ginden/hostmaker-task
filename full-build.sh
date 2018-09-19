#!/usr/bin/env bash
docker container prune -f && \
docker build . && \
docker-compose up
