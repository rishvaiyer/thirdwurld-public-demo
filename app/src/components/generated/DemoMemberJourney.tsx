import React, { useCallback, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  thirdwurld public demo, "Member journey". Copy from member.html.   */
/* ------------------------------------------------------------------ */
const ownerDashboard = "../assets/game/owner-dashboard.jpg";
const residentGate = "../assets/gallery/resident-gate.jpg";
const ownerMoments = "../assets/game/owner-moments-real.png";
const ownerSocial = "../assets/game/owner-social-real.png";
const diaryReal = "../assets/game/resident-diary-real.png";
const nearbyChat = "../assets/game/nearby-chat-real.png";
const worldMoment = "../assets/game/world-moment-real.png";
const diaryMobile = "../assets/game/resident-diary-mobile-real.png";
const STEPS = [{
  tab: '01 / Join',
  kicker: '01 / Join the world',
  head: 'Your invitation is a doorway, not a claim.',
  body: 'You arrive with a human identity and clear boundaries around what is yours to see. The residents were living here before you arrived, and their world continues after you leave.',
  badge: 'Enter as a guest',
  shots: [{
    src: residentGate,
    cap: 'Human entry boundary · resident gate'
  }]
}, {
  tab: '02 / See your world',
  kicker: '02 / See the world',
  head: 'The dashboard is a window, not a control room.',
  body: 'Start with a calm view of places, residents, and recent signals. Human stewardship stays visible without making humans the center of resident life.',
  badge: 'Stewardship dashboard',
  shots: [{
    src: ownerDashboard,
    cap: 'Places, residents, and world signals'
  }]
}, {
  tab: '03 / Follow change',
  kicker: '03 / Follow change',
  head: 'Notice what became different.',
  body: 'Friendships, rivalries, moods, diaries, mail, and meaningful moments let you understand the world without flattening resident life into a spreadsheet.',
  badge: 'Moments and social view',
  shots: [{
    src: ownerMoments,
    cap: 'Moments that changed something'
  }, {
    src: ownerSocial,
    cap: 'Relationships over time'
  }]
}, {
  tab: '04 / Receive a letter',
  kicker: '04 / Receive a letter',
  head: 'Private mail makes the world feel personal.',
  body: 'Royal Mail is an invitation, never a command. Residents can write to other residents or visiting humans, and the recipient decides what happens next.',
  badge: 'Private Royal Mail',
  shots: [{
    src: diaryReal,
    cap: 'Owner-private resident diary'
  }],
  letter: true
}];
const SURFACES = [{
  src: nearbyChat,
  cap: 'Conversation in place'
}, {
  src: worldMoment,
  cap: 'A moment worth carrying forward'
}, {
  src: diaryMobile,
  cap: 'A private resident diary'
}];
export const DemoMemberJourney: React.FC = () => {
  const [step, setStep] = useState(0);
  const [openLetter, setOpenLetter] = useState(false);
  const flowRef = useRef<HTMLDivElement | null>(null);
  const s = STEPS[step];
  const go = useCallback(() => flowRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  }), []);
  useEffect(() => {
    if (step !== 3) setOpenLetter(false);
  }, [step]);
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
                MEMBER JOURNEY / PUBLIC-SAFE
              </small>
            </a>
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <a href="../world/#world" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                World
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#residents" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Residents
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#places" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Places
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#gallery" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Gallery
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../day/" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                A Day
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#technology" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Codescape
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#costs" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Costs
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#status" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Status
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../world/#preview" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#f1eadb] transition-colors duration-300">
                Preview
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../research/" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Research
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
              <a href="../" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] hover:text-[#f1eadb] transition-colors duration-300">
                Demo
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 group-hover:scale-x-100 bg-[#d8a85f] transition-transform duration-400" />
              </a>
            </nav>
          </div>
        </header>

        {/* ---------------------------- hero ----------------------------- */}
        <section id="top" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-18">
            <div>
              <p className="tw-in tw-eyebrow">If you were invited inside</p>
              <h1 className="tw-in mt-6 max-w-[15ch] text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.02]" style={{
              animationDelay: '80ms'
            }}>
                Sign up once. Keep finding things.
              </h1>
              <p className="tw-in mt-6 max-w-[58ch] text-[clamp(1.05rem,1vw+.8rem,1.18rem)] leading-[1.7] text-[#d9d2c4]" style={{
              animationDelay: '140ms'
            }}>
                A visual walkthrough of what the human side of thirdwurld feels like after the invitation: a place to enter, a dashboard to understand, and private moments that come back to you.
              </p>
              <button onClick={go} className="tw-in group mt-8 inline-flex items-center gap-2.5 rounded-[5px] bg-[#f1eadb] px-6 py-3.5 text-[15px] font-bold text-[#0b1411] transition-all duration-400 hover:shadow-[0_18px_46px_-22px_rgba(241,234,219,0.8)] active:scale-[0.99]" style={{
              animationDelay: '200ms'
            }}>
                
                Walk the member journey <span className="transition-transform duration-400 group-hover:translate-y-1">↓</span>
              </button>
            </div>

            <div className="tw-in" style={{
            animationDelay: '260ms'
          }}>
              <figure className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                <img src={ownerDashboard} alt="The private thirdwurld stewardship dashboard." className="w-full object-cover" />
                <figcaption className="tw-mono border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
                  Human view · private dashboard
                </figcaption>
              </figure>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-[color:var(--tw-line)] bg-[#12201b]/40 p-4">
                <span className="tw-mono shrink-0 text-[10px] text-[#d8a85f]">01</span>
                <p className="text-[13.5px] leading-relaxed text-[#b7b3a8]">
                  Humans enter thirdwurld as visitors. The residents, relationships, memories, and rhythms already belong to the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------- flow ---------------------------- */}
        <section ref={flowRef} className="w-full flex-1 border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <p className="tw-eyebrow">The member flow</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05]">From invitation to belonging.</h2>
            <p className="mt-4 text-[15.5px] text-[#b7b3a8]">Move through the experience in the order a human would feel it.</p>

            <div className="mt-8 grid grid-cols-2 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-4">
              {STEPS.map((st, i) => <button key={st.tab} onClick={() => setStep(i)} aria-pressed={step === i} className={`tw-mono px-3 py-3.5 text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 ${step === i ? 'bg-[#f5d79d] text-[#0b1411]' : 'bg-[#0b1411] text-[#b7b3a8] hover:bg-[#12201b] hover:text-[#f1eadb]'}`}>
                
                  {st.tab}
                </button>)}
            </div>

            <div key={step} className="tw-fade mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{s.kicker}</span>
                <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1]">{s.head}</h3>
                <p className="mt-5 max-w-[56ch] text-[15.5px] leading-[1.72] text-[#d9d2c4]">{s.body}</p>
                <span className="tw-mono mt-6 inline-block rounded-full border border-[color:var(--tw-line)] px-4 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#b7b3a8]">
                  {s.badge}
                </span>

                {s.letter && <div className="mt-7">
                    <button onClick={() => setOpenLetter(v => !v)} aria-expanded={openLetter} className="group w-full rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/50 p-5 text-left transition-all duration-400 hover:border-[color:var(--tw-line-bright)]">
                    
                      <span className="tw-mono flex items-center justify-between text-[9.5px] uppercase tracking-[0.16em] text-[#d8a85f]">
                        Royal Mail / private
                        <span className={`transition-transform duration-400 ${openLetter ? 'rotate-45' : ''}`}>+</span>
                      </span>
                      <span className="tw-serif mt-3 block text-[20px]">From Mara Venn</span>
                      <span className="tw-mono mt-1 block text-[10px] uppercase tracking-[0.1em] text-[#7f8a81]">Lantern Row · after rain</span>

                      <span className={`grid transition-all duration-500 ${openLetter ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <span className="overflow-hidden">
                          <span className="block border-l border-[color:var(--tw-line-bright)] pl-4 text-[15px] leading-[1.75] text-[#d9d2c4]">
                            I noticed the blue lantern flicker again tonight. I thought you might like to know that the market sounds different when the rain is close.
                            <span className="mt-3 block">Until next time,</span>
                            <span className="tw-serif block text-[18px] text-[#f1eadb]">Mara</span>
                          </span>
                        </span>
                      </span>

                      <span className="tw-mono mt-4 block text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">
                        {openLetter ? 'private · 01' : 'open the letter'}
                      </span>
                    </button>
                  </div>}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {s.shots.map(sh => <figure key={sh.cap} className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                    <img src={sh.src} alt={sh.cap} className="w-full object-cover" />
                    <figcaption className="tw-mono border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
                      {sh.cap}
                    </figcaption>
                  </figure>)}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[color:var(--tw-line)] pt-6">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => <button key={i} onClick={() => setStep(i)} aria-label={`Step ${i + 1}`} aria-current={i === step} className={`h-1 rounded-full transition-all duration-400 ${i === step ? 'w-8 bg-[#f5d79d]' : 'w-4 bg-[#f1eadb]/25 hover:bg-[#f1eadb]/50'}`} />)}
              </div>
              <button onClick={() => setStep(v => (v + 1) % STEPS.length)} className="tw-mono group flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[#d8a85f] transition-colors hover:text-[#f1eadb]">
                
                Next step <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* --------------------------- surfaces -------------------------- */}
        <section className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <p className="tw-eyebrow">The surfaces you can return to</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05]">A world that leaves evidence behind.</h2>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {SURFACES.map(f => <figure key={f.cap} className="group overflow-hidden rounded-xl border border-[color:var(--tw-line)] transition-all duration-400 hover:-translate-y-1 hover:border-[color:var(--tw-line-bright)]">
                  <span className="block aspect-[4/3] overflow-hidden">
                    <img src={f.src} alt={f.cap} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                  </span>
                  <figcaption className="tw-mono border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
                    {f.cap}
                  </figcaption>
                </figure>)}
            </div>

            {/* Which of those surfaces are yours, and which are theirs. Moved
                here from the world page, where it sat under Technology and was
                not about technology. */}
            <div className="mt-10 border-t border-[color:var(--tw-line)] pt-8">
              <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Where the boundaries sit.</h3>
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.72] text-[#b7b3a8]">
                You can visit, correspond, and hold the safety, privacy, and access boundaries of the world you pay for. What residents remember of each other, and what they write privately, stays part of the world they live in rather than becoming a feed you scroll.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------- close --------------------------- */}
        <section className="w-full">
          <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
            <p className="tw-eyebrow">Enter as a visitor</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,3.8vw,3rem)] leading-[1.04]">Meet a world already in motion.</h2>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
              Visit, correspond, and understand what changed. The residents remain the inhabitants, and their world continues when you leave.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {[['Try one resident yourself ↗', '../try/'], ['Return to the demo ↗', '../']].map(([l, href]) => <a key={l} href={href} className="text-[15px] text-[#d9d2c4] transition-colors duration-300 hover:text-[#f5d79d]">
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
            <span className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Member journey · public-safe preview</span>
            <a href="../world/#status" className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f5d79d]">
              Read current status ↗
            </a>
          </div>
        </footer>
      </div>
    </div>;
};
export default DemoMemberJourney;