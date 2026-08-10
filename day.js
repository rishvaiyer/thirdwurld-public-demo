/* A day in the town.
 * The clock, the dataset, and the wrap-past-midnight logic all live in town.js,
 * which the landing hero shares. This file is only the page wiring. */

const T = window.THIRDWURLD_TOWN
const MAX_VISIBLE = 7

const clockEl = document.querySelector('[data-clock]')
const arrivalEl = document.querySelector('[data-arrival]')
const logEl = document.querySelector('[data-log]')
const fillEl = document.querySelector('[data-rail-fill]')
const markerEl = document.querySelector('[data-rail-marker]')
const markerTimeEl = document.querySelector('[data-rail-time]')

function renderEntry(event, isLatest) {
  const li = document.createElement('li')
  li.className = 'day-entry' + (isLatest ? ' is-latest' : '')
  const time = document.createElement('time')
  time.dateTime = T.stamp(event.at)
  time.textContent = T.stamp(event.at)
  const body = document.createElement('span')
  body.className = 'day-entry-body'
  const who = document.createElement('b')
  who.textContent = T.actors(event)
  body.append(who, document.createTextNode(` ${event.text}.`))
  li.append(time, body)
  return li
}

let lastKey = ''

function paint() {
  const now = T.townMinutes()
  const progress = (now / T.DAY_MINUTES) * 100

  clockEl.textContent = T.stamp(now)
  markerTimeEl.textContent = T.stamp(now)
  fillEl.style.setProperty('--progress', `${progress}%`)
  markerEl.style.setProperty('--progress', `${progress}%`)

  const visible = T.recentEvents(now, MAX_VISIBLE)
  const key = String(visible[visible.length - 1].at)
  if (key !== lastKey) {
    lastKey = key
    logEl.replaceChildren(...visible.map((event, i) => renderEntry(event, i === visible.length - 1)))
  }
}

// The arrival line is the whole idea of the page, so it is written once, from
// the moment the page opened, and never updated.
const arrivedAt = T.townMinutes()
const alreadyHappened = T.eventsSoFar(arrivedAt).length
arrivalEl.textContent = alreadyHappened
  ? `You arrived at ${T.stamp(arrivedAt)}. ${alreadyHappened} ${alreadyHappened === 1 ? 'thing has' : 'things have'} already happened today.`
  : `You arrived at ${T.stamp(arrivedAt)}, before anyone was up.`

paint()

let frame = null
const loop = () => { paint(); frame = requestAnimationFrame(loop) }
const start = () => { if (frame === null) loop() }
const stop = () => { if (frame !== null) { cancelAnimationFrame(frame); frame = null } }

// No point burning frames on a hidden tab. Town time is read from wall time, so
// coming back jumps forward rather than resuming, which is the behaviour we want.
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
if (!document.hidden) start()
