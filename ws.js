const axios = require('axios'),
      ws = require('ws'),
      uuidV4 = require('uuid/v4')
// const CLIENT_ID = 'ZjA1ODIwYjItNTllYS00N2RjLWJlZjMtM2IzNzk4ODMyMjcyfGZhMWQxOTIxLTQ0MGItNDQyNC04ZGEwLTM0YzEwYmQ5YTJhMQ==',
//dev loop issue
const CLIENT_ID = 'ODkxZjBiZjQtNmYwYi00NWEyLThiYjUtMDk5MTI3MDdhZjQ0fDg0YjdhYmM1LWYwYzgtNGM1Yy05MjQwLWFjZDI1NzE2YjgxNQ==',
      // const CLIENT_ID = 'MTUwY2YyN2UtYzFjZS00YzcyLTgwNmQtOGEyMDQ0ODk4NGY1fDYwZWM5MzY1LTNlZDMtNDg0YS05ZTYwLTBiM2YwOWE1NDMzOA==',
      // prod us mobile
      // const CLIENT_ID = 'NWFhM2Y3NjItZDU1MC00NDZiLTkzMmItYzA1ZmJlYWU1NDM3fDY5NmU3ZmM0LWNmMzQtNDJiZC1hNDFlLTMzOTAxMDFjY2ExMQ==',
      // const CLIENT_ID = 'ODQ3NTBhZWQtMTI0NC00N2YwLWIxMTctYjQ4NGNhZGU2ZmMwfDhkMzI4NGFkLWM4YWQtNDdkNC1hN2FkLWJlNjdlNjkwOWViYg==',
      //   SDK_BASE_URL = 'http://127.0.0.1:6006',
      SDK_BASE_URL = 'https://app-dev.flow.ai/channel-socket-sdk',
      //   SDK_BASE_URL = 'https://sdk.flow.ai',
      THREAD_ID = 'pretty_unique_threadId123aaaaaaab',
      SESSION_ID = 'dd15dd'
const api = axios.create({
  baseURL: SDK_BASE_URL
})
const test = async () => {
  const socketInfo = await api.request({
    method: 'get',
    url: '/socket.info',
    params: {
      sessionId: SESSION_ID,
      clientId: CLIENT_ID
    }
  })
  const wsEndpoint = socketInfo.data.payload.endpoint
  const socketClient = new ws(wsEndpoint)
  socketClient.on('open', () => {
    console.log('Socket connection is opened')
    socketClient.send(JSON.stringify({
      type: 'message.send',
      payload: {
        threadId: THREAD_ID,
        speech: 'hi',
        originator: {
          role: 'external',
          name: 'slava',
          profile: {
            fullName: 'slava batig',
            firstName: 'slava',
            lastName: 'batig',
            ip: '126.44.55.20'
          }
        }
        // attachment: {
        //   type: 'event',
        //   payload: {
        //     name: 'Chat initiation',
        //     eventType: 'OPENING'
        //   }
        // }
      }
    }))
  })
  socketClient.on('message', message => {
    console.log(JSON.stringify(JSON.parse(message), null, 2))
  })
  socketClient.on('error', err => {
    console.error('Socket client catch an error, ', err)
  })
}
test()
  .catch(console.error)
