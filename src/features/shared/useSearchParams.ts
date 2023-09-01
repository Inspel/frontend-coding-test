export const useSearchParams = () => {
  const params = new URLSearchParams(location.search)
  const owner = params.get('owner')
  const repo = params.get('repo')
  const commit = params.get('commit')

  return { owner, repo, commit, params }
}
