export type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Skills {
  id: number
  createdAt: Date
  updatedAt: Date
  devId: Rating
  spring: Rating
  hibernate: Rating
  maven: Rating
  flyway: Rating
  graphQL: Rating
  mySQL: Rating
  pl_sql: Rating
  postgres: Rating
  jMeter: Rating
  python: Rating
  javaScript: Rating
  cSharp: Rating
  php: Rating
  angular: Rating
  react: Rating
  vue: Rating
  mongoDB: Rating
  aws: Rating
  azure: Rating
  bash: Rating
  linux: Rating
  css: Rating
  typeScript: Rating
  jQuery: Rating
  flutter: Rating
  swift: Rating
  objectiveC: Rating
  androidNative: Rating
  Kotlin: Rating
  Go: Rating
  Erlang: Rating
  reactNative: Rating
  dynamoDB: Rating
  node: Rating
  java: Rating
  sqlServer: Rating
  otherLanguages: string
}
export interface SkillsCreateInlineInput {
  create: Skills
}
