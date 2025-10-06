export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const slug = 'main-menu'

    const query = `
    query {
        pageBuilder {
            getBlock(id: "68cbeb3e9d1c910002b24e95") {
              data {
                id
                name
                content
                settings
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

        return res?.data?.pageBuilder?.getMenu?.data?.items || []
    } catch (err) {
        console.error('CMS fetch failed', err)
        throw createError({ statusCode: 500, statusMessage: 'CMS fetch failed' })
    }
})
