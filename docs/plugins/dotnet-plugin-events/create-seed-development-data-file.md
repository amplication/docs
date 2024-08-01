---
id: create-seed-development-data-file
title: Create Seed Development Data File | .NET Plugin Event
description: Creates a file for seeding development data in the .NET application.
sidebar_label: Create Seed Development Data File
slug: /plugins/dotnet-plugin-events/create-seed-development-data-file
---

# Create Seed Development Data File


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
  files: FileMap<F>
) {
  const { seedFilePath, resourceName } = eventParams;
  const seedFile = files.get(seedFilePath);

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

    files.set({
      path: seedFilePath,
      code: updatedCode
    });
  }

  return files;
}
```