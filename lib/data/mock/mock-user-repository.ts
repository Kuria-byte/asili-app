import type { User } from "@/lib/domain/models/user"
import type { UserRepository } from "@/lib/domain/repositories/user-repository"

const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    fullName: "Demo User",
    preferredLanguage: "en",
    role: "student",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

const mockProgress = {
  userId: "1",
  languages: [
    {
      languageId: "1", // Kikuyu
      progress: 0.3, // 30% complete
      xpEarned: 450,
      streak: 5, // days
      lastActivity: new Date("2023-04-15"),
    },
    {
      languageId: "3", // Swahili
      progress: 0.6, // 60% complete
      xpEarned: 1200,
      streak: 12, // days
      lastActivity: new Date("2023-04-16"),
    },
  ],
}

export class MockUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    return mockUsers.find((user) => user.id === id) || null
  }

  async updatePreferences(id: string, preferences: Partial<User>): Promise<User> {
    const userIndex = mockUsers.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...preferences,
      updatedAt: new Date(),
    }

    mockUsers[userIndex] = updatedUser
    return updatedUser
  }

  async getProgress(id: string): Promise<any> {
    if (mockProgress.userId === id) {
      return mockProgress
    }
    return {
      userId: id,
      languages: [],
    }
  }
}

