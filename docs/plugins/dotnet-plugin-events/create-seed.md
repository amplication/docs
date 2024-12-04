---
id: create-seed
title: Create Seed | .NET Plugin Event
description: Creates the seed data file for the .NET application.
sidebar_label: Create Seed
slug: /plugins/dotnet-plugin-events/create-seed
---

# Create Seed


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