export interface User {
  id: string
  email: string
  phoneNumber?: string
  fullName: string
  preferredLanguage: string
  dateOfBirth?: Date
  region?: string
  role: "student" | "teacher" | "admin" | "contributor"
  createdAt: Date
  updatedAt: Date
}

