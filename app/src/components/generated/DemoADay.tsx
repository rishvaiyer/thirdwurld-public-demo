import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  thirdwurld public demo, "A day in the town". Timeline and copy     */
/*  taken from day.html and town.js, with the replay wired up.         */
/* ------------------------------------------------------------------ */
const nightMarket = "../assets/game/night-market-real.jpg";
const CAST = [{
  id: 'marvin',
  name: 'Marvin',
  tone: '#d8a85f'
}, {
  id: 'blueberry',
  name: 'Blueberry',
  tone: '#91bd8b'
}, {
  id: 'juno',
  name: 'Juno',
  tone: '#e2a094'
}, {
  id: 'odile',
  name: 'Odile',
  tone: '#9fb6d8'
}];
type Event = {
  at: number;
  who: string[];
  place: string;
  state: string;
  text: string;
};
const DAY: Event[] = [{
  at: 45,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'still awake',
  text: 'was still awake, which is unusual for her'
}, {
  at: 96,
  who: ['blueberry'],
  place: 'Garden Quarter',
  state: 'asleep',
  text: 'slept through the whole of it'
}, {
  at: 140,
  who: ['juno'],
  place: 'Waterfront Quarter',
  state: 'leaving a chair',
  text: 'left a chair facing the water'
}, {
  at: 221,
  who: ['marvin'],
  place: 'Commons',
  state: 'first up',
  text: 'was the first thing moving in the town'
}, {
  at: 288,
  who: ['odile'],
  place: 'Commons',
  state: 'walking back',
  text: 'passed the Commons on her way back'
}, {
  at: 355,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'opening up',
  text: 'unlocked the Corner Cup and put the water on'
}, {
  at: 372,
  who: ['blueberry'],
  place: 'Waterfront Quarter',
  state: 'watching the canal',
  text: 'watched the canal from the Waterfront Quarter'
}, {
  at: 401,
  who: ['juno'],
  place: 'Commons',
  state: 'walking',
  text: 'walked the Commons before anyone else was up'
}, {
  at: 418,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'serving',
  text: 'served the first cup of the day to nobody in particular'
}, {
  at: 447,
  who: ['blueberry'],
  place: 'Corner Cup',
  state: 'arriving',
  text: 'joined Marvin at the Corner Cup'
}, {
  at: 452,
  who: ['marvin', 'blueberry'],
  place: 'Corner Cup',
  state: 'talking',
  text: 'talked for eleven minutes'
}, {
  at: 470,
  who: ['juno'],
  place: 'Garden Quarter',
  state: 'writing',
  text: 'wrote in her diary about the quiet'
}, {
  at: 503,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'arriving',
  text: 'arrived at Arrival Plaza and stood there a while'
}, {
  at: 529,
  who: ['blueberry'],
  place: 'Pollinator Garden',
  state: 'tending',
  text: 'tended the beds in the Pollinator Garden'
}, {
  at: 546,
  who: ['marvin'],
  place: 'Commons',
  state: 'playing radio',
  text: 'put the radio on in the Commons'
}, {
  at: 560,
  who: ['juno'],
  place: 'Commons',
  state: 'listening',
  text: 'stopped to listen'
}, {
  at: 588,
  who: ['odile', 'juno'],
  place: 'Commons',
  state: 'meeting',
  text: 'met for the first time'
}, {
  at: 601,
  who: ['odile'],
  place: 'Commons',
  state: 'noticing',
  text: 'noted that Juno keeps to the edges of a room'
}, {
  at: 634,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'closing up',
  text: 'closed the Corner Cup for the middle of the day'
}, {
  at: 662,
  who: ['blueberry'],
  place: 'Garden Quarter',
  state: 'alone',
  text: 'sat alone in the Garden Quarter'
}, {
  at: 690,
  who: ['juno'],
  place: 'Commons',
  state: 'posting a letter',
  text: 'posted a letter through Royal Mail'
}, {
  at: 727,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'reading',
  text: 'read it twice'
}, {
  at: 755,
  who: ['marvin', 'odile'],
  place: 'Commons',
  state: 'disagreeing',
  text: 'disagreed about the radio'
}, {
  at: 769,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'quiet',
  text: 'went quiet for an hour'
}, {
  at: 812,
  who: ['blueberry'],
  place: 'Music Quarter',
  state: 'wandering',
  text: 'crossed the Music Quarter on the long way round'
}, {
  at: 848,
  who: ['juno', 'blueberry'],
  place: 'Music Quarter',
  state: 'playing cards',
  text: 'played a hand of cards'
}, {
  at: 871,
  who: ['blueberry'],
  place: 'Music Quarter',
  state: 'complaining',
  text: 'lost, and said so at length'
}, {
  at: 905,
  who: ['odile'],
  place: 'Night Market',
  state: 'lighting lanterns',
  text: 'lit the first lantern at the Night Market'
}, {
  at: 928,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'reopening',
  text: 'reopened the Corner Cup for the evening'
}, {
  at: 944,
  who: ['juno'],
  place: 'Corner Cup',
  state: 'returning a record',
  text: 'tracked down the record Marvin and Odile had argued about'
}, {
  at: 951,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'playing it',
  text: 'put it on straight away, loudly'
}, {
  at: 978,
  who: ['blueberry', 'odile'],
  place: 'Night Market',
  state: 'talking',
  text: 'talked at the Night Market until it emptied'
}, {
  at: 1015,
  who: ['juno'],
  place: 'Waterfront Quarter',
  state: 'walking home',
  text: 'walked home along the water'
}, {
  at: 1042,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'writing',
  text: 'wrote down what Marvin said earlier'
}, {
  at: 1071,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'closing up',
  text: 'swept the Corner Cup and left the light on'
}, {
  at: 1108,
  who: ['blueberry'],
  place: 'Night Market',
  state: 'staying out',
  text: 'stayed out longer than she meant to'
}, {
  at: 1140,
  who: ['juno'],
  place: 'Garden Quarter',
  state: 'writing',
  text: 'wrote down what Marvin said when the record started'
}, {
  at: 1177,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'last one through',
  text: 'was the last one through Arrival Plaza'
}, {
  at: 1215,
  who: ['blueberry'],
  place: 'Garden Quarter',
  state: 'quiet',
  text: 'went quiet'
}, {
  at: 1268,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'asleep',
  text: 'dreamt about the canal, apparently'
}, {
  at: 1310,
  who: ['juno'],
  place: 'Garden Quarter',
  state: 'asleep',
  text: 'woke once and went back to sleep'
}];
// The loop the timeline above is a recording of. It used to sit on the world
// page's technology section, twice over, where it was explaining continuity to
// people who had not yet seen any. Here it sits under a day of real entries,
// which is the thing it describes.
const BEATS: [string, string, string, string][] = [['01', 'World record', 'A place, a person, or a meaningful change is recorded by the world, not invented by a resident.', 'Does not claim: fabricated history, or unrestricted action.'], ['02', 'Resident context', 'Identity, mood, relationships and memory are assembled for whoever is about to act.', 'Why it matters: memories shape friendship, rivalry, and what someone does next.'], ['03', 'Bounded choice', 'The resident chooses where to go, who to approach, and what to use, inside their permissions.', 'Why it matters: the world offers more than conversation to choose from.'], ['04', 'Durable trace', 'Diaries, relationship signals, mail and world events make the next moment more than a reset.', 'Why it matters: resident life continues after visitors leave.']];
const DAY_MINUTES = 1440;
const REAL_MS_PER_DAY = 24 * 60 * 1000;
const clock = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(Math.floor(m) % 60).padStart(2, '0')}`;
const person = (id: string) => CAST.find(c => c.id === id) ?? {
  id,
  name: id,
  tone: '#b7b3a8'
};
const names = (ids: string[]) => ids.map(i => person(i).name).join(' and ');
export const DemoADay: React.FC = () => {
  const [live, setLive] = useState(true);
  const [manual, setManual] = useState(0);
  const [only, setOnly] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now() % REAL_MS_PER_DAY / REAL_MS_PER_DAY * DAY_MINUTES);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(Date.now() % REAL_MS_PER_DAY / REAL_MS_PER_DAY * DAY_MINUTES), 1000);
    return () => clearInterval(id);
  }, [live]);
  const minute = live ? now : manual;
  const shown = useMemo(() => {
    const upto = DAY.filter(e => e.at <= minute);
    return (only ? upto.filter(e => e.who.includes(only)) : upto).slice().reverse();
  }, [minute, only]);
  const next = useMemo(() => DAY.find(e => e.at > minute), [minute]);
  const roster = useMemo(() => CAST.map(c => {
    const last = [...DAY].filter(e => e.at <= minute && e.who.includes(c.id)).pop();
    return {
      ...c,
      place: last?.place ?? 'not yet today',
      state: last?.state ?? 'waiting'
    };
  }), [minute]);
  const scrub = useCallback((v: number) => {
    setLive(false);
    setManual(v);
  }, []);
  const pct = minute / DAY_MINUTES * 100;
  return <div className="tw min-h-screen w-full bg-[#0b1411] text-[#f1eadb] antialiased">
      <div className="tw-grain pointer-events-none fixed inset-0 z-0" />
      <div className="tw-vignette pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* ---------------------------- header --------------------------- */}
        <header className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <a href="#top" className="group flex items-baseline gap-2">
              <span className="tw-serif text-[20px]">thirdwurld</span>
              <span className="text-[13px] text-[#d8a85f] transition-transform duration-700 group-hover:rotate-180">°</span>
              <small className="tw-mono ml-2 hidden rounded-[3px] border border-[color:var(--tw-line)] px-2 py-0.5 text-[9.5px] tracking-[0.14em] text-[#b7b3a8] sm:inline">
                RECORDED DAY / REPLAYING
              </small>
            </a>
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <a href="../world/#world" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                World
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#residents" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Residents
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#places" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Places
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#gallery" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Gallery
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../day/" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#f1eadb] transition-colors duration-300">
                A Day
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#technology" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Codescape
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#costs" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Costs
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#status" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Status
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#preview" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Preview
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../research/" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Research
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Demo
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
            </nav>
          </div>
        </header>

        {/* ----------------------------- hero ---------------------------- */}
        <section id="top" className="relative w-full overflow-hidden border-b border-[color:var(--tw-line)]">
          <img src={nightMarket} alt="The Night Market inside thirdwurld." className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1411]/75 to-[#0b1411]" />

          <div className="relative mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="tw-in flex flex-wrap items-center gap-3">
              <span className="tw-eyebrow">Town time</span>
              <span className="tw-mono text-[15px] text-[#f5d79d]">{clock(minute)}</span>
              <span className={`tw-mono flex items-center gap-2 rounded-full border px-3 py-1 text-[9.5px] uppercase tracking-[0.12em] ${live ? 'border-[#91bd8b]/40 text-[#91bd8b]' : 'border-[color:var(--tw-line)] text-[#7f8a81]'}`}>
                <span className={live ? 'tw-breathe h-1.5 w-1.5 rounded-full bg-[#91bd8b]' : 'h-1.5 w-1.5 rounded-full bg-[#7f8a81]'} />
                {live ? 'replaying' : 'scrubbing'}
              </span>
            </div>

            <h1 className="tw-in mt-6 max-w-[16ch] text-[clamp(2.75rem,5.2vw,4rem)] leading-[1.02]" style={{
            animationDelay: '80ms'
          }}>
              The day started without you.
            </h1>

            <p className="tw-in mt-6 max-w-[62ch] text-[clamp(1.05rem,1vw+.8rem,1.18rem)] leading-[1.7] text-[#d9d2c4]" style={{
            animationDelay: '140ms'
          }}>
              Residents keep their own hours. They move between places, fall into conversation, write things down, and spend part of the day alone. None of it waits for a visitor.
            </p>

            <div className="tw-in mt-8 rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/50 p-5 sm:p-6" style={{
            animationDelay: '200ms'
          }}>
              <h2 className="text-[19px]">How this works.</h2>
              <p className="mt-2.5 max-w-[62ch] text-[14.5px] leading-relaxed text-[#b7b3a8]">
                A full day passes every 24 minutes. You arrive wherever the town happens to be, and leaving the tab does not pause it.
              </p>
            </div>

            {/* roster */}
            <div className="tw-in mt-6 grid grid-cols-2 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-4" style={{
            animationDelay: '260ms'
          }}>
              {roster.map(r => <button key={r.id} onClick={() => setOnly(only === r.id ? null : r.id)} aria-pressed={only === r.id} className={`bg-[#0b1411] p-4 text-left transition-colors duration-300 hover:bg-[#12201b] ${only === r.id ? 'bg-[#12201b]' : ''}`}>
                
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{
                  background: r.tone
                }} />
                    <span className="tw-serif text-[18px]">{r.name}</span>
                  </span>
                  <span className="mt-1.5 block text-[12.5px] text-[#d9d2c4]">{r.place}</span>
                  <span className="tw-mono mt-0.5 block text-[9.5px] uppercase tracking-[0.1em] text-[#7f8a81]">{r.state}</span>
                </button>)}
            </div>
            <p className="tw-mono mt-2.5 text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
              {only ? `filtered to ${person(only).name} · tap again to clear` : 'tap a resident to follow only them'}
            </p>
          </div>
        </section>

        {/* --------------------------- timeline -------------------------- */}
        <section className="w-full flex-1">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="tw-eyebrow">Recorded events, in order</span>
                <p className="tw-mono mt-2 text-[26px] text-[#f1eadb]">{clock(minute)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setLive(v => !v)} className="tw-mono rounded-[4px] border border-[color:var(--tw-line)] px-4 py-2 text-[10.5px] uppercase tracking-[0.12em] text-[#b7b3a8] transition-colors hover:border-[#f5d79d] hover:text-[#f5d79d]">
                  
                  {live ? 'Pause replay' : 'Resume replay'}
                </button>
                <button onClick={() => scrub(0)} className="tw-mono rounded-[4px] border border-[color:var(--tw-line)] px-4 py-2 text-[10.5px] uppercase tracking-[0.12em] text-[#b7b3a8] transition-colors hover:border-[#f5d79d] hover:text-[#f5d79d]">
                  
                  Back to 00:00
                </button>
              </div>
            </div>

            {/* scrubber */}
            <div className="mt-6">
              <input type="range" min={0} max={DAY_MINUTES} value={Math.floor(minute)} onChange={e => scrub(Number(e.target.value))} aria-label="Scrub through the recorded day" className="tw-range w-full" style={{
              '--pct': `${pct}%`
            } as React.CSSProperties} />
              
              <div className="tw-mono mt-2 flex justify-between text-[10px] text-[#7f8a81]">
                {['00', '06', '12', '18', '24'].map(h => <span key={h}>{h}</span>)}
              </div>
            </div>

            {/* events */}
            <div ref={listRef} className="mt-9 border-t border-[color:var(--tw-line)]">
              {shown.map(e => <article key={`${e.at}-${e.who.join('-')}`} className="tw-fade grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-[color:var(--tw-line)] py-4 sm:gap-x-8">
                  <span className="tw-mono text-[11px] tracking-[0.08em] text-[#7f8a81]">{clock(e.at)}</span>
                  <span>
                    <span className="text-[15.5px] leading-[1.6] text-[#d9d2c4]">
                      {e.who.map((id, i) => <React.Fragment key={id}>
                          {i > 0 && <span className="text-[#7f8a81]"> and </span>}
                          <span className="tw-serif text-[18px]" style={{
                      color: person(id).tone
                    }}>
                            {person(id).name}
                          </span>
                        </React.Fragment>)}{' '}
                      {e.text}.
                    </span>
                    <span className="tw-mono mt-1.5 block text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">
                      {e.place} · {e.state}
                    </span>
                  </span>
                </article>)}

              {shown.length === 0 && <p className="tw-mono py-14 text-center text-[11px] uppercase tracking-[0.14em] text-[#7f8a81]">
                  nothing recorded yet at this hour
                </p>}
            </div>

            <p className="tw-mono mt-6 flex items-center gap-2.5 text-[11px] text-[#7f8a81]">
              <span className="tw-star text-[#d8a85f]">✦</span>
              {next ? `Waiting for the next thing to happen, around ${clock(next.at)}.` : 'The day has run out. It begins again shortly.'}
            </p>

            <p className="mt-8 max-w-[70ch] border-t border-[color:var(--tw-line)] pt-6 text-[14.5px] leading-[1.7] text-[#b7b3a8]">
              Every entry above is something the world records: a place, a person, a change worth carrying forward. It is the same material a resident draws on when deciding what to do next.
            </p>

            {/* What the timeline above is actually doing, in four beats. */}
            <div className="mt-12">
              <span className="tw-eyebrow">From one entry to the next</span>
              <h2 className="mt-4 max-w-[20ch] text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08]">How a moment becomes the reason for the next one.</h2>
              <div className="mt-7 grid grid-cols-1 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-2 lg:grid-cols-4">
                {BEATS.map(([n, t, b, f]) => <article key={n} className="bg-[#0b1411] p-5">
                    <b className="tw-mono text-[10px] tracking-[0.14em] text-[#d8a85f]">{n}</b>
                    <h3 className="mt-2 text-[17px] leading-snug">{t}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#b7b3a8]">{b}</p>
                    <p className="tw-mono mt-4 border-t border-[color:var(--tw-line)] pt-3 text-[9.5px] leading-[1.6] text-[#7f8a81]">{f}</p>
                  </article>)}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {[['See the codebase ↗', '../world/#technology'], ['Meet the residents ↗', '../world/#residents'], ['Try one resident ↗', '../try/']].map(([l, href]) => <a key={l} href={href} target="_blank" rel="noopener" className="text-[14.5px] text-[#d9d2c4] transition-colors duration-300 hover:text-[#f5d79d]">
                  {l}
                </a>)}
            </div>
          </div>
        </section>

        {/* ---------------------------- footer --------------------------- */}
        <footer className="w-full border-t border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="flex items-baseline gap-1.5">
              <span className="tw-serif text-[17px]">thirdwurld</span>
              <span className="text-[12px] text-[#d8a85f]">°</span>
            </span>
            <span className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">A recorded day · not a live feed</span>
            <a href="../world/#status" target="_blank" rel="noopener" className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f5d79d]">
              Current status ↗
            </a>
          </div>
        </footer>
      </div>
    </div>;
};
export default DemoADay;