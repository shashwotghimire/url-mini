'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, ExternalLink, Link as LinkIcon, Loader2 } from 'lucide-react'
import { apiClient, type ShortUrl } from '@/lib/api'
import { isValidUrl, copyToClipboard } from '@/lib/utils'

export default function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await apiClient.createShortUrl(url)
      setShortUrl(response.shortUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create short URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) return

    try {
      const fullShortUrl = `${window.location.origin}/${shortUrl.shortId}`
      await copyToClipboard(fullShortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  const handleReset = () => {
    setUrl('')
    setShortUrl(null)
    setError('')
    setCopied(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6" />
          URL Shortener
        </CardTitle>
        <CardDescription>
          Transform long URLs into short, shareable links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Enter your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="text-base"
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading || !url.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                'Shorten URL'
              )}
            </Button>
            
            {shortUrl && (
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        </form>

        {shortUrl && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Short URL
              </label>
              <div className="flex gap-2">
                <Input
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/${shortUrl.shortId}`}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  {copied ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600">Copied to clipboard!</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Original URL
              </label>
              <div className="flex items-center gap-2 p-2 bg-background rounded border">
                <span className="text-sm text-muted-foreground truncate flex-1">
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

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="font-medium">
                  {new Date(shortUrl.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Visits:</span>
                <p className="font-medium">{shortUrl.visitCount}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}