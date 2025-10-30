// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CTF Handbook',
  tagline: 'Decode, Exploit, Conquer: Your CTF journey starts here!',
  favicon: 'img/profile-favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ctf.horia.delicoti.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Custom fields for cross-project references
  customFields: {
    wikiUrl: 'https://wiki.horia.delicoti.com',
    version: require('./package.json').version,
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'horia-delicoti', // Usually your GitHub org/user name.
  projectName: 'ctfs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

   markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn', // Warn on broken markdown links
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
          remarkPlugins: [],
          rehypePlugins: [],
          // Enable MDX for .md files in main docs
          include: ['**/*.{md,mdx}'],
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
        pages: false, // Disable the default pages plugin since we're using docs as homepage
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'writeups',
        path: 'ctf_writeups',
        routeBasePath: 'ctf_writeups',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [],
        rehypePlugins: [],
        include: ['**/*.{md,mdx}'], // Enable MDX for .md files in writeups
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CTF Handbook 🥷',
        logo: {
          alt: 'My Site Logo',
          src: 'img/profile.jpeg',
        },
        items: [
          {to: '/ctf_writeups/', label: 'Writeups ✍️', position: 'left'},
          {
            href: 'https://github.com/horia-delicoti/ctfs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Horia Delicoti • v${require('./package.json').version} • Powered by <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
