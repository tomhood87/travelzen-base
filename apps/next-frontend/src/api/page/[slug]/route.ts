import { NextRequest, NextResponse } from "next/server";
import { fetchMenu } from "@/lib/menu";

export async function GET(req: NextRequest) {
    // Extract slug from URL
    const url = new URL(req.url);
    let slug = url.pathname.split("/").pop()?.toLowerCase() || "";

    // Fetch flattened menu
    const flatMenu = await fetchMenu(); // MenuMap: slug -> pageId

    if (!Object.keys(flatMenu).length) {
        return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    // Normalize: remove trailing slashes
    if (slug.endsWith("/")) slug = slug.slice(0, -1);

    const pageId = Object.values(flatMenu).find((entry) => entry.slug === `/${slug}`)?.pageId;

    if (!pageId) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Fetch the page from Webiny
    const query = `
    query GetPage($id: ID!) {
      pageBuilder {
        getPage(id: $id) {
          data {
            id
            title
            content
          }
        }
      }
    }
  `;

    try {
        const res = await fetch(process.env.WEBINY_MAIN_API!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.WEBINY_MAIN_API_KEY}`,
            },
            body: JSON.stringify({ query, variables: { id: pageId } }),
        });

        const json = await res.json();
        const page = json?.data?.pageBuilder?.getPage?.data;

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (err) {
        console.error("CMS fetch failed", err);
        return NextResponse.json({ error: "CMS fetch failed" }, { status: 500 });
    }
}
