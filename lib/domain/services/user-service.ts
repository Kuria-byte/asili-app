import type { User } from "../models/user"
import type { UserRepository } from "../repositories/user-repository"

export class UserService {
  constructor(private repository: UserRepository) {}

  async getUserById(id: string): Promise<User | null> {
    return this.repository.getById(id)
  }

  async updateUserPreferences(id: string, preferences: Partial<User>): Promise<User> {
    return this.repository.updatePreferences(id, preferences)
  }

  async getUserProgress(id: string): Promise<any> {
    return this.repository.getProgress(id)
  }
}

