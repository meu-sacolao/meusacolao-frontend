import GraphQL from '@/util/GraphQL'

export default class UserSimulationApiService {

  static get() {
    const query = `
      {

        currentUser {
          simulations (
            order: [
              { column: "createdAt", direction: "DESC" }
            ]
          ) {
            key
            id
            title
            retirementDate  
            createdAt
            client {
              id
              name
            }
            user {
              id
              name
            }
            cnisFile {
              id
              pathUrl
            }
          }
        }
      }
    `

    return GraphQL({ query, caller: 'UserSimulationApiService.get' })
      .then(({ data }) => {
        return { simulations : data.currentUser.simulations }
      })
  }
}