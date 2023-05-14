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
          href: "https://amplication.com/contact-us",
          html: "Contact Us",
          position: "right",
        },
        {
          href: "https://github.com/amplication/amplication",
          html: "GitHub",
          position: "right",
        },
        {
          to: "https://app.amplication.com/login",
          label: "Start Now",
          position: "right",
          class: "start-now-button",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
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
            to: "/getting-started/",
            from: ["/guides/getting-started"],
          },
          {
            to: "/getting-started/dev-env/",
            from: ["/docs/how-to/dev-env"],
          },
          {
            to: "/faqs/",
            from: ["/faqs/faqs/faqs/"],
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
