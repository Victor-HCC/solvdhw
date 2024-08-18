import bcrypt from 'bcryptjs'
import UserRepositoryImpl from '../repositories/UserRepositoryImpl'
import { User, UserInput } from '../types/types'

class UserService {
  private userRepository: UserRepositoryImpl

  constructor() {
    this.userRepository = new UserRepositoryImpl()
  }

  async createUser(username: string, password: string): Promise<User> {
    const user: UserInput = {
      username,
      password
    }

    return await this.userRepository.create(user)
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username)
  }

  async isPasswordCorrect(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username)

    if(!user) return false

    return await bcrypt.compare(password, user.password)
  }

  async softDeleteUser(id: number): Promise<boolean> {
    return await this.userRepository.softDeleteById(id)
  }

}

export default UserService