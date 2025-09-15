import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Nuxt's "ssr: true" is default in Next.js
    // (App Router pages are SSR unless marked "use client")

    experimental: {
        // Nuxt's "compatibilityDate" has no direct equivalent,
        // but experimental features are set here if needed
    },

    devIndicators: {
        buildActivity: true, // kind of like Nuxt devtools enabled
    },

    env: {
        // Server-side only
        WEBINY_MAIN_API: process.env.WEBINY_MAIN_API,
        WEBINY_MAIN_API_KEY: process.env.WEBINY_MAIN_API_KEY,

        // Public (exposed to client)
        NEXT_PUBLIC_WEBINY_CMS_API: process.env.VITE_WEBINY_CMS_API,
        NEXT_PUBLIC_WEBINY_CMS_API_KEY: process.env.VITE_WEBINY_CMS_API_KEY,
    },
};

export default nextConfig;
