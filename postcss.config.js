const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('autoprefixer'),
        purgecss({
            content: [
                "./src/**/*.vue",
                "./src/**/*.js",
                "./node_modules/buefy/dist/components/autocomplete/*.js",
                "./node_modules/buefy/dist/components/modal/*.js",
                "./node_modules/buefy/dist/components/pagination/*.js"
            ],
            whitelist: ["html", "body"]
        })
    ]
}