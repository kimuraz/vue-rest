module.exports = {
  base: '/vue-rest/',
  title: 'Vue Rest',
  description: 'A fast way to make REST cruds',
  serviceWorker: false,
  themeConfig: {
    repo: 'kimuraz/vue-rest',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'Home',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Getting started',
            link: '/started.md'
          },
          {
            text: '$api',
            link: '/prototype.md'
          },
          {
            text: 'Mixins',
            link: '/mixins.md'
          }
        ],
        sidebar: [
          'intro.md',
          'started.md',
          'prototype.md',
          'mixins.md'
        ]
      }
    }
  }
}