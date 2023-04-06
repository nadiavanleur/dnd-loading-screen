import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `DnD loading screen tips`,
    siteUrl: `https://dndloadingscreen.site`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: "src/assets/images/icon.png",
        name: `Dungeons and Dragons loading screen tips`,
        short_name: `D&D loading screen tips`,
        description: `Dungeon Masters can't know everything and sometimes need to look things up. Inspired by /u/CountedCrow this loading screen / screensaver was made. You can put this on a screen at your D&D table to give your players something to talk about while you prepare the next encounter.`,
        keywords: `dungeons and dragons, dnd, loading screen, tips, DM resources, dungeon master`,
        author: `/u/nachowithan_a <contact@dndloadingscreen.site>`,
        start_url: `/`,
        theme_color: `#170304`,
        display: `standalone`,
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/assets/images/"
      },
      __key: "images"
    },
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeDimensions: false,
                  removeViewBox: false,
                  cleanupIDs: true,
                },
              },
            }
          ],
        },
      },
    },
    `gatsby-transformer-inline-svg`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-WE7B23C41M", // Google Analytics / GA
        ],
      },
    }
  ]
};

export default config;
