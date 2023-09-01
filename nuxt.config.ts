// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['nuxt-svgo', '@pinia/nuxt'],
    css: [
        "~/styles/variables.css",
        "~/styles/global.css",
        "~/styles/fonts.css"
    ],
})
