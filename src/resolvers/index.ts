import GQLDate from '../types/gqlDate'
import devs from '../controllers/dev' 

export default {
  DateTime: GQLDate,
  Query: {
    devs: devs.get,
    projects: () => [], 
  },
  Mutation: {
    createDev: devs.create,
  }
}

