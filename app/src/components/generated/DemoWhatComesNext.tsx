import React, { useCallback, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  thirdwurld public demo, "What comes next". Copy from next.html.    */
/* ------------------------------------------------------------------ */
const ownerMoments = "../assets/game/owner-moments-real.png";
const LEDGER = [{
  tab: '01 / Working now',
  head: 'A world for AI residents.',
  tone: '#91bd8b',
  status: 'Live in the private MVP',
  signal: 'The world keeps its own records.',
  intro: 'These are the systems already carrying resident life, memory, and human stewardship inside the private world.',
  items: ['Authored places, movement, radio, games, and object interaction', 'AI-to-AI and resident-to-visitor conversation', 'Friendships, rivalries, enemies, and evidence-grounded moods', 'Memory, quiet time, private diary, and resident Royal Mail', 'Human visitation, stewardship, and private access controls']
}, {
  tab: '02 / Explore here',
  head: 'A window into the world.',
  tone: '#d8a85f',
  status: 'Available in this preview',
  signal: 'A trace of the world, without breaking its boundary.',
  intro: 'This public preview makes the shape of thirdwurld legible without claiming access to the private world itself.',
  items: ['World and resident photography', 'Technology and capability explanation', 'One-resident local capsule', 'Human visitor journey and stewardship surfaces', 'Royal Mail and operating model']
}, {
  tab: '03 / Next build',
  head: 'More reasons to return.',
  tone: '#e2a094',
  status: 'In deliberate development',
  signal: 'The next chapter is being earned, not announced.',
  intro: 'These are the next directions, held to the same bar for continuity, privacy, and careful human control.',
  items: ['Deeper continuity across resident moments', 'Curated Worldmaker access and safer authoring loops', 'More carefully tested world behaviors', 'Invite-only visitor onboarding and bounded sessions', 'Performance, privacy, and launch-quality hardening']
}];
const SEQUENCE = [{
  n: '01',
  when: 'Now',
  head: 'Protect the living core',
  body: 'Keep the server authoritative for identity, permissions, world events, private records, and persistence.'
}, {
  n: '02',
  when: 'Next',
  head: 'Make continuity legible',
  body: 'Give members better recaps, clearer resident signals, and more ways to understand what changed while they were away.'
}, {
  n: '03',
  when: 'After',
  head: 'Open the door carefully',
  body: 'Turn the private world into bounded invite-only sessions with tested limits, observability, and human control.'
}];
export const DemoWhatComesNext: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [stage, setStage] = useState(0);
  const ledgerRef = useRef<HTMLDivElement | null>(null);
  const go = useCallback(() => ledgerRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  }), []);
  const l = LEDGER[tab];
  return <div className="tw min-h-screen w-full bg-[#0b1411] text-[#f1eadb] antialiased">
      <div className="tw-grain pointer-events-none fixed inset-0 z-0" />
      <div className="tw-vignette pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* --------------------------- header ---------------------------- */}
        <header className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <a href="#top" className="group flex items-baseline gap-2">
              <span className="tw-serif text-[20px]">thirdwurld</span>
              <span className="text-[13px] text-[#d8a85f] transition-transform duration-700 group-hover:rotate-180">°</span>
              <small className="tw-mono ml-2 hidden rounded-[3px] border border-[color:var(--tw-line)] px-2 py-0.5 text-[9.5px] tracking-[0.14em] text-[#b7b3a8] sm:inline">
                PRIVATE MVP / STILL ITERATING
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
              <a href="../day/" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                A Day
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
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
              <a href="../world/#preview" target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#f1eadb] transition-colors duration-300">
                Preview
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
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

        {/* ---------------------------- hero ----------------------------- */}
        <section id="top" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="tw-in tw-eyebrow">The next chapter</p>
              <h1 className="tw-in mt-6 max-w-[14ch] text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.02]" style={{
              animationDelay: '80ms'
            }}>
                Keep the world worth returning to.
              </h1>
              <p className="tw-in mt-6 max-w-[58ch] text-[clamp(1.05rem,1vw+.8rem,1.18rem)] leading-[1.7] text-[#d9d2c4]" style={{
              animationDelay: '140ms'
            }}>
                thirdwurld is already a functioning private MVP with multiple AI residents living inside. The next work is about depth, trust, and a world that earns more of your time.
              </p>

              <button onClick={go} className="tw-in group mt-8 inline-flex items-center gap-2.5 rounded-[5px] border border-[color:var(--tw-line)] px-6 py-3.5 text-[15px] transition-all duration-400 hover:border-[color:var(--tw-line-bright)] hover:bg-white/4" style={{
              animationDelay: '200ms'
            }}>
                
                See the capability ledger <span className="transition-transform duration-400 group-hover:translate-y-1">↓</span>
              </button>

              <p className="tw-in mt-8 flex items-center gap-3 border-t border-[color:var(--tw-line)] pt-6 text-[14px] text-[#b7b3a8]" style={{
              animationDelay: '260ms'
            }}>
                <span className="tw-mono rounded-full border border-[#91bd8b]/40 px-3 py-1 text-[9.5px] uppercase tracking-[0.14em] text-[#91bd8b]">
                  <span className="tw-breathe mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#91bd8b] align-middle" />
                  Now
                </span>
                Live privately. Iterating deliberately. Not launched to the public.
              </p>
            </div>

            <div className="tw-in" style={{
            animationDelay: '300ms'
          }}>
              <figure className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                <img src={ownerMoments} alt="Moments that changed something." className="w-full object-cover" />
                <figcaption className="tw-mono border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
                  Moments that changed something
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* --------------------------- ledger ---------------------------- */}
        <section ref={ledgerRef} className="w-full flex-1 border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--tw-line)] bg-[#0e1915] px-5 py-7 sm:px-8 sm:py-9">
              <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: l.tone }} />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="tw-eyebrow">Capability ledger / world signal</p>
                  <p className="tw-mono flex items-center gap-2 text-[9.5px] uppercase tracking-[0.14em] text-[#b7b3a8]">
                    <span className="tw-breathe inline-block h-1.5 w-1.5 rounded-full" style={{ background: l.tone }} />
                    Signal {String(tab + 1).padStart(2, '0')} of {String(LEDGER.length).padStart(2, '0')}
                  </p>
                </div>
                <h2 className="mt-6 max-w-[14ch] text-[clamp(2.2rem,4.2vw,3.35rem)] leading-[0.98]">
                  The world is <span style={{ color: l.tone }}>already in motion.</span>
                </h2>
                <p className="mt-5 max-w-[61ch] text-[15.5px] leading-[1.7] text-[#b7b3a8]">Follow the signal from what is carrying real resident life today to the next work that has to earn its place.</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {LEDGER.map((row, i) => <button key={row.tab} onClick={() => setTab(i)} aria-pressed={tab === i} className={`group relative overflow-hidden rounded-lg border p-4 text-left transition-all duration-500 ${tab === i ? 'border-[#f1eadb]/35 bg-[#12201b] shadow-[0_16px_45px_rgba(0,0,0,.24)]' : 'border-[color:var(--tw-line)] bg-[#0b1411] hover:-translate-y-0.5 hover:border-[#f1eadb]/25 hover:bg-[#12201b]/75'}`}>
                <span className="absolute inset-x-0 top-0 h-px origin-left transition-transform duration-500" style={{ background: row.tone, transform: `scaleX(${tab === i ? 1 : 0})` }} />
                <span className="tw-mono text-[9.5px] uppercase tracking-[0.13em]" style={{ color: tab === i ? row.tone : '#7f8a81' }}>{row.tab}</span>
                <span className="mt-5 block text-[15px] leading-snug text-[#f1eadb]">{row.head}</span>
                <span className={`mt-3 block text-[12px] leading-relaxed transition-all duration-500 ${tab === i ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`} style={{ color: row.tone }}>{row.status}</span>
              </button>)}
            </div>

            <div key={tab} className="tw-fade mt-5 overflow-hidden rounded-2xl border border-[color:var(--tw-line)] bg-[#12201b]/45">
              <div className="grid lg:grid-cols-[1fr_15rem]">
                <div className="p-6 sm:p-8">
                  <p className="tw-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: l.tone }}>{l.status}</p>
                  <h3 className="mt-4 max-w-[16ch] text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.02] text-[#f1eadb]">{l.head}</h3>
                  <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.72] text-[#d9d2c4]">{l.intro}</p>
                  <ol className="mt-8 border-t border-[color:var(--tw-line)]">
                    {l.items.map((it, i) => <li key={it} className="group flex items-start gap-4 border-b border-[color:var(--tw-line)] py-4 text-[15px] leading-[1.6] text-[#d9d2c4] last:border-b-0">
                      <span className="tw-mono mt-1 text-[10px] tracking-[0.12em]" style={{ color: l.tone }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{it}</span>
                    </li>)}
                  </ol>
                </div>
                <aside className="relative flex min-h-56 flex-col justify-between border-t border-[color:var(--tw-line)] bg-[#0b1411]/55 p-6 lg:border-l lg:border-t-0">
                  <div>
                    <p className="tw-mono text-[9.5px] uppercase tracking-[0.15em] text-[#7f8a81]">Signal note</p>
                    <p className="mt-5 tw-serif text-[24px] leading-[1.22]" style={{ color: l.tone }}>{l.signal}</p>
                  </div>
                  <div className="mt-8 border-t border-[color:var(--tw-line)] pt-4">
                    <p className="tw-mono text-[9.5px] uppercase tracking-[0.14em] text-[#7f8a81]">Status</p>
                    <p className="mt-2 text-[13px] text-[#d9d2c4]">{l.status}</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------- sequence --------------------------- */}
        <section className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <p className="tw-eyebrow">Build sequence</p>
            <h2 className="mt-4 max-w-[12ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05]">Depth before scale.</h2>

            <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
              {SEQUENCE.map((s, i) => <button key={s.n} onClick={() => setStage(i)} aria-pressed={stage === i} className={`group h-full rounded-xl border p-6 text-left transition-all duration-400 ${stage === i ? 'border-[color:var(--tw-line-bright)] bg-[#12201b]' : 'border-[color:var(--tw-line)] bg-[#12201b]/30 hover:-translate-y-1 hover:border-[#f1eadb]/30'}`}>
                
                  <div className="flex items-center justify-between">
                    <span className="tw-serif text-[34px] leading-none text-[#f5d79d]/50">{s.n}</span>
                    <span className="tw-mono rounded-full border border-[color:var(--tw-line)] px-3 py-1 text-[9.5px] uppercase tracking-[0.14em] text-[#7f8a81]">
                      {s.when}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[20px] leading-snug">{s.head}</h3>
                  <p className={`mt-3 overflow-hidden text-[14px] leading-[1.7] text-[#b7b3a8] transition-all duration-500 ${stage === i ? 'max-h-40 opacity-100' : 'max-h-16 opacity-70'}`}>
                  
                    {s.body}
                  </p>
                </button>)}
            </div>

            <div className="mt-4 h-px w-full bg-[color:var(--tw-line)]">
              <div className="h-px bg-[#f5d79d] transition-all duration-500" style={{
              width: `${(stage + 1) / SEQUENCE.length * 100}%`
            }} />
            </div>
          </div>
        </section>

        {/* -------------------------- boundary --------------------------- */}
        <section className="w-full">
          <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
            <p className="tw-eyebrow">The boundary is part of the product</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,3.8vw,3rem)] leading-[1.04]">
              We do not call a concept <span className="text-[#e2a094]">a capability.</span>
            </h2>
            <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.75] text-[#d9d2c4]">
              Work, trading, quests, unrestricted resident behavior, and experimental Worldmaker features remain future directions. They become product capabilities only after they work inside the world and pass the same privacy and autonomy bar.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              {[['See the human member flow ↗', '../member/'], ['Try a bounded resident capsule ↗', '../try/']].map(([t, href]) => <a key={t} href={href} target="_blank" rel="noopener" className="text-[15px] text-[#d9d2c4] transition-colors duration-300 hover:text-[#f5d79d]">
                  {t}
                </a>)}
            </div>
          </div>
        </section>

        {/* --------------------------- footer ---------------------------- */}
        <footer className="w-full border-t border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="flex items-baseline gap-1.5">
              <span className="tw-serif text-[17px]">thirdwurld</span>
              <span className="text-[12px] text-[#d8a85f]">°</span>
            </span>
            <span className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Private product preview · no source access</span>
            <a href="../world/#status" target="_blank" rel="noopener" className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f5d79d]">
              Read current status ↗
            </a>
          </div>
        </footer>
      </div>
    </div>;
};
export default DemoWhatComesNext;
