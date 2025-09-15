import { d as defineEventHandler, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _slug_ = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const slugParam = (_b = (_a = event == null ? void 0 : event.context) == null ? void 0 : _a.params) == null ? void 0 : _b.slug;
  const path = Array.isArray(slugParam) ? slugParam.map((s) => decodeURIComponent(s).toLowerCase()).join("/") : slugParam ? decodeURIComponent(slugParam).toLowerCase() : "";
  console.log(path);
  const flatMenu = await $fetch("http://localhost:3000/api/menu");
  if (!Object.keys(flatMenu).length) {
    throw createError({ statusCode: 404, statusMessage: "Menu not found" });
  }
  const pathToPageId = {};
  Object.values(flatMenu).forEach((item) => {
    const normalizedSlug = item.slug.toLowerCase();
    pathToPageId[normalizedSlug] = item.pageId;
  });
  console.log(pathToPageId);
  const pageId = pathToPageId[path];
  console.log(pageId);
  if (!pageId) {
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }
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
    const res = await $fetch(config.webinyMainApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.webinyMainApiKey}`
      },
      body: { query, variables: { id: pageId } }
    });
    return res.data.pageBuilder.getPage.data;
  } catch (err) {
    console.error("CMS fetch failed", err);
    throw createError({ statusCode: 500, statusMessage: "CMS fetch failed" });
  }
});

export { _slug_ as default };
//# sourceMappingURL=_slug_.mjs.map
