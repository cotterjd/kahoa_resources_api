#!/bin/node

const fetch = require(`isomorphic-fetch`)
const assert = require(`assert`)
const printRed = str => console.log(`\x1b[31m %s \x1b[37m`, str)
const printGreen = str => console.log(`\x1b[32m %s \x1b[37m`, str)
const fail = errorStr => Promise.reject(errorStr)
const testServer = () => {
  return new Promise((resolve, reject) => {
     console.log(`Testing Server...`)
     fetch(`http://localhost:4000/graphql`, {
       method: `POST`,
       headers: {
         'Content-Type': `application/json`,
       },
       body: JSON.stringify({ query: `query { __typename }` }),
     }).then(r => r.json()).then(resolve).catch(reject) 
  })
}
const testCreateDev = () => {
  console.log(`Testing POST /devs`)
  return new Promise((resolve, reject) => {
     fetch(`http://localhost:4000/devs`, {
       method: `POST`,
       headers: {
         'Content-Type': `application/json`,
       },
       body: JSON.stringify({
         name: "John",
         email: "john7@gmail.com",
         skills: { cSharp: 9 },
       }),
     }).then(r => r.json()).then(resolve).catch(reject) 
  })
}
const testListDevs = () => {
  console.log(`Testing GET /devs`)
  return new Promise((resolve, reject) => {
     fetch(`http://localhost:4000/devs`, {
       method: `GET`,
       headers: {
         'Content-Type': `application/json`,
       },
     }).then(r => r.json()).then(resolve).catch(reject) 
  })
}
const testPut = (id) => {
  return new Promise((resolve, reject) => {
     fetch(`http://localhost:4000/devs/${id}`, {
       method: `PUT`,
       headers: {
         'Content-Type': `application/json`,
       },
       body: JSON.stringify({
         skills: JSON.stringify({
           python: 3
         })
       }),
     }).then(r => r.json()).then(resolve).catch(reject) 
  })
}
const testBadPut = (id) => {
  console.log(`Testing PUT /devs`)
  return testPut(`foo`) 
}
const testPutDev = (id) => {
  console.log(`Testing PUT /devs`)
  return testPut(id) 
}
const testDeleteDev = (id) => {
  console.log(`Testing DELETE /devs`)
  return new Promise((resolve, reject) => {
     fetch(`http://localhost:4000/devs/${id}`, {
       method: `DELETE`,
     }).then(r => r.json()).then(resolve).catch(reject) 
  })
}


let devId = 13 
function runTests () {
  testServer()
    .then(res => {
        assert.ok(res)
        assert.ok(res.data)
        assert.equal(res.data.__typename, `Query`, `data should have typename of 'Query', but got ${res.data.__typename}`)
        printGreen(`passed`)
     })
     .then(testCreateDev)
     .then(dev => {
         // console.log(dev)
         devId = dev.id
         assert.ok(dev)
         assert.ok(dev.id, `returned dev should have id`)
         assert.ok(dev.email)
         assert.ok(dev.name)
         assert.ok(dev.createdAt)
         assert.ok(dev.updatedAt)
         printGreen(`passed`)
     })
     .then(testListDevs)
     .then(devs => {
         // console.log(devs)
         assert.ok(devs)
         assert.ok(devs instanceof Array)
         assert.ok(devs.length > 1)
         printGreen(`passed`)
     })
     .then(_ => testBadPut(devId))
     .then(res => {
       // console.log(res)
       assert.ok(!res.id)
       assert.ok(res.error)
       assert.equal(res.error, `Invalid id of "foo"`)
       printGreen(`passed`)
     })
     .then(_ => testPutDev(devId))
     .then(updatedDev => {
       // console.log(updatedDev)
       assert.ok(updatedDev.id)
       assert.ok(updatedDev.skills)
       const skills = JSON.parse(updatedDev.skills)
       assert.equal(skills.python, 3)
       printGreen(`passed`)
     })
     .then(_ => testDeleteDev(devId))
     .then(res => {
         assert.ok(res)
         assert.ok(res.id)
         printGreen(`passed`)
     })
     .catch(printRed)
     .finally(_ => {
       console.log(`Tear down`)
       testDeleteDev(devId)
     })
}

runTests()
