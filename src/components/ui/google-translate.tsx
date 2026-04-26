"use client"

import { useEffect } from 'react'

export function GoogleTranslate() {
  useEffect(() => {
    const initTranslate = () => {
      if ((window as any).google && (window as any).google.translate) {
        // Try to clear existing widget if any
        const el = document.getElementById('google_translate_element')
        if (el && el.innerHTML === '') {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'fr,en',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          )
        }
      }
    }

    // Add the callback globally
    ;(window as any).googleTranslateElementInit = initTranslate

    // Check if script is already injected
    if (document.getElementById('google-translate-script')) {
      // If already injected, we might be navigating back, so try to re-init
      initTranslate()
      return
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="flex items-center justify-center min-w-[120px] h-[40px] overflow-hidden bg-background border border-border rounded-md px-2">
      <div id="google_translate_element" className="scale-90 origin-center w-full h-full flex items-center justify-center"></div>
    </div>
  )
}
