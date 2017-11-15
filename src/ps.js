const AWS = require('aws-sdk')
const ssm = new AWS.SSM({
  region: 'us-east-1'
})

const base64 = require('base-64')
const utf8 = require('utf8')

const encode = str => base64.encode(utf8.encode(str))
const decode = str => base64.decode(utf8.decode(str))

function ps(params) {
  const scope = {
    ...params
  }
  
  scope.get = () => {
    let name = scope.key
    return new Promise((resolve, reject) => {
      ssm.getParameters({
        Names: [name],
        WithDecryption: true,
      }, (err, data) => {
        if(err) console.log(err)
        resolve(data)
      })
    })
  }

  scope.put = () => {
    let name = scope.key
    console.log(name)
    ssm.putParameter({
      Name: name,
      Type: 'SecureString',
      Value: scope.value
    }, (err, data) => {
      if(err) console.log(err)
    })
  }

  scope.destroy = () => {
    let name = scope.key
    ssm.deleteParameter({
      Name: name
    }, (err, data) => {
      if(err) console.log(err)
    })
  }

  scope.path = () => {
    return new Promise((resolve, reject) => {
      let params = {
        Path: '/'
      }
      ssm.getParametersByPath(params, (err, data) => {
        if (err) console.log(err, err.stack)
        else resolve(data)
      });
    })
  }

  scope.list = () => {
    return new Promise((resolve, reject) => {
      ssm.describeParameters({MaxResults: 50}, (err, data) => {
        if(err) console.log(err)
        resolve(data)
      })
    })
  }

  return scope;
}

export default ps