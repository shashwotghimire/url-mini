const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export interface ShortUrl {
  id: string
  shortId: string
  redirectUrl: string
  createdAt: string
  visitCount: number
  visitHistory: string[]
}

export interface CreateShortUrlResponse {
  shortUrl: ShortUrl
}

export interface AnalyticsResponse {
  shortUrl: ShortUrl
}

export interface ApiError {
  error: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async createShortUrl(url: string): Promise<CreateShortUrlResponse> {
    return this.request<CreateShortUrlResponse>('/url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
  }

  async getAnalytics(shortId: string): Promise<AnalyticsResponse> {
    return this.request<AnalyticsResponse>(`/url/analytics/${shortId}`)
  }

  async healthCheck(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/check')
  }
}

export const apiClient = new ApiClient(API_BASE_URL)