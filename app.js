const THIRDWURLD_DEMO_NAV = Object.freeze([
  { id: 'overview', label: 'Overview', enabled: true },
  { id: 'proof', label: 'Living proof', enabled: true },
  { id: 'economics', label: 'Economics', enabled: true },
  { id: 'architecture', label: 'Capability map', enabled: true },
])

const pages = [...document.querySelectorAll('[data-page]')]
const navContainers = [...document.querySelectorAll('[data-navigation], [data-mobile-navigation]')]
const enabledPages = THIRDWURLD_DEMO_NAV.filter(({ enabled }) => enabled)
const menuButton = document.querySelector('[data-menu-toggle]')
const mobileNav = document.querySelector('[data-mobile-navigation]')

function activePageId() {
  const id = window.location.hash.slice(1)
  return enabledPages.some(page => page.id === id) ? id : enabledPages[0]?.id
}

function closeMenu() {
  mobileNav?.classList.remove('is-open')
  menuButton?.setAttribute('aria-expanded', 'false')
}

function showPage(id, { focus = false } = {}) {
  pages.forEach(page => {
    const active = page.dataset.page === id
    page.classList.toggle('is-active', active)
    page.setAttribute('aria-hidden', String(!active))
  })
  document.querySelectorAll('[data-page-link]').forEach(link => {
    link.setAttribute('aria-current', String(link.dataset.pageLink === id ? 'page' : 'false'))
  })
  closeMenu()
  if (focus) document.querySelector(`[data-page="${id}"]`)?.focus({ preventScroll: true })
}

function navigate(id) {
  if (window.location.hash !== `#${id}`) window.location.hash = id
  else showPage(id, { focus: true })
}

function renderNavigation(container) {
  container.replaceChildren(...enabledPages.map(({ id, label }) => {
    const link = document.createElement('a')
    link.href = `#${id}`
    link.textContent = label
    link.dataset.pageLink = id
    link.addEventListener('click', event => {
      event.preventDefault()
      navigate(id)
    })
    return link
  }))
}

navContainers.forEach(renderNavigation)
window.addEventListener('hashchange', () => showPage(activePageId(), { focus: true }))
showPage(activePageId())

menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open')
  menuButton.setAttribute('aria-expanded', String(open))
})

document.querySelectorAll('[data-page-link]').forEach(link => {
  if (link.closest('[data-navigation], [data-mobile-navigation]')) return
  link.addEventListener('click', event => {
    event.preventDefault()
    navigate(link.dataset.pageLink)
  })
})

const panels = [...document.querySelectorAll('[data-reel-panel]')]
const dots = [...document.querySelectorAll('[data-reel-dot]')]
let reelIndex = 0

function showReel(index) {
  reelIndex = (index + panels.length) % panels.length
  panels.forEach((panel, panelIndex) => {
    const active = panelIndex === reelIndex
    panel.classList.toggle('is-active', active)
    panel.setAttribute('aria-hidden', String(!active))
  })
  dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === reelIndex)))
}

document.querySelector('[data-reel-next]')?.addEventListener('click', () => showReel(reelIndex + 1))
document.querySelector('[data-open-reel]')?.addEventListener('click', () => {
  navigate('proof')
  window.setTimeout(() => document.querySelector('.demo-reel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0)
})
dots.forEach(dot => dot.addEventListener('click', () => showReel(Number(dot.dataset.reelDot))))
