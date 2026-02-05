// src/lib/wordpress.ts

const WP_API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
	const headers = { 'Content-Type': 'application/json' }

	if (!WP_API_URL) {
		throw new Error('WORDPRESS_API_URL is not defined in .env file')
	}

	const res = await fetch(WP_API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
		next: { revalidate: 60 },
	})

	const json = await res.json()

	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}

	return json.data
}

export async function getAllPosts() {
	const data = await fetchAPI(
		`
    query AllPosts {
      posts(first: 20) {
        edges {
          node {
            id
            title
            slug
            date
          }
        }
      }
    }
    `,
	)
	return data?.posts?.edges
}
