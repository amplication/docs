module.exports = {
  title: "Amplication Docs",
  tagline: "Welcome to the Amplication documentation",
  url: "https://docs.amplication.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "amplication", // Usually your GitHub org/user name.
  projectName: "amplication", // Usually your repo name.
  trailingSlash: true,
  themeConfig: {
    metadata: [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:domain", content: "docs.amplication.com" },
      { name: "twitter:image", content: "/img/amplication-docs-social-card.png" },

      { name: "og:image", content: "/img/amplication-docs-social-card.png" },
      { name: "og:type", content: "website" }
    ],
    algolia: {
      // The application ID provided by Algolia
      appId: "2U9P8WAXIR",

      // Public API key: it is safe to commit it
      apiKey: "3aedb20f97bf433d57d27c8c250c8c04",

      indexName: "docs-amplication",

      // Optional: see doc section below
      contextualSearch: false,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",
      // Hides the switch in the navbar
      disableSwitch: true,
    },
    navbar: {
      hideOnScroll: false,
      title: "",
      logo: {
        alt: "Amplication",
        src: "img/amplication-logo.svg",
        srcDark: "img/amplication-logo-dark.svg",
        href: "https://amplication.com/",
      },
      items: [
        {
          to: "/",
          position: "left",
          label: "Get Started",
          activeBaseRegex: '^/$'
        },
        {
          to: "/tutorials",
          position: "left",
          label: "Tutorials",
        },
        {
          to: "/custom-code",
          position: "left",
          label: "Custom Code",
        },
        {
          to: "/api",
          position: "left",
          label: "Generated APIs",
        },
        {
          to: "https://app.amplication.com/login",
          label: "Start Now",
          position: "right",
          className: "start-now-button",
        },
        {
          href: "https://meetings-eu1.hubspot.com/muly/talk-tech-vp-engineering",
          html: "Contact Us",
          position: "right",
        },
        {
          href: "https://github.com/amplication/amplication",
          html: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              to: "/",
              label: "Get Started",
            },
            {
              to: "tutorials",
              label: "Tutorials",
            },
            {
              to: "custom-code",
              label: "Custom Code",
            },
            {
              to: "api",
              label: "Generated APIs",
            },
            {
              to: "how-to",
              label: "How Tos",
            },
            {
              to: "errors",
              label: "Troubleshooting",
            },
          ],
        },
        {
          title: "Follow Us",
          items: [
            {
              label: "Discord",
              href: "https://amplication.com/discord",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/amplication",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/amplicationcom/",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/amplication",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "Blog",
              href: "https://amplication.com/blog",
            },
            {
              label: "About Us",
              href: "https://amplication.com/about",
            },
            {
              label: "Team",
              href: "https://amplication.com/team",
            },
            {
              label: "Contact Us",
              href: "https://meetings-eu1.hubspot.com/oalaluf/meet-with-oren",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} amplication. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/amplication/docs/edit/main/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/dark-theme.css"),
          ],
        },
      },
    ],
  ],
  plugins: [
    "./plugins/analytics",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/deploy/docker-desktop",
            from: ["/deploy"]
          },
          {
            to: "/getting-started/",
            from: ["/guides/getting-started"],
          },
          {
            to: "/getting-started/dev-env/",
            from: ["/docs/how-to/dev-env"],
          },
          {
            to: "/faqs/",
            from: ["/faqs/faqs/faqs/", "/faqs/faqs/"],
          },
          {
            to: "/getting-started/plugins/",
            from: ["/getting-started/getting-started/plugins/"],
          },
          {
            to: "/about/licensing/",
            from: ["/about/about/licensing/"],
          },
          {
            to: "/api/generated-api-pagination/",
            from: ["/api/api/generated-api-pagination/"],
          },
          {
            to: "/api/generated-api-filtering/",
            from: ["/api/api/generated-api-filtering/"],
          },
          {
            to: "/api/generated-api-sorting/",
            from: ["/api/api/generated-api-sorting/"],
          },
          {
            to: "/api/generated-api-sorting/",
            from: ["/getting-started/getting-started/phone-home/"],
          },
          {
            to: "/how-to/create-service",
            from: ["/how-to/create-app"]
          },
          {
            to: "/first-service/",
            from: ["/first-app/"],
          },
          {
            to: "/custom-types-and-actions",
            from: ["/custom-actions"]
          }
        ],
      },
    ],
    [
      require.resolve("docusaurus-gtm-plugin"),
      {
        id: "GTM-TQF7HCF", // GTM Container ID
      },
    ],
  ],
  scripts: [
    {
      src: "/global.js",
      async: true,
    },
  ],
};
