// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/bootstrap-custom.scss',
    '~/assets/scss/template.scss'
  ],
  runtimeConfig: {
    webinyMainApi: process.env.WEBINY_MAIN_API,
    webinyMainApiKey: process.env.WEBINY_MAIN_API_KEY,
    public: {
        webinyCmsApi: process.env.VITE_WEBINY_CMS_API,
        webinyCmsApiKey: process.env.VITE_WEBINY_CMS_API_KEY,
        nuxtPackageTest: process.env.NUXT_PACKAGE_TEST
    }
  }
})
