import io from 'socket.io-client'

function getScoreQueryStr () {
  let d = {
      token: '',
      listIds: '2349570'
  }
  return JSON.stringify(d)
}

function getMatchQueryStr() {
  let d = {
      token: '',
      listId: '2349570'
  }
  return JSON.stringify(d)
}


const socket = io('wss://scorebot-secure.hltv.org', {
  path: '',
  // query: {
  //   'sid': '93cfd04a-eaaa-441f-809a-216e2531ef01'
  // },
  reconnectionDelay: 5000,
  reconnectionDelayMax: 10000,
  transports: ['websocket']
})

// const socket = io('wss://scorebot-lb.hltv.org/socket.io', {
//   path: '/',
//   query: {
//     'sid': 'df4bd11a-0380-4cb4-bffd-a9107c52e349',
//     'transport': 'websocket',
//     'EIO': 3
//   },
//   reconnectionDelay: 5000,
//   reconnectionDelayMax: 10000,
//   transports: ['websocket']
// })
// console.log(getScoreQueryStr(), getMatchQueryStr())
socket.on('connect', () => {
  console.log('connect success')
  console.log(getScoreQueryStr(),123123123)
  // socket.emit('readyForScores', getScoreQueryStr())
  // socket.emit('readyForMatch', getMatchQueryStr())
})

socket.emit('readyForScores',  getScoreQueryStr())
socket.emit('readyForMatch',  getMatchQueryStr())

socket.on('connect_error', (err) => {
  console.log('connect error', err)
})

socket.on('score', (scoreStr) => {
  console.log('score', scoreStr)
})

socket.on('fullLog', (fullLogStr) => {
  console.log('fullLog', fullLogStr)
})

socket.on('log', (fullLogStr) => {
  console.log('log', fullLogStr)
})

socket.on('scoreboard', (jsonStr) => {
  console.log('scoreboard', jsonStr)
})

// const socket = io('wss://saas-socket.joidata.com', {
//   path: '/realtime',
//   query: {
//     'event': `dota_games_ing`,
//     'api_key': 'iVGCbbK7TOHplVP3SRbN8274noTzCiTn'
//   },
//   transports: ['websocket'],
//   reconnectionDelay: 5000,
//   reconnectionDelayMax: 10000,
// })

// socket.on('connect', () => {
//   console.log('connect success')
// })

// socket.on('connect_error', (err) => {
//   console.log('connect error', err)
// })

// socket.on('data', data => {
//   const newData = JSON.parse(data)
//   console.log('data',newData)
// })

export const hlv = {
  "code": 0,
  "message": "",
  "data": [],
  "statusCode": 200
}

export default{hlv}