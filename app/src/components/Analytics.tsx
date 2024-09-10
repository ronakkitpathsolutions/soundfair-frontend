import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, FC } from 'react'
import { GTMPageView, GTMEvent } from '@/lib/gtm'

export const Analytics: FC<{ gtmId: string }> = ({ gtmId }) => {
  const { pathname } = useRouter()

  useEffect(() => {
    // Listen to clicks
    document.addEventListener('click', (e) => {
      // Check if target has `data-gtm` attribute
      const target = e.target as HTMLElement
      const gtm = target.getAttribute('data-gtm-event')

      if (gtm) {
        GTMEvent(gtm, {
          label: target.getAttribute('data-gtm-label'),
        })
      }
    })
  }, [])

  useEffect(() => {
    if (pathname) {
      GTMPageView(pathname)
    }
  }, [pathname])

  if (!gtmId) {
    return null
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${gtmId}');
  `,
        }}
      />
    </>
  )
}
