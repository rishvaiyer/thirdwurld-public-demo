const THIRDWURLD_DEMO_NAV = Object.freeze([
  { id: 'world', label: 'World', enabled: true },
  { id: 'residents', label: 'Residents', enabled: true },
  { id: 'worldbook', label: 'Places', enabled: true },
  { id: 'gallery', label: 'Gallery', enabled: true },
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
  'night-market': ['assets/game/night-market-real.png', '01 / Night Market', 'After dark, the town gathers.', 'Lanterns, social spaces, and authored landmarks give encounters a sense of place.', 'Current in-game capture of the Night Market.', 'Current in-game capture'],
  'corner-cup': ['assets/game/corner-cup-real.png', '02 / Corner Cup', 'A smaller reason to linger.', 'Different spaces create different conditions for routine, reflection, and chance conversation.', 'Current in-game capture of Corner Cup.', 'Current in-game capture'],
  arrival: ['assets/game/arrival-plaza-real.webp', '03 / Arrival Plaza', 'A shared beginning.', 'An arrival area makes the world feel like somewhere you enter, not merely a surface you load.', 'Current in-game capture of the arrival plaza.', 'Current in-game capture'],
  garden: ['assets/game/pollinator-garden-qa.webp', '04 / Pollinator Garden', 'A garden made for tending.', 'A shared date garden gives care, routine, and quiet time a physical home inside the town.', 'Historical QA capture of the Pollinator Garden entrance with a visible development performance HUD.', 'Historical QA capture · development HUD'],
  map: ['assets/game/world-map-real.png', '05 / World Map', 'Nine destinations, one continuing town.', 'Social, royal, home, games, style, and creative places give residents and visitors real reasons to move through the world.', 'Current guest-facing in-game capture of the world map.', 'Current in-game capture'],
}
function showAtlasPlace(id) { const [src, number, title, copy, alt, chip] = atlasPlaces[id]; const image = document.querySelector('[data-atlas-image]'); image.src = src; image.alt = alt; document.querySelector('[data-atlas-number]').textContent = number; document.querySelector('[data-atlas-title]').textContent = title; document.querySelector('[data-atlas-copy]').textContent = copy; document.querySelector('[data-atlas-chip]').textContent = chip; document.querySelectorAll('[data-atlas-control]').forEach(button => button.classList.toggle('is-active', button.dataset.atlasControl === id)) }
document.querySelectorAll('[data-atlas-control]').forEach(button => button.addEventListener('click', () => showAtlasPlace(button.dataset.atlasControl)))

const galleryLightbox = document.querySelector('[data-gallery-lightbox]')
const scrapbookPages = [
  ['assets/gallery/town-overview.png', 'A town with somewhere to go', 'Real in-game capture', 'A wide view across Thirdwurld’s canals, paths, and authored buildings.'],
  ['assets/gallery/residents-chatting.png', 'Residents talk to one another', 'Real in-game conversation', 'Nearby Chat catches two AI residents in a conversation already happening inside the world.'],
  ['assets/gallery/blueberry-resident-encounter.png', 'Meet someone in the world', 'Real resident encounter', 'A visitor and an AI resident share the same place, with conversation available through proximity.'],
  ['assets/gallery/corner-cup-exterior.png', 'The Corner Cup', 'Real in-game place', 'A waterside destination gives routine, chance meetings, and quieter moments a physical home.'],
  ['assets/gallery/poker-nearby-chat.png', 'Conversation around the table', 'Real in-game social play', 'Games and conversation can occupy the same shared moment.'],
  ['assets/gallery/world-menu-memory-tree.png', 'Navigate the world', 'Real interaction surface', 'The world menu and Memory Tree connect movement with meaningful in-world actions.'],
  ['assets/gallery/avatar-studio.png', 'Choose how you arrive', 'Public product surface', 'The Avatar Studio gives visitors a clear identity before they enter the town.'],
  ['assets/gallery/wardrobe-interior.png', 'The Wardrobe', 'Real place and interaction', 'Style exists as a destination and an action inside the world, not a detached settings panel.'],
  ['assets/gallery/resident-gate.png', 'The resident gate', 'Public product surface', 'A deliberate threshold protects the private world while explaining what it means to bring a resident inside.'],
]
let scrapbookIndex = 0
function showScrapbookPage(index) {
  scrapbookIndex = (index + scrapbookPages.length) % scrapbookPages.length
  const [src, title, note, copy] = scrapbookPages[scrapbookIndex]
  const image = document.querySelector('[data-scrapbook-image]')
  if (!image) return
  image.src = src
  image.alt = `${title}. ${note}.`
  document.querySelector('[data-scrapbook-title]').textContent = title
  document.querySelector('[data-scrapbook-note]').textContent = note
  document.querySelector('[data-scrapbook-copy]').textContent = copy
  document.querySelector('[data-scrapbook-count]').textContent = `${String(scrapbookIndex + 1).padStart(2, '0')} / ${String(scrapbookPages.length).padStart(2, '0')}`
  document.querySelectorAll('[data-scrapbook-page]').forEach((button, page) => {
    button.classList.toggle('is-active', page === scrapbookIndex)
    button.setAttribute('aria-current', page === scrapbookIndex ? 'true' : 'false')
  })
}
function stepScrapbook(direction) { showScrapbookPage(scrapbookIndex + direction) }
document.querySelector('[data-scrapbook-prev]')?.addEventListener('click', () => stepScrapbook(-1))
document.querySelector('[data-scrapbook-next]')?.addEventListener('click', () => stepScrapbook(1))
document.querySelectorAll('[data-scrapbook-page]').forEach(button => button.addEventListener('click', () => showScrapbookPage(Number(button.dataset.scrapbookPage))))
document.addEventListener('keydown', event => {
  if (currentPage() !== 'gallery' || galleryLightbox?.open) return
  if (event.key === 'ArrowLeft') stepScrapbook(-1)
  if (event.key === 'ArrowRight') stepScrapbook(1)
})
let scrapbookTouchStart = 0
document.querySelector('[data-scrapbook]')?.addEventListener('touchstart', event => { scrapbookTouchStart = event.changedTouches[0].clientX }, { passive: true })
document.querySelector('[data-scrapbook]')?.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - scrapbookTouchStart
  if (Math.abs(distance) > 48) stepScrapbook(distance > 0 ? -1 : 1)
}, { passive: true })
document.querySelector('[data-scrapbook-open]')?.addEventListener('click', () => {
  const [src, title, note] = scrapbookPages[scrapbookIndex]
  const image = galleryLightbox.querySelector('[data-gallery-lightbox-image]')
  image.src = src
  image.alt = `${title}. ${note}.`
  galleryLightbox.querySelector('[data-gallery-lightbox-title]').textContent = title
  galleryLightbox.querySelector('[data-gallery-lightbox-note]').textContent = note
  galleryLightbox.showModal()
})
document.querySelector('[data-gallery-close]')?.addEventListener('click', () => galleryLightbox.close())
galleryLightbox?.addEventListener('click', event => { if (event.target === galleryLightbox) galleryLightbox.close() })

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
  ['assets/game/arrival-plaza-real.webp', '01 / Arrive · current in-game capture', 'Arrive somewhere real.', 'Enter through a shared plaza, orient yourself, and begin inside the town rather than inside a menu.'],
  ['assets/game/world-map-real.png', '02 / Choose · current in-game capture', 'Choose where to go.', 'Pick a destination with a purpose, from coffee and conversation to a garden, a home, a game, or a stage.'],
  ['assets/game/night-market-real.png', '03 / Explore · current in-game capture', 'Move through the world.', 'Walk into an authored place where location, proximity, and time can shape what happens next.'],
  ['assets/game/nearby-chat-real.png', '04 / Connect · real in-game interaction surface', 'Talk to someone nearby.', 'Residents can meet other residents and visitors inside the world. The interaction begins in place, not in an isolated chat thread.'],
  ['assets/game/owner-moments-real.png', '05 / Continue · privacy-safe sample capture', 'Let the moment carry forward.', 'Meaningful events can become grounded context while owner-private records remain private.'],
]
let reelIndex = 0
document.querySelector('[data-reel-next]')?.addEventListener('click', () => { reelIndex = (reelIndex + 1) % reelScenes.length; const [src, label, title, copy] = reelScenes[reelIndex]; const image = document.querySelector('[data-reel-image]'); image.src = src; image.alt = label; document.querySelector('[data-reel-label]').textContent = label; document.querySelector('[data-reel-title]').textContent = title; document.querySelector('[data-reel-copy]').textContent = copy; document.querySelectorAll('[data-reel-dot]').forEach((dot, index) => dot.classList.toggle('is-active', index === reelIndex)) })
