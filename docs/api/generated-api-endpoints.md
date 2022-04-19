---
id: generated-api-endpoints
title: API Endpoints for Health and Readiness
sidebar_label: API Endpoints for Health and Readiness
slug: api/generated-api-endpoints
---

# API Endpoints for Health and Readiness

Amplication includes two API endpoints who's function is to coordinate the generated app with the infrastructure. Examples of infrastructure include a load balancer such as Amazon Elastic Load Balancing, an orchestrator, such as Kubernetes, or a service such as DingDong.
The APIs perform a health check and communicate the  status of the app to to infrastructure, notifying the app administrator. 


![](../getting-started/assets/161983060-f7f2982a-9a78-47bb-baac-c4fe274e0f3c.png)


- **live** - checks if  the application is alive or dead.  
- **ready** - checks that the application is available and ready.

 
:::note
Http status 204 indicates success.
:::




