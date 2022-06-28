import Api from '@/util/Api'

export default async (payload) => {

  const { query, caller = '' } = payload
  let url = `/graphql/query`
  if(caller) url += `?caller=${caller}`

  const response = await Api.post(url, {
    query: query
  }, { ...payload })

  return response.data
}