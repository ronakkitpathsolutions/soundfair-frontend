export const isElementInViewport = (el: HTMLElement, offset = 0) => {
  const rect = el.getBoundingClientRect()

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top <
      (window.innerHeight - offset ||
        document.documentElement.clientHeight - offset)
  )
}
