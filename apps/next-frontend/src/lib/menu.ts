import { flattenMenu, MenuItem, MenuMap } from "@/lib/flattenMenu";

export async function fetchMenu(): Promise<MenuMap> {
    const query = `
    query {
      pageBuilder {
        getMenu(slug: "main-menu") {
          data {
            items
          }
        }
      }
    }
  `;

    const res = await fetch(process.env.WEBINY_MAIN_API!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WEBINY_MAIN_API_KEY}`,
        },
        body: JSON.stringify({ query }),
    });

    const json = await res.json();
    const items: MenuItem[] = json?.data?.pageBuilder?.getMenu?.data?.items || [];
    const flatMenu: MenuMap = flattenMenu(items);

    // Optional: normalize slugs to remove trailing slashes
    Object.values(flatMenu).forEach(entry => {
        if (entry.slug !== "/" && entry.slug.endsWith("/")) {
            entry.slug = entry.slug.slice(0, -1);
        }
    });

    return flatMenu;
}
