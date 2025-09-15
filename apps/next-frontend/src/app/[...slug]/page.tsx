import { notFound } from "next/navigation";
import { fetchMenu } from "@/lib/menu";
import RenderBlockComp from "@/components/RenderBlockComp";

export const revalidate = 60;

interface PageProps {
    params: { slug: string[] };
}

interface PageData {
    id: string;
    title: string;
    content: any; // JSON object from Webiny
}

export default async function Page({ params }: PageProps) {
    const slugPath = "/" + (params.slug?.join("/") || "");

    // Fetch menu
    const flatMenu = await fetchMenu();

    // Find page
    const pageEntry = Object.values(flatMenu).find((entry) => entry.slug === slugPath);
    if (!pageEntry?.pageId) notFound();

    // Fetch Webiny page JSON
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
    const res = await fetch(process.env.WEBINY_MAIN_API!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WEBINY_MAIN_API_KEY}`,
        },
        body: JSON.stringify({ query, variables: { id: pageEntry.pageId } }),
    });
    const json = await res.json();
    const page: PageData = json?.data?.pageBuilder?.getPage?.data;
    if (!page) notFound();

    // Ensure content is parsed JSON
    // blocks could be string or object
    const rawBlocks = typeof page.content === "string" ? JSON.parse(page.content) : page.content;

    console.log("Raw Webiny content:", JSON.stringify(page.content, null, 2));

    console.log("Page content type:", typeof page.content);
    console.log("Page content:", page.content);

    // Webiny sometimes wraps blocks in `elements` or `blocks`
    const blocks = Array.isArray(rawBlocks.elements)
        ? rawBlocks.elements
        : [];

    console.log("Blocks:", blocks);


    return (
        <main className="prose max-w-4xl mx-auto p-4">
            <RenderBlockComp blocks={blocks} />
        </main>
    );
}
