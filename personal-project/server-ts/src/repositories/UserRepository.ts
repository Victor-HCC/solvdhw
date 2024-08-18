import { User, UserInput } from "../types/types";

abstract class UserRepository {
  abstract create(user: UserInput): Promise<User>
  abstract findById(id: number): Promise<User | null>
  abstract findByUsername(username: string): Promise<User | null>
  abstract softDeleteById(id: number): Promise<boolean>
}

export default UserRepository