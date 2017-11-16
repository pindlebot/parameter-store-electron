const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')

//const userRoot = __dirname.split('/').slice(0,3).join('/')

//fs.readFile(path.join(userRoot, '.aws/config'), 'utf-8', (err, data) => console.log(data))

export default () => {
  AWS.config.getCredentials((err) => {
    if (err) {
      console.log(err.stack); 
    }
    else console.log("Access Key:", AWS.config.credentials.accessKeyId);
  })
}