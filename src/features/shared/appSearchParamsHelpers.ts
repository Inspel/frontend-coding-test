import { useSearchParams } from 'react-router-dom'

export const getAppSearchParams = (params: URLSearchParams) => {
  return {
    owner: params.get('owner'),
    repo: params.get('repo'),
    commit: params.get('commit')
  }
}
export const useAppSearchParams = () => {
  const [searchParams] = useSearchParams()

  return { ...getAppSearchParams(searchParams), searchParams }
}
