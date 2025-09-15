import { d as defineEventHandler, u as useRuntimeConfig, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

function toSlug(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function flattenMenu(items, parentPath = "", isRoot = true) {
  const map = {};
  items.forEach((item, index) => {
    if (isRoot && index === 0 && item.type === "page" && item.page) {
      map[item.id] = {
        id: item.id,
        slug: "/",
        title: item.title,
        pageId: item.page
      };
      return;
    }
    if (item.type === "page" && item.page) {
      const slug = toSlug(item.title);
      const path = parentPath ? `${parentPath}/${slug}` : `/${slug}`;
      map[item.id] = {
        id: item.id,
        slug: path,
        title: item.title,
        pageId: item.page
      };
    }
    if (item.type === "folder" && item.children && item.children.length > 0) {
      const folderSlug = toSlug(item.title.replace(/folder$/i, "").trim());
      const folderPath = parentPath ? `${parentPath}/${folderSlug}` : `/${folderSlug}`;
      const firstChild = item.children[0];
      if ((firstChild == null ? void 0 : firstChild.page) && firstChild.type === "page") {
        map[firstChild.id] = {
          id: firstChild.id,
          slug: folderPath,
          // use folder path
          title: firstChild.title,
          pageId: firstChild.page
        };
      }
      const remainingChildren = item.children.slice(1);
      if (remainingChildren.length > 0) {
        Object.assign(map, flattenMenu(remainingChildren, folderPath, false));
      }
    }
  });
  return map;
}

const menu_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const config = useRuntimeConfig();
  const slug = "main-menu";
  const query = `
    query {
        pageBuilder {
            getMenu(slug: "main-menu") {
              data {
                createdOn
                id
                slug
                description
                items
              }
            }
        }
    }
  `;
  try {
    const res = await $fetch(config.webinyMainApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.webinyMainApiKey}`
      },
      body: { query, variables: { slug } }
    });
    const data = ((_d = (_c = (_b = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.pageBuilder) == null ? void 0 : _b.getMenu) == null ? void 0 : _c.data) == null ? void 0 : _d.items) || [];
    return flattenMenu(data);
  } catch (err) {
    console.error("CMS fetch failed", err);
    throw createError({ statusCode: 500, statusMessage: "CMS fetch failed" });
  }
});

export { menu_get as default };
//# sourceMappingURL=menu.get.mjs.map
