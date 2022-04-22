import { PrismaClient } from ".prisma/client";
import { dissoc } from 'ramda'
import * as T from '../types'

const prisma = new PrismaClient()

function get () {
  return prisma.dev.findMany({
    include: {
      skills: true,
      projects: true,
    }
  })  
}

function create (dev: T.Dev) {
  return prisma.dev.create({
    data: {
      ...dissoc(`skills`, dev),
      skills: {
        create: dev?.skills,
      }
    }
  })
}

async function del (id: number) {
  const devToDelete = await prisma.dev.findUnique({ where: { id }, select: { skills: true }})
  if (!devToDelete) return Promise.reject(`dev not found`)
  // console.log(`MYDEV`, devToDelete)

  await prisma.skill.delete({ where: { id: devToDelete.skills.id }})
  return prisma.dev.delete({ where: { id }})
}

export default {
  get,
  create,
  del,
}
