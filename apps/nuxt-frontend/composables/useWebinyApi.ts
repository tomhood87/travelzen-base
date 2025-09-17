import { GraphQLClient } from 'graphql-request'

export const useWebinyApi = () => {
    const config = useRuntimeConfig()

    const client = new GraphQLClient("https://d3p9g2q7rev0gk.cloudfront.net/cms/read/en-GB", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.public.webinyCmsApiKey}`
        }
    })

    const getPage = async (path: any) => {
        const query = `
      query GetPageByPath($path: String!) {
        pageBuilder {
          getPage(path: $path) {
            data {
              id
              title
              path
              content
              settings {
                general {
                  layout
                }
                seo {
                  title
                  description
                  meta {
                    name
                    content
                  }
                }
              }
              createdOn
              savedOn
              status
            }
            error {
              code
              message
              data
            }
          }
        }
      }
    `

        try {
            const response = await client.request(query, { path })
            return response.pageBuilder.getPage
        } catch (error) {
            console.error("Error fetching page:", error)
            throw error
        }
    }

    const listPages = async (limit = 100) => {
        const query = `
      query ListPages($limit: Int) {
        pageBuilder {
          listPages(limit: $limit) {
            data {
              id
              title
              path
              status
              createdOn
              savedOn
            }
            meta {
              cursor
              hasMoreItems
              totalCount
            }
            error {
              code
              message
              data
            }
          }
        }
      }
    `

        try {
            const response = await client.request(query, { limit })
            return response.pageBuilder.listPages
        } catch (error) {
            console.error("Error listing pages:", error)
            throw error
        }
    }

    return {
        getPage,
        listPages,
        client
    }
}
