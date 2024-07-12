const server = require('./src/server')
const createTables = require('./src/setup')

createTables()
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})