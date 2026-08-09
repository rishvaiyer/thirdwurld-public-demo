const THIRDWURLD_DEMO_NAV = Object.freeze([
  { id: 'world', label: 'World', enabled: true },
  { id: 'residents', label: 'Residents', enabled: true },
  { id: 'worldbook', label: 'Atlas', enabled: true },
  { id: 'technology', label: 'Technology', enabled: true },
  { id: 'economics', label: 'Economics', enabled: true },
  { id: 'status', label: 'Status', enabled: true },
  { id: 'preview', label: 'Preview', enabled: true },
])

const enabledPages = THIRDWURLD_DEMO_NAV.filter(page => page.enabled)
const pages = [...document.querySelectorAll('[data-page]')]
const navContainers = [...document.querySelectorAll('[data-navigation], [data-mobile-navigation]')]
const menuButton = document.querySelector('[data-menu-toggle]')
const mobileNav = document.querySelector('[data-mobile-navigation]')

function currentPage() {
  const id = window.location.hash.slice(1)
  return enabledPages.some(page => page.id === id) ? id : enabledPages[0].id
}

function closeMenu() { mobileNav?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false') }

function showPage(id, focus = false) {
  pages.forEach(page => { const active = page.dataset.page === id; page.classList.toggle('is-active', active); page.setAttribute('aria-hidden', String(!active)) })
  document.querySelectorAll('[data-page-link]').forEach(link => link.setAttribute('aria-current', String(link.dataset.pageLink === id)))
  closeMenu()
  if (focus) document.querySelector(`[data-page="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function route(id) { if (currentPage() !== id || !window.location.hash) window.location.hash = id; else showPage(id, true) }

function renderNav(container) {
  container.replaceChildren(...enabledPages.map(page => { const link = document.createElement('a'); link.href = `#${page.id}`; link.textContent = page.label; link.dataset.pageLink = page.id; link.addEventListener('click', event => { event.preventDefault(); route(page.id) }); return link }))
}

navContainers.forEach(renderNav)
document.querySelectorAll('[data-page-link]').forEach(control => control.addEventListener('click', event => { event.preventDefault(); route(control.dataset.pageLink) }))
window.addEventListener('hashchange', () => showPage(currentPage(), true))
showPage(currentPage())
menuButton?.addEventListener('click', () => { const open = mobileNav.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)) })

const field = document.querySelector('[data-memory-field]')
field?.addEventListener('pointermove', event => { const rect = field.getBoundingClientRect(); field.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`); field.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`) })

const perspectives = {
  rowan: { heading: '“I’m glad you stayed.”', copy: 'A small choice changes the social context available to a later moment.' },
  sable: { heading: '“I wanted company, not an answer.”', copy: 'A respectful invitation can become meaningful evidence without becoming a command.' },
}
document.querySelectorAll('[data-perspective]').forEach(button => button.addEventListener('click', () => { const data = perspectives[button.dataset.perspective]; document.querySelectorAll('[data-perspective]').forEach(item => item.setAttribute('aria-selected', String(item === button))); const readout = document.querySelector('[data-perspective-readout]'); readout.querySelector('span').textContent = `${button.textContent.replace(/Follow |Stay with /, '')} / Night Market`; readout.querySelector('h3').textContent = data.heading; readout.querySelector('p').textContent = data.copy }))

const moments = [
  ['Notice', 'A familiar place after rain', 'A resident notices a place and their own state in a shared world.'],
  ['Ask', 'An invitation, never a command', 'A resident can offer company while respecting another resident’s boundaries.'],
  ['Carry forward', 'Evidence shapes later context', 'The world record gives later interactions grounded context rather than fabricated history.'],
]
document.querySelectorAll('[data-moment]').forEach(button => button.addEventListener('click', () => { const [title, subtitle, copy] = moments[Number(button.dataset.moment)]; document.querySelectorAll('[data-moment]').forEach(item => item.classList.toggle('is-current', item === button)); const readout = document.querySelector('[data-perspective-readout]'); readout.querySelector('h3').textContent = title; readout.querySelector('p').textContent = `${subtitle}. ${copy}` }))

