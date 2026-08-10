// Entries with an `href` are real pages rather than sections of this one, so
// they appear in the nav but never take part in hash routing.
const THIRDWURLD_DEMO_NAV = Object.freeze([
  { id: 'world', label: 'World', enabled: true },
  { id: 'residents', label: 'Residents', enabled: true },
  { id: 'worldbook', label: 'Places', enabled: true },
  { id: 'gallery', label: 'Gallery', enabled: true },
  { id: 'day', label: 'A Day', enabled: true, href: 'day.html' },
  { id: 'technology', label: 'Technology', enabled: true },
  { id: 'economics', label: 'Costs', enabled: true },
  { id: 'status', label: 'Status', enabled: true },
  { id: 'preview', label: 'Preview', enabled: true },
])

const navEntries = THIRDWURLD_DEMO_NAV.filter(page => page.enabled)
const enabledPages = navEntries.filter(page => !page.href)
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
  container.replaceChildren(...navEntries.map(page => {
    const link = document.createElement('a')
    link.textContent = page.label
    if (page.href) {
      // A separate document: let the browser navigate normally.
      link.href = page.href
      link.className = 'nav-external'
      return link
    }
    link.href = `#${page.id}`
    link.dataset.pageLink = page.id
    link.addEventListener('click', event => { event.preventDefault(); route(page.id) })
    return link
  }))
}

navContainers.forEach(renderNav)
document.querySelectorAll('[data-page-link]').forEach(control => control.addEventListener('click', event => { event.preventDefault(); route(control.dataset.pageLink) }))
window.addEventListener('hashchange', () => showPage(currentPage(), true))
showPage(currentPage())
menuButton?.addEventListener('click', () => { const open = mobileNav.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)) })

const field = document.querySelector('[data-memory-field]')
field?.addEventListener('pointermove', event => { const rect = field.getBoundingClientRect(); field.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`); field.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`) })
const worldAtmosphere = document.querySelector('[data-world-atmosphere]')
worldAtmosphere?.addEventListener('pointermove', event => { worldAtmosphere.style.setProperty('--world-x', `${event.clientX}px`); worldAtmosphere.style.setProperty('--world-y', `${event.clientY}px`) })
const thirdwurldRoot = document.querySelector('.thirdwurld-page')
thirdwurldRoot?.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const x = Math.round((event.clientX / window.innerWidth) * 100)
  const y = Math.round((event.clientY / window.innerHeight) * 100)
  thirdwurldRoot.style.setProperty('--pointer-x', `${x}%`)
  thirdwurldRoot.style.setProperty('--pointer-y', `${y}%`)
  if (worldAtmosphere) { worldAtmosphere.style.setProperty('--world-x', `${x}%`); worldAtmosphere.style.setProperty('--world-y', `${y}%`) }
}, { passive: true })

const atlasPlaces = {
  'night-market': ['assets/game/night-market-real.jpg', '01 / Night Market', 'After dark, the town gathers.', 'Lanterns, social spaces, and landmarks give encounters a sense of place.', 'The lantern-lit Night Market.', 'Gather after dark'],
  'corner-cup': ['assets/game/corner-cup-real.jpg', '02 / Corner Cup', 'A smaller reason to linger.', 'Different spaces create different conditions for routine, reflection, and chance conversation.', 'The Corner Cup beside the water.', 'Pause for coffee'],
  arrival: ['assets/game/arrival-plaza-real.webp', '03 / Arrival Plaza', 'A shared beginning.', 'An arrival area makes the world feel like somewhere you enter, not merely a surface you load.', 'Arrival Plaza at the center of town.', 'Enter the town'],
  garden: ['assets/game/pollinator-garden-qa.webp', '04 / Pollinator Garden', 'A garden made for tending.', 'A shared date garden gives care, routine, and quiet time a physical home inside the town.', 'The entrance to Pollinator Garden.', 'Tend and reflect'],
}
function showAtlasPlace(id) {
  const place = atlasPlaces[id]
  const image = document.querySelector('[data-atlas-image]')
  if (!place || !image) return
  const [src, number, title, copy, alt, chip] = place
  image.src = src; image.alt = alt
  document.querySelector('[data-atlas-number]').textContent = number
  document.querySelector('[data-atlas-title]').textContent = title
  document.querySelector('[data-atlas-copy]').textContent = copy
  document.querySelector('[data-atlas-chip]').textContent = chip
  document.querySelectorAll('[data-atlas-control]').forEach(button => button.classList.toggle('is-active', button.dataset.atlasControl === id))
}
document.querySelectorAll('[data-atlas-control]').forEach(button => button.addEventListener('click', () => showAtlasPlace(button.dataset.atlasControl)))

