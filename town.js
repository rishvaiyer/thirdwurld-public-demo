/* The recorded day, shared by the landing hero and day.html.
 *
 * One dataset, one clock. The clock is derived from wall-clock time rather than
 * counted with a timer, which is the whole claim of the product expressed as an
 * implementation detail: you always arrive mid-day, and leaving the tab does not
 * pause anything.
 *
 * Plain global rather than a module so it can be shared by two ordinary
 * <script defer> pages without a build step. */

;(function (global) {
  const DAY_MINUTES = 1440
  const REAL_MS_PER_DAY = 24 * 60 * 1000 // one town day every 24 real minutes

  const RESIDENTS = [
    { id: 'marvin', name: 'Marvin' },
    { id: 'blueberry', name: 'Blueberry' },
    { id: 'juno', name: 'Juno' },
    { id: 'odile', name: 'Odile' },
  ]

  // at: minutes since midnight. who: resident ids. state: what they are doing
  // now, used for the landing chips. text: how the log reads it.
  const DAY = [
    { at: 45, who: ['odile'], place: 'Arrival Plaza', state: 'still awake', text: 'was still awake, which is unusual for her' },
    { at: 96, who: ['blueberry'], place: 'Garden Quarter', state: 'asleep', text: 'slept through the whole of it' },
    { at: 140, who: ['juno'], place: 'Waterfront Quarter', state: 'leaving a chair', text: 'left a chair facing the water' },
    { at: 221, who: ['marvin'], place: 'Commons', state: 'first up', text: 'was the first thing moving in the town' },
    { at: 288, who: ['odile'], place: 'Commons', state: 'walking back', text: 'passed the Commons on her way back' },
    { at: 355, who: ['marvin'], place: 'Corner Cup', state: 'opening up', text: 'unlocked the Corner Cup and put the water on' },
    { at: 372, who: ['blueberry'], place: 'Waterfront Quarter', state: 'watching the canal', text: 'watched the canal from the Waterfront Quarter' },
    { at: 401, who: ['juno'], place: 'Commons', state: 'walking', text: 'walked the Commons before anyone else was up' },
    { at: 418, who: ['marvin'], place: 'Corner Cup', state: 'serving', text: 'served the first cup of the day to nobody in particular' },
    { at: 447, who: ['blueberry'], place: 'Corner Cup', state: 'arriving', text: 'joined Marvin at the Corner Cup' },
    { at: 452, who: ['marvin', 'blueberry'], place: 'Corner Cup', state: 'talking', text: 'talked for eleven minutes' },
    { at: 470, who: ['juno'], place: 'Garden Quarter', state: 'writing', text: 'wrote in her diary about the quiet' },
    { at: 503, who: ['odile'], place: 'Arrival Plaza', state: 'arriving', text: 'arrived at Arrival Plaza and stood there a while' },
    { at: 529, who: ['blueberry'], place: 'Pollinator Garden', state: 'tending', text: 'tended the beds in the Pollinator Garden' },
    { at: 546, who: ['marvin'], place: 'Commons', state: 'playing radio', text: 'put the radio on in the Commons' },
    { at: 560, who: ['juno'], place: 'Commons', state: 'listening', text: 'stopped to listen' },
    { at: 588, who: ['odile', 'juno'], place: 'Commons', state: 'meeting', text: 'met for the first time' },
    { at: 601, who: ['odile'], place: 'Commons', state: 'noticing', text: 'noted that Juno keeps to the edges of a room' },
    { at: 634, who: ['marvin'], place: 'Corner Cup', state: 'closing up', text: 'closed the Corner Cup for the middle of the day' },
    { at: 662, who: ['blueberry'], place: 'Garden Quarter', state: 'alone', text: 'sat alone in the Garden Quarter' },
    { at: 690, who: ['juno'], place: 'Commons', state: 'posting a letter', text: 'posted a letter through Royal Mail' },
    { at: 727, who: ['odile'], place: 'Arrival Plaza', state: 'reading', text: 'read it twice' },
    { at: 755, who: ['marvin', 'odile'], place: 'Commons', state: 'disagreeing', text: 'disagreed about the radio' },
    { at: 769, who: ['marvin'], place: 'Corner Cup', state: 'quiet', text: 'went quiet for an hour' },
    { at: 812, who: ['blueberry'], place: 'Music Quarter', state: 'wandering', text: 'crossed the Music Quarter on the long way round' },
    { at: 848, who: ['juno', 'blueberry'], place: 'Music Quarter', state: 'playing cards', text: 'played a hand of cards' },
    { at: 871, who: ['blueberry'], place: 'Music Quarter', state: 'complaining', text: 'lost, and said so at length' },
    { at: 905, who: ['odile'], place: 'Night Market', state: 'lighting lanterns', text: 'lit the first lantern at the Night Market' },
    { at: 928, who: ['marvin'], place: 'Corner Cup', state: 'reopening', text: 'reopened the Corner Cup for the evening' },
    { at: 944, who: ['juno'], place: 'Corner Cup', state: 'returning a record', text: 'tracked down the record Marvin and Odile had argued about' },
    { at: 951, who: ['marvin'], place: 'Corner Cup', state: 'playing it', text: 'put it on straight away, loudly' },
    { at: 978, who: ['blueberry', 'odile'], place: 'Night Market', state: 'talking', text: 'talked at the Night Market until it emptied' },
    { at: 1015, who: ['juno'], place: 'Waterfront Quarter', state: 'walking home', text: 'walked home along the water' },
    { at: 1042, who: ['odile'], place: 'Arrival Plaza', state: 'writing', text: 'wrote down what Marvin said earlier' },
    { at: 1071, who: ['marvin'], place: 'Corner Cup', state: 'closing up', text: 'swept the Corner Cup and left the light on' },
    { at: 1108, who: ['blueberry'], place: 'Night Market', state: 'staying out', text: 'stayed out longer than she meant to' },
    { at: 1140, who: ['juno'], place: 'Garden Quarter', state: 'writing', text: 'wrote down what Marvin said when the record started' },
    { at: 1177, who: ['odile'], place: 'Arrival Plaza', state: 'last one through', text: 'was the last one through Arrival Plaza' },
    { at: 1215, who: ['blueberry'], place: 'Garden Quarter', state: 'quiet', text: 'went quiet' },
    { at: 1268, who: ['marvin'], place: 'Corner Cup', state: 'asleep', text: 'dreamt about the canal, apparently' },
    { at: 1310, who: ['juno'], place: 'Garden Quarter', state: 'asleep', text: 'woke once and went back to sleep' },
  ].sort((a, b) => a.at - b.at)

  const nameOf = id => (RESIDENTS.find(r => r.id === id) || {}).name || id

  const pad = n => String(n).padStart(2, '0')
  const stamp = minutes => `${pad(Math.floor(minutes / 60) % 24)}:${pad(Math.floor(minutes) % 60)}`

  /** Who the event is about, as it should read in a sentence. */
  const actors = event => event.who.map(nameOf).join(' and ')

  /** Town minutes since midnight, read straight off the wall clock. */
  const townMinutes = () => ((Date.now() % REAL_MS_PER_DAY) / REAL_MS_PER_DAY) * DAY_MINUTES

  /** How long ago an event happened, wrapping past midnight. The town does not
   *  stop at midnight, so at 00:20 you are still reading last night. */
  function minutesAgo(at, now) {
    const delta = now - at
    return delta >= 0 ? delta : delta + DAY_MINUTES
  }

  /** The most recent events, oldest first, wrapping into the previous night. */
  function recentEvents(now, count) {
    return [...DAY]
      .sort((a, b) => minutesAgo(b.at, now) - minutesAgo(a.at, now))
      .slice(-count)
  }

  /** Where each resident is and what they are doing, right now. */
  function residentStatus(now) {
    return RESIDENTS.map(resident => {
      const last = [...DAY]
        .filter(event => event.who.includes(resident.id))
        .sort((a, b) => minutesAgo(a.at, now) - minutesAgo(b.at, now))[0]
      return {
        ...resident,
        place: last.place,
        state: last.state,
        at: last.at,
        text: `${actors(last)} ${last.text}.`,
        asleep: last.state === 'asleep',
      }
    })
  }

  /** Events since midnight, for the arrival line on day.html. */
  const eventsSoFar = now => DAY.filter(event => event.at <= now)

  global.THIRDWURLD_TOWN = {
    DAY_MINUTES, REAL_MS_PER_DAY, RESIDENTS, DAY,
    stamp, actors, townMinutes, minutesAgo, recentEvents, residentStatus, eventsSoFar,
  }
})(window)
