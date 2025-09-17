export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const slugParam = event?.context?.params?.slug as string | string[]

    // Build normalized path
    const path = Array.isArray(slugParam)
        ? slugParam.map(s => decodeURIComponent(s).toLowerCase()).join('/')
        : (slugParam ? decodeURIComponent(slugParam).toLowerCase() : '')

    console.log(path)

    // Fetch flattened menu
    const flatMenu: Record<string, any> = await $fetch('http://localhost:3000/api/menu')

    if (!Object.keys(flatMenu).length) {
        throw createError({ statusCode: 404, statusMessage: 'Menu not found' })
    }

    // Map slug -> pageId (normalize slugs to lowercase)
    const pathToPageId: Record<string, string> = {}
    Object.values(flatMenu).forEach(item => {
        const normalizedSlug = item.slug.toLowerCase()
        pathToPageId[normalizedSlug] = item.pageId
    })

    console.log(pathToPageId)

    const pageId = pathToPageId[path]

    console.log(pageId)

    if (!pageId) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }

    // Fetch page content
    const query = `
    query GetPage($id: ID!) {
      pageBuilder {
        getPage(id: $id) {
          data {
            id
            title
            content
            settings {
              seo {
                title
                meta {
                  content
                }
              }
              general {
                layout
                tags
              }
            }
          }
        }
      }
    }
  `

    try {
        const res: any = await $fetch(config.webinyMainApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.webinyMainApiKey}`
            },
            body: { query, variables: { id: pageId } }
        })

        return res.data.pageBuilder.getPage.data
    } catch (err) {
        console.error('CMS fetch failed', err)
        throw createError({ statusCode: 500, statusMessage: 'CMS fetch failed' })
    }
})
