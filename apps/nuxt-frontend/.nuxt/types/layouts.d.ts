import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "footer-layout-one" | "header-layout-one"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}