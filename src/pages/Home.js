import React from "react";
import clsx from "clsx";
import styles from "./Home.module.css";
import Link from "@docusaurus/Link";

const images = {
  restAPI:
    "https://amplication.com/_next/static/media/enterprise-2.c55b797b.svg",
  customCode:
    "https://amplication.com/_next/static/media/enterprise-1.87c33326.svg",
  community: "https://amplication.com/_next/static/media/social.35c6604e.svg",
  gitSync:
    "https://amplication.com/_next/static/media/sync_with_github.1d7a27e3.svg",
  authorization:
    "https://amplication.com/_next/static/media/enterprise-4.d36c1ed8.svg",
  appDevelopment:
    "https://amplication.com/_next/static/media/data-models.d7de4216.svg",
};

function Hero() {
  return (
    <div className={clsx(styles.hero, "text--center")}>
      <img
        src="/img/amplication-logo-dark.svg"
        alt="Amplication Logo"
        className={styles.logo}
      />
      <h1>Documentation</h1>
      <h2>
        The open-source backend development platform that helps you deliver code
        to production 20x faster
      </h2>
      <div className={styles.heroCTAs}>
        <Link to="/welcome/" className="button button--primary">
          Learn Amplication
        </Link>
        <Link to="/faqs/" className="button button--secondary">
          FAQs
        </Link>
      </div>
    </div>
  );
}

function Section({ headline, subheadline, imageUrl, ctaText, ctaLink, type }) {
  return (
    <div className={clsx(styles.section, styles[type], "text--center")}>
      <h2 className={styles.sectionHeadline}>{headline}</h2>
      <h3 className={styles.sectionSubheadline}>{subheadline}</h3>
      <img src={imageUrl} alt={headline} className={styles.sectionImage} />
      {ctaText && ctaLink && (
        <Link
          to={ctaLink}
          className={clsx(styles.sectionButton, "button button--primary")}
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Section
        headline="Accelerate application development with automation"
        subheadline="Amplication simplifies and speeds up the process of building backend Node.js applications. Create your own data models, relationships, and permissions, and Amplication will auto-generate high-quality, customizable code for you."
        imageUrl={images.appDevelopment}
        ctaText="Create your first service"
        ctaLink="/first-app/"
        type="primary"
      />
      <Section
        headline="Generate human-editable Node.js code with ease"
        subheadline="Amplication generates code based on your specifications, following best practices and industry standards. It provides a visual builder that allows you to design your application's data models, relationships, and permissions without writing a single line of code."
        imageUrl={images.customCode}
        ctaText="Customize your app"
        ctaLink="/custom-code/"
        type="secondary"
      />
      <Section
        headline="Instantly generate REST APIs"
        subheadline="Amplication automatically generates a fully functional REST API based on your data models. It comes complete with CRUD operations, filtering, sorting, and pagination."
        imageUrl={images.restAPI}
        ctaText="Generate your REST API"
        ctaLink="/api/"
        type="tertiary"
      />
      <Section
        headline="Integrate Authentication and Authorization"
        subheadline="Amplication includes authentication mechanisms based on NestJS/Passport and makes it easy to manage user access and roles within your application."
        imageUrl={images.authorization}
        ctaText="Learn about Authentication"
        ctaLink="/authentication/"
        type="primary"
      />
      <Section
        headline="Keep track of changes with Continuous Git Sync"
        subheadline="Amplication's Continuous Git Sync feature ensures your application's codebase is always in sync with your Git repository. As you make changes to your application using Amplication's visual builders and CLI, the platform automatically syncs those modifications to your repository."
        imageUrl="https://via.placeholder.com/500x500"
        ctaText="Learn about GitHub Sync"
        ctaLink="/sync-with-github/"
        imageUrl={images.gitSync}
      />
      <Section
        headline="Join the Amplication community"
        subheadline="Join thousands of developers worldwide are using Amplication to build their applications, contributing to its continuous growth and improvement."
        ctaText="Join Amplication's Discord"
        ctaLink="https://amplication.com/discord"
        imageUrl={images.community}
      />
    </div>
  );
}
