import apiClient from './api-client'

export const chatService = {
  async sendMessage(userId: string, message: string): Promise<string> {
    const response = await apiClient.post('/api/v1/chat', {
      userId,
      title: 'Chat',
      message,
      model: 'gpt-4',
    })
    return response.data.response || message
  },

  async getUserChats(userId: string) {
    const response = await apiClient.get(`/api/v1/chat/user/${userId}`)
    return response.data
  },

  async getChat(chatId: string) {
    const response = await apiClient.get(`/api/v1/chat/${chatId}`)
    return response.data
  },
}
