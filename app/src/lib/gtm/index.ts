type windowWithGTM = typeof window & {
  dataLayer: any[]
}

export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string
    pageUrl: string
    pageTitle: string
  }

  const pageEvent: PageEventProps = {
    event: 'routeChange',
    pageUrl: url,
    pageTitle: (typeof document !== 'undefined' && document.title) || '',
  }

  GTMPush(pageEvent)
}

export const GTMEvent = (
  event: string,
  parameters?: { [key: string]: any },
) => {
  interface EventProps {
    event: string
    [key: string]: any
  }

  let eventProps: EventProps = {
    event,
  }

  if (parameters) {
    eventProps = {
      ...eventProps,
      ...parameters,
    }
  }

  GTMPush(eventProps)
}

export const GTMPush = (data: { [key: string]: any }) => {
  const w = window as windowWithGTM
  w.dataLayer = w.dataLayer || []

  w.dataLayer.push(data)
}
