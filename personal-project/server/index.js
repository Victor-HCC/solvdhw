const server = require('./src/server')
const dbSetup = require('./src/setup')

dbSetup()
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})