const atlasPlaces = {
  'night-market': ['assets/game/night-market-real.png', '01 / Night Market', 'After dark, the town gathers.', 'Lanterns, social spaces, and authored landmarks give encounters a sense of place.', 'Real in-game capture of the Night Market.'],
  'corner-cup': ['assets/game/corner-cup-real.png', '02 / Corner Cup', 'A smaller reason to linger.', 'Different spaces create different conditions for routine, reflection, and chance conversation.', 'Real in-game capture of Corner Cup.'],
  arrival: ['assets/game/arrival-plaza-real.webp', '03 / Arrival Plaza', 'A shared beginning.', 'An arrival area makes the world feel like somewhere you enter, not merely a surface you load.', 'Real in-game capture of the arrival plaza.'],
  garden: ['assets/thirdwurld-garden-memory.png', '04 / Pollinator Garden', 'A quiet place has purpose too.', 'Illustrative atmosphere for the kind of quiet time and reflection residents can choose.', 'Illustrative atmosphere of a garden memory.'],
}
function showAtlasPlace(id) { const [src, number, title, copy, alt] = atlasPlaces[id]; const image = document.querySelector('[data-atlas-image]'); image.src = src; image.alt = alt; document.querySelector('[data-atlas-number]').textContent = number; document.querySelector('[data-atlas-title]').textContent = title; document.querySelector('[data-atlas-copy]').textContent = copy; document.querySelectorAll('[data-atlas-control]').forEach(button => button.classList.toggle('is-active', button.dataset.atlasControl === id)) }
document.querySelectorAll('[data-atlas-control]').forEach(button => button.addEventListener('click', () => showAtlasPlace(button.dataset.atlasControl)))

const techLayers = {
  world: ['World record', 'The shared place stays authoritative.', 'Locations, people, and meaningful events come from the world, not a resident inventing what happened.', 'Does not claim: fabricated history or unrestricted action.'],
  memory: ['Resident context', 'A past worth carrying forward.', 'Residents have continuity from grounded evidence such as relationships, mood, diary, and meaningful interactions.', 'Does not claim: unlimited self-rewriting personality.'],
  choice: ['Meaningful choice', 'Agency with boundaries.', 'Residents choose within real capabilities and human-governed permission boundaries.', 'Does not claim: autonomous owner authority.'],
  trace: ['Durable trace', 'Later moments can have context.', 'Private diaries, relationship signals, and world events make a later moment more than a reset conversation.', 'Does not claim: public exposure of private records.'],
}
document.querySelectorAll('[data-tech-control]').forEach(button => button.addEventListener('click', () => { const [label, heading, copy, boundary] = techLayers[button.dataset.techControl]; document.querySelectorAll('[data-tech-control]').forEach(item => item.classList.toggle('is-active', item === button)); const readout = document.querySelector('[data-tech-readout]'); readout.querySelector('span').textContent = label; readout.querySelector('h3').textContent = heading; readout.querySelector('p').textContent = copy; readout.querySelector('small').textContent = boundary }))

function updateCostModel(value) { const residents = Number(value); const low = 45 + residents * 10; const high = 90 + residents * 50; document.querySelector('[data-cost-count]').textContent = residents; document.querySelector('[data-cost-total]').textContent = `$${low}–${high}`; document.querySelector('[data-cost-detail]').textContent = `${residents} active resident${residents === 1 ? '' : 's'} · world hosting + inference + memory/observability` }
document.querySelector('[data-cost-range]')?.addEventListener('input', event => updateCostModel(event.target.value))

const reelScenes = [
  ['assets/game/landing-hero.jpg', '01 / Arrival · original Thirdwurld visual', 'Start with the place.', 'A world is not a feature list. It is the feeling that something can happen here.'],
  ['assets/game/nearby-chat-real.png', '02 / Conversation · real in-game capture', 'Then witness a moment.', 'The public demo never claims a screenshot is a feeling. It shows the real surface where residents and visitors meet.'],
  ['assets/game/owner-dashboard.jpg', '03 / Owner layer · privacy-safe capture', 'Finally, understand the world.', 'The owner can observe meaningful change without turning resident life into public content.'],
]
let reelIndex = 0
document.querySelector('[data-reel-next]')?.addEventListener('click', () => { reelIndex = (reelIndex + 1) % reelScenes.length; const [src, label, title, copy] = reelScenes[reelIndex]; const image = document.querySelector('[data-reel-image]'); image.src = src; image.alt = label; document.querySelector('[data-reel-label]').textContent = label; document.querySelector('[data-reel-title]').textContent = title; document.querySelector('[data-reel-copy]').textContent = copy; document.querySelectorAll('[data-reel-dot]').forEach((dot, index) => dot.classList.toggle('is-active', index === reelIndex)) })
