// import Prisma from '@prisma/client'
import { PrismaClient, Prisma } from ".prisma/client";
import { dissoc } from 'ramda'
import * as T from '../types'

const prisma = new PrismaClient()

function get () {
  return prisma.dev.findMany({
    include: {
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

async function update (id: number, dev) {
  const data: Prisma.DevUpdateWithoutProjectsInput = {
    skills: dev.skills,
  }
  const updateRes = await prisma.dev.update({
    where: { id: Number(id) },
    data,
  })
  if (updateRes.id) {
    return prisma.dev.findUnique({
      where: { id: updateRes.id },
    })
  }
}

async function del (id: number) {
  const devToDelete = await prisma.dev.findUnique({ where: { id }, select: { skills: true }})
  if (!devToDelete) return Promise.reject(`dev not found`)
  // console.log(`MYDEV`, devToDelete)

  return prisma.dev.delete({ where: { id }})
}

export default {
  get,
  create,
  del,
  update,
}
