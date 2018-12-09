// vue.config.js file to be place in the root of your repository
// make sure you update `yourProjectName` with the name of your GitLab project
// FOR GITLAB PAGES

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
      ? '/marvel-tests/'
      : '/',
    configureWebpack: {
      devtool: 'source-map'
    }
}