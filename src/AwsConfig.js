const path = require('path')
const promisify = require('util.promisify')
const cp = require('child_process')
const fs = require('fs')
const exec = promisify(cp.exec)
const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)

import ps from './ps'

const userRoot = __dirname.split('/').slice(0,3).join('/')

const dir = path.join(userRoot, '.aws')

const dirExists = () => {
  return new Promise((resolve, reject) => {
    console.log(dir)
    cp.exec(`[ -d "${dir}" ] && echo true`, (error, stdout, stderr) => {
      console.log(typeof stdout)
      if(stdout.trim() === "true") {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

const fileExists = (filename) => read(filename, 'utf-8')

const saveCredentials = (credentials) => {
  const lines = Object.keys(credentials).map(key => 
    `${key} = ${credentials[key]}`
  )
  
  lines.unshift('[default]')
  
  const pathToCredentials = path.join(userRoot, '.aws/credentials')
  
  return write(pathToCredentials, lines.join('\n'))
}

async function AwsConfig (credentials = null) {

  try {
    await read(path.join(dir, 'credentials'))
    const auth = await ps().auth()
    
  } catch(err) {
    
    if(!credentials) {
      return []
    }

    console.log('err', err)
    let exists = await dirExists()

    if(!exists) {
      await exec(`mkdir ${dir}`)
    }

    
    await saveCredentials(credentials)
  }

  try {
    const data = await ps().list()

    return [
      ...data.Parameters.map(p => ({
          key: p.Name, 
          id: Math.random().toString(36).substr(2, 9)
        })
      )
    ]
    
  } catch(err) {
    return []
  }
}

export default AwsConfig