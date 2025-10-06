export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = `
    query {
         pageBuilder {
            getSettings {
                data {
                    name
                    websiteUrl
                    websitePreviewUrl
                    logo {
                      id
                      src
                    }
                    favicon {
                      id
                      src
                    }
                    htmlTags {
                      header
                      footer
                    }
                    pages {
                      home
                      notFound
                    }
                    social {
                      facebook
                      twitter
                    }
                    # Custom fields you added
                    primaryfont
                    secondaryfont
                    primarycolour
                    secondarycolour
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
            body: { query, variables: {} }
        })
        return res?.data?.pageBuilder?.getSettings?.data || [];
    } catch (err) {
        console.error('CMS fetch failed', err)
        throw createError({ statusCode: 500, statusMessage: 'CMS fetch failed' })
    }
})
