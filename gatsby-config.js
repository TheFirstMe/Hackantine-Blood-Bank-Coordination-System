require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
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
