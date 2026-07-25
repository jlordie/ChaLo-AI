'use client'

import Link from 'next/link'
import { FiArrowRight, FiMessageSquare, FiCode, FiImage, FiBarChart3, FiZap, FiBook } from 'react-icons/fi'

const features = [
  {
    icon: FiMessageSquare,
    title: 'AI Chat Assistant',
    description: 'Natural conversations with advanced AI models',
  },
  {
    icon: FiCode,
    title: 'Code Generation',
    description: 'Generate code, APIs, databases, and documentation',
  },
  {
    icon: FiImage,
    title: 'Creative Suite',
    description: 'Image, video, music, and content generation',
  },
  {
    icon: FiBarChart3,
    title: 'Business Analytics',
    description: 'Analytics dashboard and business intelligence',
  },
  {
    icon: FiZap,
    title: 'Automation',
    description: 'Workflow automation and AI agents',
  },
  {
    icon: FiBook,
    title: 'Education',
    description: 'AI tutor, homework help, and learning plans',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900/10 to-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800/50 backdrop-blur border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition">
            ChaLo AI
          </Link>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="text-gray-300 hover:text-white transition px-4 py-2 rounded-lg hover:bg-gray-800/50"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              One Intelligence.
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
                Infinite Possibilities.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The next-generation AI platform for intelligent assistance, automation, creativity, and
              business solutions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/auth/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition group"
            >
              Get Started Free
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="#features"
              className="border border-primary-400 text-primary-400 hover:bg-primary-400/10 px-8 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to leverage the power of AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-dark-800/50 border border-gray-700 rounded-lg p-8 hover:border-primary-500 hover:bg-dark-800/80 transition-all duration-300 group"
            >
              <feature.icon className="text-primary-400 text-4xl mb-4 group-hover:text-primary-300 transition" />
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 my-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your work?</h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of users leveraging AI to solve complex problems and accelerate their goals
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold inline-block transition"
          >
            Start Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>
            &copy; 2024 ChaLo AI. All rights reserved. Founder: Jhon Lord Visto
          </p>
        </div>
      </footer>
    </div>
  )
}
