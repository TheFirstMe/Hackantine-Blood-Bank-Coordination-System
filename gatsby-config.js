require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Hackantine`,
  },
  plugins: [
    `gatsby-theme-material-ui`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
  ],
};
