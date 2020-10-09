const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3555
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

let i = 1

//
app.get('*', (req, res) => {
  console.log('GET body: ', req.body)
  console.log('GET query: ', req.query)
  console.log('GET params: ', req.params)
  console.log('GET cookies: ', req.cookies)
  console.log('GET headers', req.headers)
  console.log(i++)
  res.json({ status: 'ok' })
})

app.post('*', (req, res) => {
  console.log(i++)
  console.log('\nPOST body: ', req.body)
  console.log('POST query: ', req.query)
  console.log('POST params: ', req.params)
  console.log('POST cookies: ', req.cookies)
  console.log('POST headers', req.headers, '\n')
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})
