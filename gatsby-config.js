require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Hackantine`,
  },
  plugins: [
    'gatsby-plugin-zeit-now',
    `gatsby-theme-material-ui`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
  ],
};
