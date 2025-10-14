'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BarChart3, ExternalLink, Loader2, Search, TrendingUp } from 'lucide-react'
import { apiClient, type ShortUrl } from '@/lib/api'

export default function Analytics() {
  const [shortId, setShortId] = useState('')
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!shortId.trim()) {
      setError('Please enter a short ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await apiClient.getAnalytics(shortId)
      setShortUrl(response.shortUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setShortId('')
    setShortUrl(null)
    setError('')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getShortIdFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.pathname.substring(1) // Remove leading slash
    } catch {
      return url
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Analytics Dashboard
        </CardTitle>
        <CardDescription>
          View detailed analytics and visit statistics for your short URLs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Enter Short ID or Full Short URL
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="abc12345 or https://yoursite.com/abc12345"
                value={shortId}
                onChange={(e) => setShortId(e.target.value)}
                disabled={loading}
                className="text-base"
              />
              <Button type="submit" disabled={loading || !shortId.trim()}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {shortUrl && (
            <Button type="button" variant="outline" onClick={handleReset}>
              Clear Results
            </Button>
          )}
        </form>

        {shortUrl && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Visits</p>
                      <p className="text-2xl font-bold">{shortUrl.visitCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="text-lg font-semibold">
                        {new Date(shortUrl.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Short ID</p>
                      <p className="text-lg font-mono font-semibold">
                        {shortUrl.shortId}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* URL Details */}
            <Card>
              <CardHeader>
                <CardTitle>URL Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Original URL
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border mt-1">
                    <span className="text-sm truncate flex-1">
                      {shortUrl.redirectUrl}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(shortUrl.redirectUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Short URL
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded border mt-1">
                    <span className="text-sm font-mono truncate flex-1">
                      {typeof window !== 'undefined' ? window.location.origin : ''}/{shortUrl.shortId}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`/${shortUrl.shortId}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visit History */}
            {shortUrl.visitHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Visits</CardTitle>
                  <CardDescription>
                    Last {Math.min(10, shortUrl.visitHistory.length)} visits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {shortUrl.visitHistory
                      .slice(-10)
                      .reverse()
                      .map((visit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                        >
                          <span>Visit #{shortUrl.visitHistory.length - index}</span>
                          <span className="text-muted-foreground">
                            {formatDate(visit)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {shortUrl.visitHistory.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No visits yet. Share your short URL to start tracking analytics!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}