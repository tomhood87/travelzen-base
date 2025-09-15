// src/app/page.tsx
import Link from "next/link";
import { fetchMenu } from "@/lib/menu"; // your existing fetchMenu function

export const revalidate = 60; // ISR

export default async function HomePage() {
    // Fetch menu from your helper (not the API route, since we're server-side)
    const flatMenu = await fetchMenu();

    // Convert MenuMap to array for easier iteration
    const menuItems = Object.values(flatMenu);

    return (
        <header id="header-layout-one" className="mz-header p-4 bg-gray-50">
            <nav>
                <ul className="flex gap-4">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <Link href={item.slug}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <pre>{JSON.stringify(menuItems, null, 2)}</pre> {/* Optional: debug print */}
        </header>
    );
}
