// server/api/menu.get.ts
export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

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
  `

    try {
        const res = await $fetch('https://d3p9g2q7rev0gk.cloudfront.net/cms/read/en-GB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.public.webinyCmsApiKey}`
            },
            body: JSON.stringify({ query })
        })

        if (!res) {
            console.error('Invalid CMS response', res)
            throw createError({ statusCode: 500, statusMessage: 'Invalid CMS response' })
        }

        return res
    } catch (err) {
        console.error('CMS fetch failed', err)
        throw createError({ statusCode: 500, statusMessage: 'CMS fetch failed' })
    }
})
