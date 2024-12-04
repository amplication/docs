---
id: faqs
title: Frequently Asked Questions
sidebar_label: FAQs
slug: /faqs
toc_max_heading_level: 2
---

Here are some questions that we are asked about frequently about using Amplication:

## General

### What is Amplication?

Amplication is an open-source AI-powered code generation platform that helps developers build and manage backend services without spending time on repetitive coding tasks and boilerplate code. Amplication auto-generates a fully functional, production-ready backend based on Node.js and .NET.

### How does Amplication work?

You just need to define your data models, roles, and permissions, and Amplication will generate a Node.js or .NET application with everything you need already baked in. This includes fully functional REST API and GraphQL API for all your data models, authentication, role-based authorization, logging, and even an admin UI.

## Pricing and Editions

### How does Amplication's pricing work?

Our pricing plans are applied per each workspace individually. The Free plan is offered for **FREE**.

The Essential plan is offered in a monthly or annual subscription for single or multiple projects. See [our pricing page](https://amplication.com/pricing) for more information.

Enterprise plan pricing will be tailored to your specific requirements. [Contact us](https://amplication.com/contact-us) to get a quote.

### What plan is best for me and my team?

Choosing the right plan depends on your project needs:

- **Free Plan:** Ideal for individual developers working on small-scale applications. This plan includes core features like Node.js support, database integration, roles & permissions, GraphQL & REST APIs, and unlimited code generation builds. It's perfect for getting started without any cost.

- **Essential Plan:** This plan is best for small teams building collaborative projects. It includes enhanced capabilities such as support for both Node.js and .NET, more Jovu requests, multiple services, custom actions support, and additional team members.

- **Enterprise Plan:** For larger organizations with more complex needs, the Enterprise plan is the best fit. It includes all the features of the Essential plan plus unlimited Jovu requests, projects, services, and team members. Additionally, it offers advanced security features like SSO and 2FA, comprehensive Git sync options for all enterprise providers, and tools for breaking monolithic applications into microservices. This plan is tailored for scalability and integration with lifecycle management tools. For a full breakdown of its capabilities and to get a personalized quote, [contact us](https://amplication.com/contact-us) directly.

## Code Ownership and Customization

### Who owns the code I generate with Amplication?

You own the code. Develop your service and applications however you wish, and deploy
it wherever you want.

### How can I customize the generated code, and will the generated code override my custom changes?

You can customize the generated code just like any other code changes in your existing code base.

Amplication's Smart Git Sync feature ensures that your custom code always takes precedence over the generated code, so your changes will not be overridden. For more details on how this works, please refer to our [Smart Git Sync documentation](https://docs.amplication.com/smart-git-sync/).

### We have our own best practices and standards - can we ask Amplication to generate the code in our own flavor?

Amplication offers a structured way to [add custom code](https://docs.amplication.com/custom-code/) and modify your generated code.

We also provide various [plugins](https://docs.amplication.com/getting-started/plugins/), like Prettier and ESLint, so you can format your code exactly how you need it.

Furthermore, you can create [private plugins](https://docs.amplication.com/enterprise-private-plugins/) that are accessible only within your organization.

## Version Control and Collaboration

### How can I get the code?

You can connect your project to your preferred git provider like [GitHub](/sync-with-github), [Bitbucket](/sync-with-bitbucket), GitLab, or AWS CodeCommit.

After connecting to a git repo you can push a new Pull Request directly to a selected git repository. There is also a code-view option, that enables you to view the code in the console before you push it to your git provider.

### Does Amplication support the monorepo version control model?

Amplication supports the monorepo model, allowing you and your team to collaborate on bigger projects.

In version control systems, a monorepo ("mono" meaning 'single' and "repo" is short for 'repository') is a software development strategy where code for many projects is stored in the same repository. Providing you the power to use the microservices approach for you services.

The monorepo model provides you with several advantages:

- Easy visibility of your services
- Code sharing among services to avoid code redundancy
- Improved collaboration
- Release management

### Will all my services be stored in the same or different repositories?

The choice is yours.
You can decide where you want to sync your code for each service.

You can store each service in its own separate repo.
You can also group services together in the same repository.

Amplication provides two options for organizing your generated code in a git repository:

- **Monorepo** - Stores your service code in a dedicated folder you select. Great if combining multiple services in one repo.
- **Polyrepo** - Puts your service code at the root of the repo. Better if you want a single service per repository.

:::note
Check out our docs for more on syncing to a git repository and how Amplication handles pull requests:

- [Sync with GitHub](/sync-with-github)
- [Sync with Bitbucket](/sync-with-bitbucket)
- [Sync With AWS CodeCommit](/sync-with-aws-codecommit/)
:::

### We are working with the enterprise edition of GitLab / BitBucket, will it work with Amplication?

Amplication's compatibility with git providers varies based on the plan:

- **Free & Essential Plans:** Support GitHub
- **Enterprise Plan**: Supports Bitbucket, AWS CodeCommit, GitLab, and any other Git provider

## Scalability and Architecture

### We have legacy systems, and would like to progress to modern architecture. Can you assist with it?

Amplication can facilitate the modernization of your legacy system. We offer a suite of tools and features designed to streamline this process like [DB Schema Import](https://docs.amplication.com/how-to/import-prisma-schema/), [Data Modeling](https://docs.amplication.com/how-to/create-entity/), [Event Brokering](https://docs.amplication.com/plugins-list/#apache-kafka), [Customizable Code Generation](https://docs.amplication.com/custom-code/), [Break The Monolith](https://docs.amplication.com/break-the-monolith/), and many more features.

### How does Amplication help me to scale my project?

Amplication incorporates the following practices to provide you with a platform to better scale your projects:

- Microservices support  
- Plugin system
- Monorepo with modular connected services  
- Custom sync flows and [Smart Git Sync](/smart-git-sync) at the project level

With these new features and improvements in our new version, we make it much easier for you (or your team) to build scalable services, have better control over the generated code and collaborate with multiple developers to work on large scale solutions.

Read our documentation on [Amplication's key features](https://docs.amplication.com/#key-features-of-amplication) to learn more.

### How does the microservices architecture benefit my development?

Amplication's Microservices architecture enables you to develop services with ease and select the best tech stack for each service. Different development teams can work on different services without cross-team dependencies.

Project development becomes easier with the following functionalities:

- You can connect to a single git repo at the project level saving a lot of your time that would be spent manually connecting the services
- You can make a single commit at the project level

Learn more about the benefits on our [Support for Microservices Architecture](https://amplication.com/blog/release-0150-support-for-microservices-architecture) blog post.

## Supported Technologies and Deployment

### Which databases does Amplication support?

Amplication currently includes plugins to support PostgreSQL, MySQL, MongoDB, MS SQL, and more. For a full list visit the [Generated Service](/getting-started/) page.

### Can you assist with deploying to various cloud providers like AWS?

Yes, Amplication offers a wide range of relevant plugins and comprehensive guides that enable deployment to services such as [Kubernetes](https://docs.amplication.com/deploy/kubernetes/), [Docker Desktop](https://docs.amplication.com/deploy/docker-desktop/), [AWS's ECS](https://docs.amplication.com/deploy/aws/ecs/), and more.

Need to deploy to other cloud providers? You can easily [create a custom plugin](https://docs.amplication.com/plugins/how-to-create-plugin/) for that.

### I have an existing DB with a lot of data, entities, tables, and relationships. Can I use Amplication, while still keeping my existing data?

Amplication's DB Schema Import feature provides a clear pathway for integrating an existing database with Amplication's platform. The import feature is available on Amplication's Enterprise plan.

## Security and Team Management

### Does Amplication support advanced security features like 2FA, audit logs, and SSO for organizational security concerns?

Yes, Amplication's Enterprise plan is equipped with advanced security features to meet the needs of your organization. This includes support for [Single Sign-On (SSO)](https://docs.amplication.com/enterprise-sso/), audit logs, and Two-Factor Authentication (2FA).

### We have multiple teams in the organization, can we use one account to manage separate teams?

Yes, the Enterprise plan lets you have unlimited projects, services, and team members. You can manage all your teams from the same organization in your preferred structure.

## Community and Contribution

### Can I contribute to the development of Amplication?

We'd love to have you contribute! To find out how, read our [Contributing](https://docs.amplication.com/contributing/) guide.

### How can I keep in touch with the Amplication community?

Join us at any of the following locations:

- [GitHub](https://github.com/amplication)
- [Discord](https://amplication.com/discord)
- [Amplication website](https://amplication.com/)
- [Blog](https://amplication.com/blog)
- [Docs](https://docs.amplication.com/getting-started/)
