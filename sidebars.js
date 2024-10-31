const sidebars = {
  someSidebar: [
    {
      type: "category",
      label: "Get Started",
      link: {
        type: "doc",
        id: "welcome",
      },
      items: [
        "welcome",
        "getting-started/first-service",
        "getting-started/set-up-entities",
        "getting-started/configure-roles-and-permissions",
        "getting-started/add-plugins-for-service",
        "how-to/platform-console",
        "getting-started/commit-changes-and-build-new-versions"
      ],
    },
    {
      type: "category",
      label: "The Generated Service",
      link: {
        type: "doc",
        id: "getting-started/generated-app",
      },
      items: [
        "getting-started/generated-app",
        "getting-started/service-building-new-versions",
        "getting-started/view-generated-code",
        "how-to/add-custom-code",
        "getting-started/authentication",
        "concepts/event-driven-architecture",
        {
          type: "category",
          label: "Generated API",
          link: {
            type: "doc",
            id: "api/index",
          },
          items: [
            "getting-started/generated-app-api",
            "api/generated-api-sorting",
            "api/generated-api-filtering",
            "api/generated-api-pagination",
            "api/meta-query-graphql",
          ],
        }
      ]
    },
    {
      type: "category",
      label: "Amplication AI",
      items: [
        "how-to/amplication-ai",
        "how-to/amplication-ai-examples"
      ]
    },
    {
      type: "category",
      label: "Sync With Git",
      items: [
        "getting-started/smart-git-sync",
        "getting-started/sync-with-github",
        "getting-started/sync-with-bitbucket",
        "getting-started/sync-with-aws-codecommit",
        // "getting-started/sync-with-git-differences-between-plans",
        "how-to/how-to-commit-changes",
        "how-to/base-directories",
        "how-to/change-base-branch-for-pull-requests"
      ]
    },
    {
      type: "category",
      label: "Data Modeling",
      items: [
        "how-to/default-value-entity-field",
        "how-to/import-prisma-schema",
        "getting-started/how-prisma-schema-is-converted-into-entities",
        "how-to/erd-view-for-amplication-entities",
        "how-to/add-delete-user-entity",
        "how-to/how-to-create-entity",
        "how-to/how-to-create-entity-field",
        "how-to/how-to-set-access-permissions",
        "getting-started/relations"
      ]
    },
    {
      type: "category",
      label: "Deployment",
      link: {
        type: "doc",
        id: "how-to/deploy",
      },
      items: [
        "how-to/deploy",
        "getting-started/deploy-docker-desktop",
        "how-to/deploy-kubernetes",
        "how-to/deploy-to-aws-ecs",
      ]
    },
    {
      type: "category",
      label: "Enterprise Features",
      items: [
        "how-to/enterprise-sso",
        "how-to/git-branch-per-service",
        "how-to/code-generator-version-control",
        "premium-features/enterprise-git-providers",
        "premium-features/custom-base-branch",
        "premium-features/private-plugins",
        "premium-features/break-the-monolith",
        "premium-features/custom-types-and-actions"
      ]
    },
    {
      type: "category",
      label: "How To",
      link: {
        type: "doc",
        id: "how-to/index",
      },
      items: [
        {
          type: "category",
          label: "Customize Your Generated Service",
          link: {
            type: "doc",
            id: "custom-code/index",
          },
          items: [
            "custom-code/managing-custom-files",
            "custom-code/add-business-logic",
            "custom-code/add-action-to-controller",
            "custom-code/prisma-custom-attributes",
            "custom-code/add-graphql-query",
            "custom-code/seed-db",
            "custom-code/add-custom-dto",
            "how-to/api-admin-ui-settings",
          ],
        },
        {
          type: "category",
          label: "Run Amplication Locally",
          link: {
            type: "doc",
            id: "how-to/run-dev-env",
          },
          items: [
            "how-to/run-dev-env",
            "running-amplication-platform/connect-server-to-github",
            "running-amplication-platform/connect-server-to-bitbucket",
            "running-amplication-platform/configure-github-auth",
            "getting-started/cli"
          ],
        },
        "how-to/analytics-dashboard",
        "how-to/understanding-break-the-monolith",
        "how-to/how-to-create-service"
      ],
    },
    {
      type: "category",
      label: "Plugins",
      link: {
        type:"doc",
        id: "getting-started/plugins"
      },
      items: [
        "getting-started/plugins",
        "getting-started/community-plugins",
        "plugins/dotnet-plugins",
         {
          type: "category",
          label: "Plugin Guides",
          items: [
            "how-to/choose-configure-update-database",
            "how-to/authentication-plugin-examples",
            "how-to/create-message-broker",
          ]
        },
        {
          type: "category",
          label: "Custom Plugins",
          link: {
            type:"doc",
            id: "plugins/overview"
          },
          items: [
            "plugins/overview",
            "plugins/plugin-architecture",
            "plugins/how-to-create-plugin",
            "plugins/define-plugin-settings",
            "plugins/how-to-test-plugin",
            "plugins/publish-plugin",
            "plugins/plugin-events-before-after",
            "plugins/context-skip-default",
            "plugins/event-hierarchy",
            {
              type: "category",
              label: ".NET Plugin Events - Reference",
              items: [
                "plugins/dotnet-plugin-events/create-server",
                "plugins/dotnet-plugin-events/create-server-appsettings",
                "plugins/dotnet-plugin-events/create-server-auth",
                "plugins/dotnet-plugin-events/create-program-file",
                "plugins/dotnet-plugin-events/create-server-csproj",
                "plugins/dotnet-plugin-events/create-server-docker-compose",
                "plugins/dotnet-plugin-events/create-server-git-ignore",
                "plugins/dotnet-plugin-events/create-entity-model",
                "plugins/dotnet-plugin-events/create-resource-db-context-file",
                "plugins/dotnet-plugin-events/create-message-broker",
                "plugins/dotnet-plugin-events/create-message-broker-client-options-factory",
                "plugins/dotnet-plugin-events/create-message-broker-service",
                "plugins/dotnet-plugin-events/create-entity-controller",
                "plugins/dotnet-plugin-events/create-entity-controller-base",
                "plugins/dotnet-plugin-events/create-dtos",
                "plugins/dotnet-plugin-events/create-entity-extensions",
                "plugins/dotnet-plugin-events/create-entity-interface",
                "plugins/dotnet-plugin-events/create-entity-service",
                "plugins/dotnet-plugin-events/create-entity-service-base",
                "plugins/dotnet-plugin-events/create-seed-development-data-file",
                "plugins/dotnet-plugin-events/load-static-files"
              ],
            },
            {
              type: "category",
              label: "Node.js Plugin Events - Reference",
              items: [
                "plugins/plugin-events/create-server",
                "plugins/plugin-events/create-server-docker-compose",
                "plugins/plugin-events/create-server-docker-compose-dev",
                {
                  type: 'doc',
                  id: 'plugins/plugin-events/create-server-docker-compose-db',
                  className: 'plugin-event-not-recommended', 
                },
                "plugins/plugin-events/create-server-dot-env",
                "plugins/plugin-events/create-server-auth",
                "plugins/plugin-events/create-package-json",
                "plugins/plugin-events/create-entity-service",
                "plugins/plugin-events/create-entity-service-base",
                "plugins/plugin-events/create-entity-controller",
                "plugins/plugin-events/create-entity-controller-base",
                "plugins/plugin-events/create-entity-resolver",
                "plugins/plugin-events/create-entity-resolver-base",
                "plugins/plugin-events/create-message-broker-service",
                "plugins/plugin-events/create-message-broker-service-base",
                "plugins/plugin-events/create-message-broker-nestjs-module",
                "plugins/plugin-events/create-message-broker-client-options-factory",
                "plugins/plugin-events/create-message-broker-topics-enum",
                "plugins/plugin-events/create-prisma-schema",
              ],
            }
          ],
        },
      ]
    },
    {
      type: "category",
      label: "Learn",
      link: {
        type: "doc",
        id: "tutorials/index",
      },
      items: [
        "tutorials/index",
        "tutorials/community-tutorials",
        {
          type: "link",
          label: "Developer Tutorials",
          href: "https://amplication.com/tags/backend-development"
        },
        {
          type: "link",
          label: "Video Guides",
          href: "https://www.youtube.com/@Amplicationcom/videos"
        },
        {
          type: "category",
          label: "Step-by-Step Tutorials",
          items: [
            {
              type: "category",
              label: "Angular Todos",
              link: {
                type: "doc",
                id: "tutorials/angular-todos/angular-todos-step-000",
              },
              items: [
                "tutorials/angular-todos/angular-todos-step-001",
                "tutorials/angular-todos/angular-todos-step-002",
                "tutorials/angular-todos/angular-todos-step-003",
                "tutorials/angular-todos/angular-todos-step-004",
                "tutorials/angular-todos/angular-todos-step-005",
                "tutorials/angular-todos/angular-todos-step-006",
              ],
            },
            {
              type: "category",
              label: "React Todos",
              link: {
                type: "doc",
                id: "tutorials/react-todos/react-todos-step-000",
              },
              items: [
                "tutorials/react-todos/react-todos-step-001",
                "tutorials/react-todos/react-todos-step-002",
                "tutorials/react-todos/react-todos-step-003",
                "tutorials/react-todos/react-todos-step-004",
                "tutorials/react-todos/react-todos-step-005",
                "tutorials/react-todos/react-todos-step-006",
              ],
            }
          ]
        }
      ],
    },
    {
      type: "category",
      label: "About",
      link: {
        type: "doc",
        id: "about/index",
      },
      items: [
        "about/licensing",
        "about/product-roadmap",
        "getting-started/phone-home",
      ],
    },

    "faqs/faqs",

    {
      type: "category",
      label: "Troubleshooting",
      link: {
        type: "doc",
        id: "errors/index",
      },
      items: [
        {
          type: "category",
          label: "Code Generation",
          items: [
            "errors/invalid-code-generation-version",
            "errors/missing-code-generation-version",
          ],
        },
        {
          type: "category",
          label: "Authorization",
          items: ["errors/could-not-authorize-user"],
        },
        {
          type: "category",
          label: "GitHub",
          items: ["how-to/resolve-github-connection-errors", "errors/merge-conflict", "errors/github-different-app-id"],
        },
        {
          type: "category",
          label: "Set-Up",
          items: ["errors/installation-fails", "errors/installation-slow"],
        },
        {
          type: "category",
          label: "DB",
          items: ["errors/prisma-denied-access-on-postgres"],
        },
      ],
    },
    {
      type: "category",
      label: "Contribute To Amplication",
      link: {
        type: "doc",
        id: "contributing",
      },
      items: ["contributing", "community/handling-a-new-issue"],
    },
  ],
};

module.exports = sidebars;