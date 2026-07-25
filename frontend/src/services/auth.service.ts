import apiClient from './api-client'

interface LoginResponse {
  user: { id: string; email: string; firstName: string; role: string }
  token: string
}

export const authService = {
  async login(email: string, password: string): Promise<void> {
    const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
      email,
      password,
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userId', response.data.user.id)
  },

  async register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<void> {
    const response = await apiClient.post<LoginResponse>('/api/v1/auth/register', data)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userId', response.data.user.id)
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  },

  async getCurrentUser() {
    const userId = localStorage.getItem('userId')
    if (!userId) throw new Error('No user ID')
    const response = await apiClient.get(`/api/v1/users/me`, {
      headers: { 'x-user-id': userId },
    })
    return response.data
  },

  async verifyToken(token: string) {
    const response = await apiClient.post('/api/v1/auth/verify', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },
}
