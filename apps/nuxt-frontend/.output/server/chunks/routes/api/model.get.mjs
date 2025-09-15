import { d as defineEventHandler, u as useRuntimeConfig, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const model_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const query = `
    query {
      listMenus {
        data {
          title
          alias
          menuItems {
            label
            slug
          }
        }
      }
    }
  `;
  try {
    const res = await $fetch("https://d3p9g2q7rev0gk.cloudfront.net/cms/read/en-GB", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.public.webinyCmsApiKey}`
      },
      body: JSON.stringify({ query })
    });
    if (!res || !res.data || !res.data.listMenus) {
      console.error("Invalid CMS response", res);
      throw createError({ statusCode: 500, statusMessage: "Invalid CMS response" });
    }
    return res;
  } catch (err) {
    console.error("CMS fetch failed", err);
    throw createError({ statusCode: 500, statusMessage: "CMS fetch failed" });
  }
});

export { model_get as default };
//# sourceMappingURL=model.get.mjs.map
