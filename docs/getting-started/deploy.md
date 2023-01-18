---
id: deploy
title: Deploy to Docker Desktop
sidebar_label: Deploy to Docker Desktop
slug: /deploy
---

 To deploy to Docker, build a Docker image and run a Docker container. 

Your project is always generated with all the configuration and scripts needed to build a Docker container to prepare your app for deployment.

First clone source code from your repository. See [Sync with GitHub](https://docs.amplication.com/docs/sync-with-github/) for more information about working with source code.

To run your app in Docker with a functional database, execute the docker-compose command: 

`docker-compose up`


---

TIP: 
If you store your  services in a monorepo git repository, run `docker-compose up` from within the service folder you want to run.

---
