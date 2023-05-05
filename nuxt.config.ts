// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/supabase'],
  sourcemap: {
    server: true,
    client: true,
  },
  runtimeConfig: {
    httpLogs: 'none',
  },
});
