---
id: dotnet-plugin-events-reference
title: .NET Plugin Events - Reference
sidebar_label: .NET Plugin Events - Reference
slug: /plugins/dotnet-plugin-events-reference
toc_max_heading_level: 2
---

# .NET Plugin Events - Reference

This comprehensive reference provides detailed information about each .NET plugin event, its available parameters, and in-depth examples. Developers can use this guide to understand how to interact with and customize the .NET code generation process in Amplication.

## CreateEntityController

Creates a controller for a specific entity in the .NET application.

### Event Name

`CreateEntityController`

### Event Params

```ts
export interface CreateEntityControllerParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

#### entity

The entity object for which the controller is being created.

#### resourceName

The name of the resource (typically the entity name).

#### apisDir

The directory where the API controllers are being generated.

#### entityActions

An object containing the CRUD actions available for the entity.

Example:

```ts
async afterCreateEntityController(
  context: DsgContext,
  eventParams: CreateEntityControllerParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const controllerPath = join(apisDir, `${resourceName}Controller.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const updatedCode = controllerFile.code.replace(
      "public class",
      "[ApiVersion(\"1.0\")]\npublic class"
    );

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityControllerBase

Creates a base controller for entities in the .NET application.

### Event Name

`CreateEntityControllerBase`

### Event Params

```ts
export interface CreateEntityControllerBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

#### moduleActions

An array of module actions available for the entity.

#### entities

An array of all entities in the application.

Example:

```ts
async afterCreateEntityControllerBase(
  context: DsgContext,
  eventParams: CreateEntityControllerBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const controllerBasePath = join(apisDir, `${resourceName}ControllerBase.cs`);
  const controllerBaseFile = modules.get(controllerBasePath);

  if (controllerBaseFile) {
    const updatedCode = controllerBaseFile.code.replace(
      "public abstract class",
      "[ApiController]\n[Route(\"api/[controller]\")]\npublic abstract class"
    );

    modules.set({
      path: controllerBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityGrpcController

Creates a gRPC controller for a specific entity in the .NET application.

### Event Name

`CreateEntityGrpcController`

### Event Params

```ts
export interface CreateEntityGrpcControllerParams extends EventParams {
  entity: Entity;
}
```

#### entity

The entity object for which the gRPC controller is being created.

Example:

```ts
async afterCreateEntityGrpcController(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerParams,
  modules: ModuleMap
) {
  const { entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcController.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const updatedCode = controllerFile.code.replace(
      "public class",
      "[GrpcService]\npublic class"
    );

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityGrpcControllerBase

Creates a base gRPC controller for entities in the .NET application.

### Event Name

`CreateEntityGrpcControllerBase`

### Event Params

```ts
export interface CreateEntityGrpcControllerBaseParams extends EventParams {
  entity: Entity;
}
```

#### entity

The entity object for which the base gRPC controller is being created.

Example:

```ts
async afterCreateEntityGrpcControllerBase(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerBaseParams,
  modules: ModuleMap
) {
  const { entity } = eventParams;
  const controllerBasePath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcControllerBase.cs`);
  const controllerBaseFile = modules.get(controllerBasePath);

  if (controllerBaseFile) {
    const updatedCode = controllerBaseFile.code.replace(
      "public abstract class",
      "public abstract class"
    );

    modules.set({
      path: controllerBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityControllerSpec

Creates the controller spec file for the entity controller.

### Event Name

`CreateEntityControllerSpec`

### Event Params

```ts
export interface CreateEntityControllerSpecParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityControllerSpec(
  context: DsgContext,
  eventParams: CreateEntityControllerSpecParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const specPath = join(apisDir, "Tests", `${resourceName}ControllerTests.cs`);
  const specFile = modules.get(specPath);

  if (specFile) {
    const updatedCode = specFile.code.replace(
      "public class",
      "[TestClass]\npublic class"
    );

    modules.set({
      path: specPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateServerAuth

Sets up authentication for the .NET server.

### Event Name

`CreateServerAuth`

### Event Params

```ts
export interface CreateServerAuthParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateAdminDotEnv

Creates the .env file for the admin UI.

### Event Name

`CreateAdminDotEnv`

### Event Params

```ts
export interface CreateAdminDotEnvParams extends EventParams {
  envVariables: VariableDictionary;
}
```

Example:

```ts
beforeCreateAdminDotEnv(
  context: DsgContext,
  eventParams: CreateAdminDotEnvParams
) {
  eventParams.envVariables.push(
    { REACT_APP_API_URL: "http://localhost:3000/api" },
    { REACT_APP_SERVER_URL: "http://localhost:3000" }
  );
  return eventParams;
}
```

## CreateAdminUI

Creates the admin UI for the .NET application.

### Event Name

`CreateAdminUI`

### Event Params

```ts
export interface CreateAdminUIParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateServer

Initializes the creation of the .NET server.

### Event Name

`CreateServer`

### Event Params

```ts
export interface CreateServerParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateServerAppModule

Creates the main application module for the .NET server.

### Event Name

`CreateServerAppModule`

### Event Params

```ts
export interface CreateServerAppModuleParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateProgramFile

Creates the main Program.cs file for the .NET application.

### Event Name

`CreateProgramFile`

### Event Params

```ts
export interface CreateProgramFileParams extends EventParams {
  builderServicesBlocks: CodeBlock[];
  appBlocks: CodeBlock[];
}
```

Example:

```ts
beforeCreateProgramFile(
  context: DsgContext,
  eventParams: CreateProgramFileParams
) {
  eventParams.builderServicesBlocks.push({
    code: "builder.Services.AddSwaggerGen();",
    comment: "Add Swagger generator"
  });

  eventParams.appBlocks.push({
    code: `
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}`,
    comment: "Configure Swagger middleware"
  });

  return eventParams;
}
```

## CreateServerGitIgnore

Creates the .gitignore file for the server.

### Event Name

`CreateServerGitIgnore`

### Event Params

```ts
export interface CreateServerGitIgnoreParams extends EventParams {
  gitignorePaths: string[];
}
```

Example:

```ts
beforeCreateServerGitIgnore(
  context: DsgContext,
  eventParams: CreateServerGitIgnoreParams
) {
  eventParams.gitignorePaths.push(
    "*.user",
    "*.userosscache",
    "*.sln.docstates"
  );
  return eventParams;
}
```

## CreateAdminGitIgnore

Creates the .gitignore file for the admin UI.

### Event Name

`CreateAdminGitIgnore`

### Event Params

```ts
export interface CreateAdminGitIgnoreParams extends EventParams {
  gitignorePaths: string[];
}
```

Example:

```ts
beforeCreateAdminGitIgnore(
  context: DsgContext,
  eventParams: CreateAdminGitIgnoreParams
) {
  eventParams.gitignorePaths.push(
    "node_modules",
    "build",
    ".env.local"
  );
  return eventParams;
}
```

## CreateMessageBroker

Sets up the message broker configuration for the .NET server.

### Event Name

`CreateMessageBroker`

### Event Params

```ts
export interface CreateMessageBrokerParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateMessageBrokerTopicsEnum

Creates the message broker topics enum.

### Event Name

`CreateMessageBrokerTopicsEnum`

### Event Params

```ts
export interface CreateMessageBrokerTopicsEnumParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateMessageBrokerNestJSModule

Creates the NestJS module for the message broker.

:::note
This event is typically not used in .NET projects
:::

### Event Name

`CreateMessageBrokerNestJSModule`

### Event Params

```ts
export interface CreateMessageBrokerNestJSModuleParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateMessageBrokerClientOptionsFactory

Creates the client options factory for the message broker.

### Event Name

`CreateMessageBrokerClientOptionsFactory`

### Event Params

```ts
export interface CreateMessageBrokerClientOptionsFactoryParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateMessageBrokerService

Creates the service for the message broker.

### Event Name

`CreateMessageBrokerService`

### Event Params

```ts
export interface CreateMessageBrokerServiceParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateMessageBrokerServiceBase

Creates the base service for the message broker.

### Event Name

`CreateMessageBrokerServiceBase`

### Event Params

```ts
export interface CreateMessageBrokerServiceBaseParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateEntityService

Creates a service for a specific entity in the .NET application.

### Event Name

`CreateEntityService`

### Event Params

```ts
export interface CreateEntityServiceParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

Example:

```ts
async afterCreateEntityService(
  context: DsgContext,
  eventParams: CreateEntityServiceParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const servicePath = join(apisDir, `${resourceName}Service.cs`);
  const serviceFile = modules.get(servicePath);

  if (serviceFile) {
    const updatedCode = serviceFile.code + `
    public async Task<${entity.name}> CustomOperation(int id)
    {
        // Add custom business logic here
        return await _context.${entity.pluralName}.FindAsync(id);
    }
    `;

    modules.set({
      path: servicePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityServiceBase

Creates a base service for entities in the .NET application.

### Event Name

`CreateEntityServiceBase`

### Event Params

```ts
export interface CreateEntityServiceBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

Example:

```ts
async afterCreateEntityServiceBase(
  context: DsgContext,
  eventParams: CreateEntityServiceBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const serviceBasePath = join(apisDir, `${resourceName}ServiceBase.cs`);
  const serviceBaseFile = modules.get(serviceBasePath);

  if (serviceBaseFile) {
    const updatedCode = serviceBaseFile.code + `
    protected async Task<bool> EntityExists(int id)
    {
        return await _context.Set<TEntity>().AnyAsync(e => e.Id == id);
    }
    `;

    modules.set({
      path: serviceBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateServerDockerCompose

Creates or updates the Docker Compose file for the .NET server.

### Event Name

`CreateServerDockerCompose`

### Event Params

```ts
export interface CreateServerDockerComposeParams extends EventParams {
  fileContent: string;
  updateProperties: { [key: string]: any }[];
  outputFileName: string;
}
```

Example:

```ts
beforeCreateServerDockerCompose(
  context: DsgContext,
  eventParams: CreateServerDockerComposeParams
) {
  const additionalServices = {
    services: {
      redis: {
        image: "redis:alpine",
        ports: ["6379:6379"]
      }
    }
  };

  eventParams.updateProperties.push(additionalServices);
  return eventParams;
}
```

## CreatePrismaSchema

Creates the Prisma schema for the application.

### Event Name

`CreatePrismaSchema`

### Event Params

```ts
export interface CreatePrismaSchemaParams extends EventParams {
  entities: Entity[];
  dataSource: PrismaDataSource;
  clientGenerator: PrismaClientGenerator;
}
```

Example:

```ts
beforeCreatePrismaSchema(
  context: DsgContext,
  eventParams: CreatePrismaSchemaParams
) {
  // Modify Prisma schema generation
  return eventParams;
}
```

## CreateServerCsproj

Creates or updates the .csproj file for the .NET server.

### Event Name

`CreateServerCsproj`

### Event Params

```ts
export interface CreateServerCsprojParams extends EventParams {
  propertyGroup: Record<string, string>;
  packageReferences: {
    include: string;
    version: string;
    includeAssets?: string;
    privateAssets?: string;
  }[];
}
```

Example:

```ts
beforeCreateServerCsproj(
  context: DsgContext,
  eventParams: CreateServerCsprojParams
) {
  eventParams.propertyGroup = {
    ...eventParams.propertyGroup,
    "TargetFramework": "net6.0",
    "ImplicitUsings": "enable"
  };

  eventParams.packageReferences.push({
    include: "Swashbuckle.AspNetCore",
    version: "6.2.3"
  });

  return eventParams;
}
```

## CreateServerAppsettings

Creates or updates the appsettings.json file for the .NET server.

### Event Name

`CreateServerAppsettings`

### Event Params

```ts
export interface CreateServerAppsettingsParams extends EventParams {
  updateProperties: { [key: string]: any };
}
```

Example:

```ts
beforeCreateServerAppsettings(
  context: DsgContext,
  eventParams: CreateServerAppsettingsParams
) {
  eventParams.updateProperties = {
    ...eventParams.updateProperties,
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    },
    "AllowedHosts": "*"
  };
  return eventParams;
}
```

## CreateAdminUIPackageJson

Creates or updates the package.json file for the admin UI.

### Event Name

`CreateAdminUIPackageJson`

### Event Params

```ts
export interface CreateAdminUIPackageJsonParams extends EventParams {
  updateProperties: { [key: string]: any };
}
```

Example:

```ts
beforeCreateAdminUIPackageJson(
  context: DsgContext,
  eventParams: CreateAdminUIPackageJsonParams
) {
  eventParams.updateProperties = {
    ...eventParams.updateProperties,
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }
  };
  return eventParams;
}
```

## CreateEntityModule

Creates a module for a specific entity in the .NET application.

### Event Name

`CreateEntityModule`

### Event Params

```ts
export interface CreateEntityModuleParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityModule(
  context: DsgContext,
  eventParams: CreateEntityModuleParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const modulePath = join(apisDir, `${resourceName}Module.cs`);
  const moduleFile = modules.get(modulePath);

  if (moduleFile) {
    const updatedCode = moduleFile.code.replace(
      "public class",
      "[Module]\npublic class"
    );

    modules.set({
      path: modulePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityModuleBase

Creates a base module for entities in the .NET application.

### Event Name

`CreateEntityModuleBase`

### Event Params

```ts
export interface CreateEntityModuleBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityModuleBase(
  context: DsgContext,
  eventParams: CreateEntityModuleBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const moduleBasePath = join(apisDir, `${resourceName}ModuleBase.cs`);
  const moduleBaseFile = modules.get(moduleBasePath);

  if (moduleBaseFile) {
    const updatedCode = moduleBaseFile.code + `
    protected virtual void ConfigureAdditionalServices(IServiceCollection services)
    {
        // Add additional service configuration here
    }
    `;

    modules.set({
      path: moduleBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityResolver

Creates a resolver for a specific entity in the .NET application.

### Event Name

`CreateEntityResolver`

### Event Params

```ts
export interface CreateEntityResolverParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityResolver(
  context: DsgContext,
  eventParams: CreateEntityResolverParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const resolverPath = join(apisDir, `${resourceName}Resolver.cs`);
  const resolverFile = modules.get(resolverPath);

  if (resolverFile) {
    const updatedCode = resolverFile.code.replace(
      "public class",
      "[GraphQLResolver]\npublic class"
    );

    modules.set({
      path: resolverPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityResolverBase

Creates a base resolver for entities in the .NET application.

### Event Name

`CreateEntityResolverBase`

### Event Params

```ts
export interface CreateEntityResolverBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityResolverBase(
  context: DsgContext,
  eventParams: CreateEntityResolverBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const resolverBasePath = join(apisDir, `${resourceName}ResolverBase.cs`);
  const resolverBaseFile = modules.get(resolverBasePath);

  if (resolverBaseFile) {
    const updatedCode = resolverBaseFile.code + `
    protected virtual IQueryable<TEntity> ApplyDefaultOrdering(IQueryable<TEntity> query)
    {
        return query.OrderBy(e => e.Id);
    }
    `;

    modules.set({
      path: resolverBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateSwagger

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

## CreateSeed

Creates the seed data file for the .NET application.

### Event Name

`CreateSeed`

### Event Params

```ts
export interface CreateSeedParams extends EventParams {
  fileDir: string;
  outputFileName: string;
  dtoNameToPath: Record<string, string>;
}
```

Example:

```ts
async afterCreateSeed(
  context: DsgContext,
  eventParams: CreateSeedParams,
  modules: ModuleMap
) {
  const { fileDir, outputFileName } = eventParams;
  const seedData = `
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Check if the database has been seeded
                if (context.Users.Any())
                {
                    return;   // Database has been seeded
                }

                context.Users.AddRange(
                    new User { Name = "User 1", Email = "user1@example.com" },
                    new User { Name = "User 2", Email = "user2@example.com" }
                );

                context.SaveChanges();
            }
        }
    }
  `;

  modules.set({
    path: join(fileDir, outputFileName),
    code: seedData
  });

  return modules;
}
```

## CreateEntityControllerToManyRelationMethods

Creates methods for handling to-many relationships in entity controllers.

### Event Name

`CreateEntityControllerToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityControllerToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityControllerToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityControllerToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "Controllers", `${entity.name}Controller.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = controllerFile.code + `
    [HttpGet("{id}/${field.name.toLowerCase()}")]
    public async Task<ActionResult<IEnumerable<${relatedEntityName}>>> ${methodName}(int id)
    {
        var entity = await _context.${entity.name}s.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        return await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == id).ToListAsync();
    }
    `;

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityGrpcControllerToManyRelationMethods

Creates methods for handling to-many relationships in entity gRPC controllers.

### Event Name

`CreateEntityGrpcControllerToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityGrpcControllerToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityGrpcControllerToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcController.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = controllerFile.code + `
    public override async Task<${relatedEntityName}List> ${methodName}(${entity.name}Id request, ServerCallContext context)
    {
        var entities = await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == request.Id).ToListAsync();
        var response = new ${relatedEntityName}List();
        response.Items.AddRange(entities.Select(e => new ${relatedEntityName}Message { /* map properties */ }));
        return response;
    }
    `;

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityResolverToManyRelationMethods

Creates methods for handling to-many relationships in entity resolvers.

### Event Name

`CreateEntityResolverToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityResolverToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityResolverToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityResolverToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const resolverPath = join(context.serverDirectories.srcDirectory, "Resolvers", `${entity.name}Resolver.cs`);
  const resolverFile = modules.get(resolverPath);

  if (resolverFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = resolverFile.code + `
    [GraphQLField]
    public async Task<IEnumerable<${relatedEntityName}>> ${methodName}([Parent] ${entity.name} parent)
    {
        return await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == parent.Id).ToListAsync();
    }
    `;

    modules.set({
      path: resolverPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityResolverToOneRelationMethods

Creates methods for handling to-one relationships in entity resolvers.

### Event Name

`CreateEntityResolverToOneRelationMethods`

### Event Params

```ts
export interface CreateEntityResolverToOneRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityResolverToOneRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityResolverToOneRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const resolverPath = join(context.serverDirectories.srcDirectory, "Resolvers", `${entity.name}Resolver.cs`);
  const resolverFile = modules.get(resolverPath);

  if (resolverFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = resolverFile.code + `
    [GraphQLField]
    public async Task<${relatedEntityName}> ${methodName}([Parent] ${entity.name} parent)
    {
        return await _context.${relatedEntityName}s.FirstOrDefaultAsync(e => e.Id == parent.${field.name}Id);
    }
    `;

    modules.set({
      path: resolverPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateDTOs

Creates Data Transfer Objects (DTOs) for a specific entity in the .NET application.

### Event Name

`CreateDTOs`

### Event Params

```ts
export interface CreateDTOsParams extends EventParams {
  entity: Entity;
  dtoName: string;
  dtoBasePath: string;
}
```

Example:

```ts
async afterCreateDTOs(
  context: DsgContext,
  eventParams: CreateDTOsParams,
  modules: ModuleMap
) {
  const { entity, dtoName, dtoBasePath } = eventParams;
  const dtoPath = join(dtoBasePath, `${dtoName}.cs`);
  const dtoFile = modules.get(dtoPath);

  if (dtoFile) {
    const updatedCode = dtoFile.code + `
    public class ${entity.name}SummaryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    `;

    modules.set({
      path: dtoPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## LoadStaticFiles

Loads static files into the project.

### Event Name

`LoadStaticFiles`

### Event Params

```ts
export interface LoadStaticFilesParams extends EventParams {
  source: string;
  basePath: string;
}
```

Example:

```ts
async afterLoadStaticFiles(
  context: DsgContext,
  eventParams: LoadStaticFilesParams,
  modules: ModuleMap
) {
  const { source, basePath } = eventParams;
  const staticFiles = await readDir(source);
  
  for (const file of staticFiles) {
    const content = await readFile(join(source, file));
    modules.set({
      path: join(basePath, file),
      code: content
    });
  }

  return modules;
}
```

## CreateConnectMicroservices

Creates the configuration for connecting microservices.

### Event Name

`CreateConnectMicroservices`

### Event Params

```ts
export interface CreateConnectMicroservicesParams extends EventParams {}
```

This event does not use any additional parameters.

## CreateServerSecretsManager

Creates the configuration for the secrets manager in the server.

### Event Name

`CreateServerSecretsManager`

### Event Params

```ts
export interface CreateServerSecretsManagerParams extends EventParams {
  secretsNameKey: SecretsNameKey[];
}
```

Example:

```ts
async afterCreateServerSecretsManager(
  context: DsgContext,
  eventParams: CreateServerSecretsManagerParams,
  modules: ModuleMap
) {
  const { secretsNameKey } = eventParams;
  const secretsManager = `
    public static class SecretsManager
    {
        public enum SecretsNameKey
        {
            ${secretsNameKey.map(snk => `${snk.name} = "${snk.key}"`).join(',\n            ')}
        }

        public static string GetSecret(SecretsNameKey key)
        {
            // Implement secret retrieval logic here
            return Environment.GetEnvironmentVariable(key.ToString());
        }
    }
  `;

  modules.set({
    path: join(context.serverDirectories.srcDirectory, "SecretsManager.cs"),
    code: secretsManager
  });

  return modules;
}
```

## CreateEntityInterface

Creates an interface for entities in the .NET application.

### Event Name

`CreateEntityInterface`

### Event Params

```ts
export interface CreateEntityInterfaceParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleContainers: ModuleContainer[];
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

Example:

```ts
async afterCreateEntityInterface(
  context: DsgContext,
  eventParams: CreateEntityInterfaceParams,
  modules: ModuleMap
) {
  const { entity, apisDir } = eventParams;
  const interfacePath = join(apisDir, "Interfaces", `I${entity.name}.cs`);
  const interfaceFile = modules.get(interfacePath);

  if (interfaceFile) {
    const updatedCode = interfaceFile.code + `
    Task<bool> IsUnique(string name);
    `;

    modules.set({
      path: interfacePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityExtensions

Creates extension methods for entities in the .NET application.

### Event Name

`CreateEntityExtensions`

### Event Params

```ts
export interface CreateEntityExtensionsParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityExtensions(
  context: DsgContext,
  eventParams: CreateEntityExtensionsParams,
  modules: ModuleMap
) {
  const { entity, apisDir } = eventParams;
  const extensionsPath = join(apisDir, "Extensions", `${entity.name}Extensions.cs`);
  const extensionsFile = modules.get(extensionsPath);

  if (extensionsFile) {
    const updatedCode = extensionsFile.code + `
    public static string GetDisplayName(this ${entity.name} entity)
    {
        return $"{entity.FirstName} {entity.LastName}";
    }
    `;

    modules.set({
      path: extensionsPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateEntityModel

Creates a model class for a specific entity in the .NET application.

### Event Name

`CreateEntityModel`

### Event Params

```ts
export interface CreateEntityModelParams extends EventParams {
  entity: Entity;
  entities: Entity[];
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityModel(
  context: DsgContext,
  eventParams: CreateEntityModelParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const modelPath = join(apisDir, "Models", `${resourceName}.cs`);
  const modelFile = modules.get(modelPath);

  if (modelFile) {
    const updatedCode = modelFile.code.replace(
      "public class",
      "[Table(\"" + entity.name + "\")]\npublic class"
    );

    modules.set({
      path: modelPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateResourceDbContextFile

Creates the database context file for the .NET application.

### Event Name

`CreateResourceDbContextFile`

### Event Params

```ts
export interface CreateResourceDbContextFileParams extends EventParams {
  entities: Entity[];
  resourceName: string;
  resourceDbContextPath: string;
}
```

Example:

```ts
async afterCreateResourceDbContextFile(
  context: DsgContext,
  eventParams: CreateResourceDbContextFileParams,
  modules: ModuleMap
) {
  const { resourceName, resourceDbContextPath } = eventParams;
  const dbContextFile = modules.get(resourceDbContextPath);

  if (dbContextFile) {
    const updatedCode = dbContextFile.code.replace(
      "public class",
      "public class " + resourceName + "DbContext : DbContext\n{\n"
    ) + `
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Add your custom configurations here
    }
    `;

    modules.set({
      path: resourceDbContextPath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateSeedDevelopmentDataFile

Creates a file for seeding development data in the .NET application.

### Event Name

`CreateSeedDevelopmentDataFile`

### Event Params

```ts
export interface CreateSeedDevelopmentDataFileParams extends EventParams {
  seedFilePath: string;
  resourceName: string;
}
```

Example:

```ts
async afterCreateSeedDevelopmentDataFile(
  context: DsgContext,
  eventParams: CreateSeedDevelopmentDataFileParams,
  modules: ModuleMap
) {
  const { seedFilePath, resourceName } = eventParams;
  const seedFile = modules.get(seedFilePath);

  if (seedFile) {
    const updatedCode = seedFile.code + `
    public static void SeedCustomData(${resourceName}DbContext context)
    {
        if (!context.Users.Any())
        {
            context.Users.AddRange(
                new User { Username = "admin", Email = "admin@example.com" },
                new User { Username = "user1", Email = "user1@example.com" }
            );
            context.SaveChanges();
        }
    }
    `;

    modules.set({
      path: seedFilePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateControllerModuleFile

Creates a module file for controllers in the .NET application.

### Event Name

`CreateControllerModuleFile`

### Event Params

```ts
export interface CreateControllerModuleFileParams extends EventParams {
  moduleActionsAndDtos: ModuleActionsAndDtos;
  resourceName: string;
  controllerModuleBasePath: string;
}
```

Example:

```ts
async afterCreateControllerModuleFile(
  context: DsgContext,
  eventParams: CreateControllerModuleFileParams,
  modules: ModuleMap
) {
  const { resourceName, controllerModuleBasePath } = eventParams;
  const controllerModuleFile = modules.get(controllerModuleBasePath);

  if (controllerModuleFile) {
    const updatedCode = controllerModuleFile.code + `
    [ApiExplorerSettings(GroupName = "${resourceName}")]
    public class ${resourceName}ControllerModule : ControllerBase
    {
        // Add your custom controller logic here
    }
    `;

    modules.set({
      path: controllerModuleBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```

## CreateControllerBaseModuleFile

Creates a base module file for controllers in the .NET application.

### Event Name

`CreateControllerBaseModuleFile`

### Event Params

```ts
export interface CreateControllerBaseModuleFileParams extends EventParams {
  moduleActionsAndDtos: ModuleActionsAndDtos;
  resourceName: string;
  controllerBaseModuleBasePath: string;
}
```
