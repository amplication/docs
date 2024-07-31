---
id: create-swagger
title: Create Swagger | .NET Plugin Event
description: Creates the Swagger configuration for the .NET application.
sidebar_label: Create Swagger
slug: /plugins/dotnet-plugin-events/create-swagger
---

# Create Swagger


Creates the Swagger configuration for the .NET application.

### Event Name

`CreateSwagger`

### Event Params

```ts
export interface CreateSwaggerParams extends EventParams {
  fileDir: string;
  outputFileName: string;
}
```

Example:

```ts
async afterCreateSwagger(
  context: DsgContext,
  eventParams: CreateSwaggerParams,
  modules: ModuleMap
) {
  const { fileDir, outputFileName } = eventParams;
  const swaggerConfig = `
    public static class SwaggerConfig
    {
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }
    }
  `;

  modules.set({
    path: join(fileDir, outputFileName),
    code: swaggerConfig
  });

  return modules;
}
```