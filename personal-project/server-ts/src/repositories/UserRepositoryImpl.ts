import pool from "../db";
import { UserInput, User } from "../types/types";
import UserRepository from "./UserRepository";
import bcrypt from 'bcryptjs'

class UserRepositoryImpl extends UserRepository {
  async create(user: UserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10)

    const result = await pool.query(
      `INSERT INTO users (username, password)
      VALUES ($1, $2) RETURNING *`, 
      [user.username, hashPassword]
    )

    return result.rows[0]
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])

    if(result.rows.length === 0) return null

    return result.rows[0]
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1 AND active = true`, [username]
    )

    if(result.rows.length === 0) return null

    return result.rows[0]
  }

  async softDeleteById(id: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE users SET active = false WHERE id = $1`, [id]
    )

    if(result.rowCount === 0) {
      return false
    }

    return true
  }

}

export default UserRepositoryImpl