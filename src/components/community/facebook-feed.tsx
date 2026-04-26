"use client"

import { useEffect } from 'react'
import { Facebook } from 'lucide-react'

// TypeScript declarations for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void
      }
    }
  }
}

export function FacebookFeed() {
  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (window.FB) {
        window.FB.XFBML.parse()
        return
      }

      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div')
        fbRoot.id = 'fb-root'
        document.body.insertBefore(fbRoot, document.body.firstChild)
      }

      if (document.getElementById('facebook-jssdk')) return;

      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0'
      
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse()
        }
      }

      const firstScript = document.getElementsByTagName('script')[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      } else {
        document.body.appendChild(script)
      }
    }

    loadFacebookSDK()
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
          <Facebook className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Community Updates</h3>
          <p className="text-sm text-muted-foreground">Latest from ISKM Montreal</p>
        </div>
      </div>

      <div className="w-full overflow-hidden flex justify-center">
        <div className="fb-page w-full bg-card/50 rounded-xl" 
          data-href="https://www.facebook.com/profile.php?id=61580147803495"
          data-tabs="timeline"
          data-width="1000"
          data-height="700"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true">
          <blockquote cite="https://www.facebook.com/profile.php?id=61580147803495" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/profile.php?id=61580147803495">ISKCON Montreal</a>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