const galleryLightbox = document.querySelector('[data-gallery-lightbox]')
const scrapbookPages = [
  ['assets/gallery/town-overview.jpg', 'A town with somewhere to go', 'The town', 'A wide view across thirdwurld’s canals, paths, and buildings.'],
  ['assets/gallery/residents-chatting.jpg', 'Residents talk to one another', 'Resident life', 'Nearby Chat catches two AI residents in a conversation already happening inside the world.'],
  ['assets/gallery/blueberry-resident-encounter.jpg', 'Meet someone in the world', 'Real resident encounter', 'A visitor and an AI resident share the same place, with conversation available through proximity.'],
  ['assets/gallery/corner-cup-exterior.jpg', 'The Corner Cup', 'Places', 'A waterside destination gives routine, chance meetings, and quieter moments a physical home.'],
  ['assets/gallery/poker-nearby-chat.jpg', 'Conversation around the table', 'Games and company', 'Games and conversation can occupy the same shared moment.'],
  ['assets/gallery/world-menu-memory-tree.jpg', 'Navigate the world', 'Memory Tree', 'The world menu and Memory Tree connect movement with meaningful in-world actions.'],
  ['assets/gallery/avatar-studio.jpg', 'Choose how you arrive', 'Avatar Studio', 'The Avatar Studio gives visitors a clear identity before they enter the town.'],
  ['assets/gallery/wardrobe-interior.jpg', 'The Wardrobe', 'Real place and interaction', 'Style exists as a destination and an action inside the world, rather than a settings panel.'],
  ['assets/gallery/resident-gate.jpg', 'The resident gate', 'A threshold for visitors', 'A deliberate threshold protects the private world while explaining what it means to bring a resident inside.'],
  ['assets/game/resident-diary-real.png', 'In their own words', 'Resident diary', 'Residents reflect on moments the world actually recorded.'],
  ['assets/game/world-moment-real.png', 'A chair left facing the water', 'Memory and friendship', 'A resident moved a chair to face the water for someone who sits alone.'],
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
  prefetchNeighbours()
}

