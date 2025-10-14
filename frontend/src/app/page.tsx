'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Link as LinkIcon, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import UrlShortener from '@/components/UrlShortener'
import Analytics from '@/components/Analytics'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'shorten' | 'analytics'>('shorten')

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Create short URLs instantly with our optimized service"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Tracking",
      description: "Monitor clicks and engagement with detailed analytics"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Reliable",
      description: "Built with security best practices and 99.9% uptime"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Access",
      description: "Access your short URLs from anywhere in the world"
    }
  ]

  const stats = [
    { label: "URLs Shortened", value: "10,000+" },
    { label: "Active Users", value: "5,000+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Response Time", value: "< 100ms" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">URL Mini</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#analytics" className="text-gray-600 hover:text-gray-900">Analytics</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Shorten URLs with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Style
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform long, unwieldy URLs into short, memorable links. 
            Track clicks, analyze performance, and share with confidence.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => setActiveTab('shorten')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={() => setActiveTab('analytics')}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-8">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === 'shorten' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('shorten')}
                className="px-6"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Shorten URL
              </Button>
              <Button
                variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('analytics')}
                className="px-6"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === 'shorten' && <UrlShortener />}
            {activeTab === 'analytics' && <Analytics />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose URL Mini?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to manage and track your URLs effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in seconds with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste Your URL</h3>
              <p className="text-gray-600">
                Enter any long URL you want to shorten
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Short Link</h3>
              <p className="text-gray-600">
                We generate a unique, short URL for you
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Track</h3>
              <p className="text-gray-600">
                Share your link and monitor analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust URL Mini for their link management needs
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => setActiveTab('shorten')}
          >
            Start Shortening URLs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LinkIcon className="h-6 w-6" />
            <span className="text-xl font-bold">URL Mini</span>
          </div>
          <p className="text-gray-400 mb-4">
            The simplest way to shorten URLs and track analytics
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}