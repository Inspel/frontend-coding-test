import { useQuery } from 'react-query'
import { useLocation } from 'react-router'

export const ListPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const owner = params.get('owner')
  const repo = params.get('repo')

  const headers = new Headers({
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
  })

  const { data } = useQuery(
    `commits-${owner}-${repo}`,
    async () => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          headers,
          method: 'GET'
        }
      )
      return await response.json()
    },
    {
      enabled: !!owner && !!repo
    }
  )

  console.log(data)

  return (
    <div id="list">
      <h1>List</h1>
      <p>TODO</p>
    </div>
  )
}
