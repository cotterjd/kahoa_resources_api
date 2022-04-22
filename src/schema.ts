import { gql } from 'apollo-server-express'

export default gql`

  scalar DateTime

  type Skill {
  id:             Int
  createdAt:      DateTime
  updatedAt:      DateTime
  dev:            Dev
  devId:          Int
  spring:         Int
  hibernate:      Int
  maven:          Int
  flyway:         Int
  graphQL:        Int
  mySQL:          Int
  pl_sql:         Int
  postgres:       Int
  jMeter:         Int
  python:         Int
  javaScript:     Int
  cSharp:         Int
  php:            Int
  angular:        Int
  react:          Int
  vue:            Int
  mongoDB:        Int
  aws:            Int
  azure:          Int
  bash:           Int
  linux:          Int
  css:            Int
  typeScript:     Int
  jQuery:         Int
  flutter:        Int
  swift:          Int
  objectiveC:     Int
  androidNative:  Int
  Kotlin:         Int
  Go:             Int
  Erlang:         Int
  reactNative:    Int
  dynamoDB:       Int
  node:           Int
  java:           Int
  sqlServer:      Int
  otherLanguages: String
}
input SkillInput {
  spring:         Int
  hibernate:      Int
  maven:          Int
  flyway:         Int
  graphQL:        Int
  mySQL:          Int
  pl_sql:         Int
  postgres:       Int
  jMeter:         Int
  python:         Int
  javaScript:     Int
  cSharp:         Int
  php:            Int
  angular:        Int
  react:          Int
  vue:            Int
  mongoDB:        Int
  aws:            Int
  azure:          Int
  bash:           Int
  linux:          Int
  css:            Int
  typeScript:     Int
  jQuery:         Int
  flutter:        Int
  swift:          Int
  objectiveC:     Int
  androidNative:  Int
  Kotlin:         Int
  Go:             Int
  Erlang:         Int
  reactNative:    Int
  dynamoDB:       Int
  node:           Int
  java:           Int
  sqlServer:      Int
  otherLanguages: String
}

input DevInput {
  email: String
  name: String
  skills: SkillInput
}

type Dev {
  id:        Int      
  createdAt: DateTime 
  updatedAt: DateTime 
  email:     String   
  name:      String
  projects:  Project 
  projectId: Int
  skills:    Skill
  skillsId:  Int
}

type Project {
  id:        Int       
  createdAt: DateTime  
  updatedAt: DateTime  
  name:      String
  endDate:   DateTime
  devs:      [Dev]
}

type Query {
  devs: [Dev]
  projects: [Project]
}
type Mutation {
  createDev (data: DevInput): Dev
}
`
