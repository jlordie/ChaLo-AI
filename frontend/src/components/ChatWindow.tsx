'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import { FiSend, FiMic, FiStopCircle } from 'react-icons/fi'
import { chatService } from '@/services/chat.service'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function ChatWindow({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
        setInput((prev) => prev + transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    const messageId = Date.now().toString()

    setMessages((prev) => [
      ...prev,
      { id: messageId, role: 'user', content: userMessage, timestamp: new Date() },
    ])

    setLoading(true)
    try {
      const response = await chatService.sendMessage(userId, userMessage)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ])
    } catch (error: any) {
      console.error('Failed to send message', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-dark-900">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-300">Start a Conversation</h2>
              <p className="text-gray-500 max-w-md">
                Ask me anything. I can help with coding, writing, analysis, creativity, and much more.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-dark-800 text-gray-200 border border-gray-700 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-primary-200' : 'text-gray-500'}`}>
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-gray-700 px-4 py-3 rounded-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-6 bg-dark-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="flex-1 bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition disabled:opacity-50"
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={loading}
          />
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`p-3 rounded-lg transition ${
              isListening
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } disabled:opacity-50`}
            aria-label="Voice input"
          >
            {isListening ? <FiStopCircle size={20} /> : <FiMic size={20} />}
          </button>
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
