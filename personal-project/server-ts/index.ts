import 'dotenv/config'
import server from './src/server'
import dbSetup from './src/setup'

dbSetup()
const PORT = process.env.PORT ||  3001

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
})