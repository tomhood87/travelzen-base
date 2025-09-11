# TravelZen Base

A modern starter project that integrates **[Nuxt](https://nuxt.com/)** with **[Webiny Headless CMS](https://www.webiny.com/)**.  
This base repo provides a foundation for building fully server-side rendered (SSR) travel websites with dynamic content, menus, and layouts powered by Webiny.

---

## 🚀 Features

- **Nuxt** — Vue framework with SSR and static generation.
- **Webiny CMS** — Headless CMS for structured content, menus, and Page Builder.
- **Dynamic Menus** — Navigation items managed in Webiny and rendered in Nuxt.
- **Page Builder Content** — Pulls published content directly from Webiny’s Read API.
- **Server-side Rendering** — Content is delivered via Nuxt server API routes for SEO-friendly pages.
- **Runtime Config** — API URLs and keys are securely managed with Nuxt runtime config.

---

## 📂 Project Structure

**- apps/nuxt-frontend/**
```├── app/
│ └── app.vue # Root Nuxt app
├── pages/
│ └── [slug].vue # Dynamic route for CMS-driven pages
├── public/ # Static assets
├── server/
│ └── api/
│ ├── menu.get.ts # Fetch menus from Webiny
│ └── page.get.ts # Fetch page content (Page Builder)
├── nuxt.config.ts # Nuxt configuration


