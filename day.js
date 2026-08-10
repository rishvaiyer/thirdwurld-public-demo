/* A day in the town.
 *
 * The point of this page is that the world does not wait for a visitor, so the
 * clock is derived from wall-clock time rather than counted with a timer. Two
 * consequences fall out of that for free: you always arrive mid-day rather than
 * at 00:00, and if you leave the tab and come back, the town has moved on
 * instead of resuming where you left it. */

const DAY_MINUTES = 1440
const REAL_MS_PER_DAY = 24 * 60 * 1000 // one town day every 24 real minutes

// A recorded day. [minutesSinceMidnight, who, what]
const DAY = [
  [355, 'Marvin', 'unlocked the Corner Cup and put the water on'],
  [372, 'Blueberry', 'watched the canal from the Waterfront Quarter'],
  [401, 'Juno', 'walked the Commons before anyone else was up'],
  [418, 'Marvin', 'served the first cup of the day to nobody in particular'],
  [447, 'Blueberry', 'joined Marvin at the Corner Cup'],
  [452, 'Marvin and Blueberry', 'talked for eleven minutes'],
  [470, 'Juno', 'wrote in her diary about the quiet'],
  [503, 'Odile', 'arrived at Arrival Plaza and stood there a while'],
  [529, 'Blueberry', 'tended the beds in the Pollinator Garden'],
  [546, 'Marvin', 'put the radio on in the Commons'],
  [560, 'Juno', 'stopped to listen'],
  [588, 'Odile', 'and Juno met for the first time'],
  [601, 'Odile', 'noted that Juno keeps to the edges of a room'],
  [634, 'Marvin', 'closed the Corner Cup for the middle of the day'],
  [662, 'Blueberry', 'sat alone in the Garden Quarter'],
  [690, 'Juno', 'posted a letter through Royal Mail'],
  [727, 'Odile', 'read it twice'],
  [755, 'Marvin and Odile', 'disagreed about the radio'],
  [769, 'Marvin', 'went quiet for an hour'],
  [812, 'Blueberry', 'crossed the Music Quarter on the long way round'],
  [848, 'Juno', 'and Blueberry played a hand of cards'],
  [871, 'Blueberry', 'lost, and said so at length'],
  [905, 'Odile', 'lit the first lantern at the Night Market'],
  [928, 'Marvin', 'reopened the Corner Cup for the evening'],
  [944, 'Juno', 'brought Marvin a cutting from the garden'],
  [951, 'Marvin', 'kept it'],
  [978, 'Blueberry', 'and Odile talked at the Night Market until it emptied'],
  [1015, 'Juno', 'walked home along the water'],
  [1042, 'Odile', 'wrote down what Marvin said earlier'],
  [1071, 'Marvin', 'swept the Corner Cup and left the light on'],
  [1108, 'Blueberry', 'stayed out longer than she meant to'],
  [1140, 'Juno', 'wrote in her diary about the cutting'],
  [1177, 'Odile', 'was the last one through Arrival Plaza'],
  [1215, 'Blueberry', 'went quiet'],
  [1268, 'Marvin', 'dreamt about the canal, apparently'],
  [1310, 'Juno', 'woke once and went back to sleep'],
  [45, 'Odile', 'was still awake, which is unusual for her'],
  [96, 'Blueberry', 'slept through the whole of it'],
  [140, 'Juno', 'left a chair facing the water'],
  [221, 'Marvin', 'was the first thing moving in the town'],
  [288, 'Odile', 'passed the Commons on her way back'],
].sort((a, b) => a[0] - b[0])

const MAX_VISIBLE = 7

const clockEl = document.querySelector('[data-clock]')
const arrivalEl = document.querySelector('[data-arrival]')
const logEl = document.querySelector('[data-log]')
const fillEl = document.querySelector('[data-rail-fill]')
const markerEl = document.querySelector('[data-rail-marker]')
const markerTimeEl = document.querySelector('[data-rail-time]')

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

const pad = n => String(n).padStart(2, '0')
const stamp = minutes => `${pad(Math.floor(minutes / 60) % 24)}:${pad(Math.floor(minutes) % 60)}`

/** Town minutes since midnight, read straight off the wall clock. */
function townMinutes() {
  return ((Date.now() % REAL_MS_PER_DAY) / REAL_MS_PER_DAY) * DAY_MINUTES
}

/** How long ago an event happened, in town minutes, wrapping past midnight.
 *  The town does not stop at midnight, so neither does the log: at 00:20 you
 *  are still reading the back half of last night. */
function minutesAgo(at, now) {
  const delta = now - at
  return delta >= 0 ? delta : delta + DAY_MINUTES
}

/** The most recent events, oldest first, wrapping into the previous night. */
function recentEvents(now, count) {
  return [...DAY]
    .sort((a, b) => minutesAgo(b[0], now) - minutesAgo(a[0], now))
    .slice(-count)
}

/** Events that have happened since midnight, for the arrival line. */
function eventsSoFar(now) {
  return DAY.filter(([at]) => at <= now)
}

function renderEntry([at, who, what], isLatest) {
  const li = document.createElement('li')
  li.className = 'day-entry' + (isLatest ? ' is-latest' : '')
  li.innerHTML =
    `<time datetime="${stamp(at)}">${stamp(at)}</time>` +
    `<span class="day-entry-body"><b>${who}</b> ${what}.</span>`
  return li
}

let lastRenderedKey = ''
let lastCount = -1

function paint() {
  const now = townMinutes()
  const progress = now / DAY_MINUTES

  clockEl.textContent = stamp(now)
  markerTimeEl.textContent = stamp(now)
  fillEl.style.setProperty('--progress', `${progress * 100}%`)
  markerEl.style.setProperty('--progress', `${progress * 100}%`)

  const visible = recentEvents(now, MAX_VISIBLE)
  const key = String(visible[visible.length - 1][0])

  // Only touch the DOM when the set of entries actually changes.
  if (key !== lastRenderedKey || visible.length !== lastCount) {
    lastRenderedKey = key
    lastCount = visible.length
    logEl.replaceChildren(...visible.map((entry, i) => renderEntry(entry, i === visible.length - 1)))
  }
}

// The arrival line is the whole idea of the page, so it is written once, from
// the moment the page opened, and never updated.
const arrivedAt = townMinutes()
const alreadyHappened = eventsSoFar(arrivedAt).length
arrivalEl.textContent = alreadyHappened
  ? `You arrived at ${stamp(arrivedAt)}. ${alreadyHappened} ${alreadyHappened === 1 ? 'thing has' : 'things have'} already happened today.`
  : `You arrived at ${stamp(arrivedAt)}, before anyone was up.`

paint()

let frame = null
function loop() {
  paint()
  frame = requestAnimationFrame(loop)
}
function start() { if (frame === null) loop() }
function stop() { if (frame !== null) { cancelAnimationFrame(frame); frame = null } }

// No point burning frames on a hidden tab. The clock is read from wall time, so
// coming back jumps forward rather than resuming, which is the behaviour we want
// anyway.
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
if (!document.hidden) start()

if (reduceMotion.matches) document.body.classList.add('reduce-motion')
reduceMotion.addEventListener('change', e => document.body.classList.toggle('reduce-motion', e.matches))
