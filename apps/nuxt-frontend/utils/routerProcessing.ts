type MenuItem = {
    id: string
    title: string
    type: "page" | "folder"
    page?: string
    children?: MenuItem[]
    parentId?: string | null
}

type MenuMap = Record<
    string,
    {
        id: string
        slug: string
        title: string
        pageId?: string
    }
>

function toSlug(title: string): string {
    return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export function flattenMenu(
    items: MenuItem[],
    parentPath = "",
    isRoot = true
): MenuMap {
    const map: MenuMap = {}

    items.forEach((item, index) => {
        // Root-level first page → "/"
        if (isRoot && index === 0 && item.type === "page" && item.page) {
            map[item.id] = {
                id: item.id,
                slug: "/",
                title: item.title,
                pageId: item.page
            }
            return
        }

        if (item.type === "page" && item.page) {
            const slug = toSlug(item.title)
            const path = parentPath ? `${parentPath}/${slug}` : `/${slug}`
            map[item.id] = {
                id: item.id,
                slug: path,
                title: item.title,
                pageId: item.page
            }
        }

        if (item.type === "folder" && item.children && item.children.length > 0) {
            const folderSlug = toSlug(item.title.replace(/folder$/i, "").trim())
            const folderPath = parentPath ? `${parentPath}/${folderSlug}` : `/${folderSlug}`

            // Take the first child as the folder's main page
            const firstChild = item.children[0]
            if (firstChild?.page && firstChild.type === "page") {
                map[firstChild.id] = {
                    id: firstChild.id,
                    slug: folderPath, // use folder path
                    title: firstChild.title,
                    pageId: firstChild.page
                }
            }

            // Recurse for the rest of the children
            const remainingChildren = item.children.slice(1)
            if (remainingChildren.length > 0) {
                Object.assign(map, flattenMenu(remainingChildren, folderPath, false))
            }
        }
    })

    return map
}