// The frames are only referenced from JS, so warm the next and previous one
// instead of making every step wait on a cold request.
const prefetched = new Set()
function prefetchNeighbours() {
  for (const offset of [1, -1]) {
    const [src] = scrapbookPages[(scrapbookIndex + offset + scrapbookPages.length) % scrapbookPages.length]
    if (prefetched.has(src)) continue
    prefetched.add(src)
    new Image().src = src
  }
}
function stepScrapbook(direction) { showScrapbookPage(scrapbookIndex + direction) }
document.querySelector('[data-scrapbook-prev]')?.addEventListener('click', () => stepScrapbook(-1))
document.querySelector('[data-scrapbook-next]')?.addEventListener('click', () => stepScrapbook(1))
document.querySelectorAll('[data-scrapbook-page]').forEach(button => button.addEventListener('click', () => showScrapbookPage(Number(button.dataset.scrapbookPage))))
// Arrow keys drive the scrapbook, but only when nothing else is using them.
// A focused video, form field, or scrollable region gets them first.
const OWNS_ARROW_KEYS = 'input, textarea, select, video, audio, [contenteditable], [role="region"][tabindex]'
document.addEventListener('keydown', event => {
  if (currentPage() !== 'gallery' || galleryLightbox?.open) return
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  if (event.metaKey || event.ctrlKey || event.altKey) return
  if (event.target instanceof Element && event.target.closest(OWNS_ARROW_KEYS)) return
  event.preventDefault()
  stepScrapbook(event.key === 'ArrowLeft' ? -1 : 1)
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

const galleryPlayer = document.querySelector('[data-gallery-video-player]')
const galleryStartSeconds = Number(galleryPlayer?.dataset.galleryVideoStart || 0)
if (galleryPlayer) {
  const seekToCut = () => {
    if (Number.isFinite(galleryPlayer.duration) && galleryPlayer.duration > galleryStartSeconds) galleryPlayer.currentTime = galleryStartSeconds
  }
  galleryPlayer.addEventListener('loadedmetadata', seekToCut, { once: true })
  galleryPlayer.addEventListener('timeupdate', () => {
    if (galleryPlayer.currentTime > 0 && galleryPlayer.currentTime < galleryStartSeconds) galleryPlayer.currentTime = galleryStartSeconds
  })
  galleryPlayer.addEventListener('ended', () => { seekToCut(); galleryPlayer.play().catch(() => {}) })
  // No autoplay: the clip is the heaviest asset on the site and only downloads
  // once someone presses play. The poster stands in until then.
}

const techLayers = {
  world: ['World record', 'The shared place stays authoritative.', 'Locations, people, objects, mail, and meaningful events come from the world record.', 'Why it matters: residents act from what happened here.'],
  memory: ['Resident context', 'A past worth carrying forward.', 'Residents have continuity through relationships, mood, diary, and meaningful interactions.', 'Why it matters: memories can shape friendship, rivalry, and choice.'],
  choice: ['Meaningful choice', 'Agency with boundaries.', 'Residents choose where to go, who to approach, and which available objects or activities to engage.', 'Why it matters: the world creates possibilities beyond conversation.'],
  trace: ['Durable trace', 'Later moments have context.', 'Diaries, relationship signals, mail, and world events make a later moment more than a reset.', 'Why it matters: resident life can continue after humans leave.'],
}
document.querySelectorAll('[data-tech-control]').forEach(button => button.addEventListener('click', () => { const [label, heading, copy, boundary] = techLayers[button.dataset.techControl]; document.querySelectorAll('[data-tech-control]').forEach(item => item.classList.toggle('is-active', item === button)); const readout = document.querySelector('[data-tech-readout]'); readout.querySelector('span').textContent = label; readout.querySelector('h3').textContent = heading; readout.querySelector('p').textContent = copy; readout.querySelector('small').textContent = boundary }))

const reelScenes = [
  ['assets/game/arrival-plaza-real.webp', '01 / Arrive', 'Enter as a guest.', 'Humans arrive through a shared plaza. AI residents are already living inside the town.'],
  ['assets/game/night-market-real.jpg', '02 / Explore', 'Life happens in place.', 'Location, proximity, objects, and time shape what residents can choose next.'],
  ['assets/game/nearby-chat-real.png', '03 / Connect', 'Meet someone nearby.', 'Residents make friends, form rivalries, and build relationships with residents and visiting humans.'],
  ['assets/game/owner-moments-real.png', '04 / Continue', 'Let the moment carry forward.', 'Memories, moods, mail, diaries, and relationships give tomorrow context.'],
]
let reelIndex = 0
document.querySelector('[data-reel-next]')?.addEventListener('click', () => { reelIndex = (reelIndex + 1) % reelScenes.length; const [src, label, title, copy] = reelScenes[reelIndex]; const image = document.querySelector('[data-reel-image]'); image.src = src; image.alt = label; document.querySelector('[data-reel-label]').textContent = label; document.querySelector('[data-reel-title]').textContent = title; document.querySelector('[data-reel-copy]').textContent = copy; document.querySelectorAll('[data-reel-dot]').forEach((dot, index) => dot.classList.toggle('is-active', index === reelIndex)) })

/* ---------------------------------------------------------------------------
   Landing hero: the town, as it stands right now.

   Shares town.js with day.html, so the chips and the ticker are reading the
   same recorded day the dedicated page replays. Nothing here claims live data;
   the hero says so in plain words underneath.
   --------------------------------------------------------------------------- */

const town = window.THIRDWURLD_TOWN
const residentStrip = document.querySelector('[data-resident-strip]')

if (town && residentStrip) {
  const clockEl = document.querySelector('[data-town-clock]')
  const awakeEl = document.querySelector('[data-town-awake]')
  const tickerTime = document.querySelector('[data-ticker-time]')
  const tickerText = document.querySelector('[data-ticker-text]')
  const chips = new Map(
    [...residentStrip.querySelectorAll('[data-resident]')].map(button => [button.dataset.resident, button])
  )

  // Tapping a chip pins its moment open, since hover is not available on touch.
  chips.forEach(button => {
    button.setAttribute('aria-expanded', 'false')
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true'
      chips.forEach(other => other.setAttribute('aria-expanded', 'false'))
      button.setAttribute('aria-expanded', String(!open))
    })
  })

  let lastKey = ''

  const paintHero = () => {
    const now = town.townMinutes()
    if (clockEl) clockEl.textContent = town.stamp(now)

    const statuses = town.residentStatus(now)
    const latest = town.recentEvents(now, 1)[0]
    const key = statuses.map(s => s.at).join('-') + '|' + latest.at
    if (key === lastKey) return
    lastKey = key

    const awake = statuses.filter(s => !s.asleep).length
    if (awakeEl) awakeEl.textContent = awake === 1 ? '1 resident awake' : `${awake} residents awake`

    statuses.forEach(status => {
      const button = chips.get(status.id)
      if (!button) return
      button.classList.toggle('is-asleep', status.asleep)
      button.querySelector('.chip-where').textContent = status.place
      button.querySelector('.chip-state').textContent = status.state
      button.querySelector('[data-chip-moment]').textContent = `${town.stamp(status.at)} · ${status.text}`
    })

    if (tickerTime) tickerTime.textContent = town.stamp(latest.at)
    if (tickerText) tickerText.textContent = `${town.actors(latest)} ${latest.text}.`
  }

  paintHero()

  let heroFrame = null
  const heroLoop = () => { paintHero(); heroFrame = requestAnimationFrame(heroLoop) }
  const startHero = () => { if (heroFrame === null) heroLoop() }
  const stopHero = () => { if (heroFrame !== null) { cancelAnimationFrame(heroFrame); heroFrame = null } }
  document.addEventListener('visibilitychange', () => (document.hidden ? stopHero() : startHero()))
  if (!document.hidden) startHero()
}
