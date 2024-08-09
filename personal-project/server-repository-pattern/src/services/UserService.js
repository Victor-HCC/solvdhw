const bcrypt = require('bcryptjs')
const UserRepositoryImpl = require('../repositories/UserRepositoryImpl')

class UserService {
  constructor() {
    this.userRepository = new UserRepositoryImpl()
  }

  async createUser(username, password) {
    const user = {
      username,
      password
    }

    return await this.userRepository.create(user)
  }

  async findUserById(id) {
    return await this.userRepository.findById(id)
  }

  async findUserByUsername(username) {
    return await this.userRepository.findByUsername(username)
  }

  async isPasswordCorrect(username, password) {
    const user = await this.userRepository.findByUsername(username)

    if(!user) return false

    return await bcrypt.compare(password, user.password)
  }

  async softDeleteUser(id) {
    return await this.userRepository.softDeleteById(id)
  }
}

module.exports = UserService