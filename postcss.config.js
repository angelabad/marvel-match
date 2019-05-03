const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('autoprefixer'),
        purgecss({
            content: [
                "./src/**/*.vue",
                "./src/**/*.js",
                "./node_modules/buefy/src/components/autocomplete/Autocomplete.vue",
                "./node_modules/buefy/src/components/modal/Modal.vue",
                "./node_modules/buefy/src/components/pagination/Pagination.vue"
            ],
            whitelist: ["html", "body"]
        })
    ]
}