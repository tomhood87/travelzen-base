import { flattenMenu } from "~/utils/routerProcessing";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const slug = 'main-menu'

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
  `

    try {
        const res: any = await $fetch(config.webinyMainApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.webinyMainApiKey}`
            },
            body: { query, variables: { slug } }
        })
        const data = res?.data?.pageBuilder?.getMenu?.data?.items || []
        return flattenMenu(data)
    } catch (err) {
        console.error('CMS fetch failed', err)
        throw createError({ statusCode: 500, statusMessage: 'CMS fetch failed' })
    }
})
