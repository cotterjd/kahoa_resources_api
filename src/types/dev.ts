import { SkillsCreateInlineInput, Skills } from './skill'

export interface CreateDev {
  name: string
  email: string
  skills: SkillsCreateInlineInput
}
export interface DevCreateInput {
  data: CreateDev
}

export interface Dev {
  name: string
  email: string
  skills: Skills
}
