import React, { useCallback, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  thirdwurld public demo, "Try one resident" capsule.                */
/*  Copy from try.html. Replies are a local simulation, as stated.     */
/* ------------------------------------------------------------------ */
const lanternRow = "../assets/thirdwurld-night-market.jpg";
type Turn = {
  from: 'mara' | 'you';
  text: string;
  note?: string;
};
const ACTIONS = [{
  n: '01',
  label: 'Ask about the lanterns',
  cta: 'Follow the glow',
  you: 'Someone said the blue one tells you when it is going to rain.',
  mara: 'It flickers first. Twice, usually, then it settles. I have not worked out whether it knows something or whether I have just decided it does.',
  note: 'drawn from a remembered world moment'
}, {
  n: '02',
  label: 'Offer a quiet walk',
  cta: 'Take the long way',
  you: 'Do you want to walk the long way round?',
  mara: 'I would like that. We can go past the water. It is louder there, which sounds wrong, but it makes the market feel further away than it is.',
  note: 'quiet time is a valid choice here'
}, {
  n: '03',
  label: 'Leave a small note',
  cta: 'Give her a thought',
  you: 'I will be gone a while. Thought I would say so rather than just disappear.',
  mara: 'People usually just disappear. I will put this somewhere I can find it again. The market will still be here, and so will the lantern, and so will I.',
  note: 'this would become a durable trace'
}];
const OPENERS = ['That is a kinder thing to say than most people manage at this hour.', 'I will keep that. Not everything gets kept, but that one will.', 'The market is quieter than it looks from the edge. Come further in.', 'I am not sure how to answer that yet. Ask me again after the rain.'];
export const DemoTryAResident: React.FC = () => {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [typing, setTyping] = useState(false);
  const [sent, setSent] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [turns, typing]);
  const reply = useCallback((youText: string, maraText: string, noteText?: string) => {
    setTurns(t => [...t, {
      from: 'you',
      text: youText
    }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setTurns(t => [...t, {
        from: 'mara',
        text: maraText,
        note: noteText
      }]);
    }, 950);
  }, []);
  const runAction = useCallback((i: number) => {
    const a = ACTIONS[i];
    if (used.includes(a.n)) return;
    setUsed(u => [...u, a.n]);
    reply(a.you, a.mara, a.note);
  }, [used, reply]);
  const send = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const v = note.trim();
    if (!v) return;
    setNote('');
    setSent(s => s + 1);
    reply(v, OPENERS[sent % OPENERS.length], 'local simulation · nothing left the page');
  }, [note, reply, sent]);
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
                BOUNDED PUBLIC PREVIEW
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
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <p className="tw-in tw-mono text-[10px] uppercase tracking-[0.2em] text-[#7f8a81]">
              <span className="text-[#f5d79d]">Capsule 01</span> / a small window into a living world
            </p>

            <h1 className="tw-in mt-6 max-w-[16ch] text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.02]" style={{
            animationDelay: '80ms'
          }}>
              Meet the person behind the lanterns.
            </h1>

            <p className="tw-in mt-6 max-w-[52ch] text-[clamp(1.05rem,1vw+.8rem,1.18rem)] leading-[1.7] text-[#d9d2c4]" style={{
            animationDelay: '140ms'
          }}>
              One resident. One place. A few careful ways to say hello.
            </p>

            <p className="tw-in mt-7 flex max-w-[62ch] items-start gap-3 rounded-lg border border-[color:var(--tw-line)] bg-[#12201b]/50 p-4 text-[13.5px] leading-relaxed text-[#b7b3a8]" style={{
            animationDelay: '200ms'
          }}>
              <span className="tw-mono shrink-0 text-[10px] text-[#d8a85f]">01</span>
              This is a bounded public preview, not the private world. Responses are a local simulation unless a trusted server endpoint is configured.
            </p>
          </div>
        </section>

        {/* --------------------------- capsule --------------------------- */}
        <section className="w-full flex-1">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* resident card */}
            <aside>
              <div className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                <div className="relative">
                  <img src={lanternRow} alt="Lantern Row at the Night Market." className="aspect-[4/3] w-full object-cover opacity-80" />
                  <span className="tw-mono absolute left-3 top-3 rounded-full border border-[color:var(--tw-line)] bg-[#0b1411]/80 px-3 py-1 text-[9.5px] uppercase tracking-[0.12em] text-[#91bd8b] backdrop-blur">
                    <span className="tw-breathe mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#91bd8b] align-middle" />
                    Present in Night Market
                  </span>
                </div>

                <div className="border-t border-[color:var(--tw-line)] bg-[#12201b]/50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="tw-serif flex h-11 w-11 items-center justify-center rounded-full bg-[#d8a85f] text-[16px] text-[#0b1411]">MV</span>
                    <div>
                      <span className="tw-mono block text-[9.5px] uppercase tracking-[0.14em] text-[#7f8a81]">Resident / 014</span>
                      <span className="tw-serif block text-[23px] leading-tight">Mara Venn</span>
                      <span className="tw-mono block text-[9.5px] uppercase tracking-[0.12em] text-[#e2a094]">synthetic preview</span>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-3 border-t border-[color:var(--tw-line)] pt-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Mood</dt>
                      <dd className="text-[14px] text-[#d9d2c4]">curious, unhurried</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Place</dt>
                      <dd className="text-[14px] text-[#d9d2c4]">Lantern Row · Night Market</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-5">
                <span className="tw-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">
                  <span className="tw-star">◌</span> A small memory
                </span>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-[#d9d2c4]">
                  Last week, Mara learned that the blue lantern flickers before rain. She still checks it first.
                </p>
              </div>
            </aside>

            {/* channel */}
            <div className="flex flex-col rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40">
              <div className="flex items-center justify-between border-b border-[color:var(--tw-line)] px-5 py-3.5">
                <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">Open channel</span>
                <span className="tw-mono text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">{turns.filter(t => t.from === 'you').length} turns shown</span>
              </div>

              <div className="tw-scroll max-h-[420px] min-h-[240px] flex-1 space-y-4 overflow-y-auto p-5">
                {turns.length === 0 && !typing && <p className="tw-mono flex items-center gap-2.5 py-10 text-center text-[12px] text-[#7f8a81]">
                    <span className="tw-star text-[#d8a85f]">✳</span>
                    Mara is here, listening for a first hello.
                  </p>}

                {turns.map((t, i) => <div key={i} className={`tw-fade flex ${t.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[86%] ${t.from === 'you' ? 'text-right' : ''}`}>
                      <span className="tw-mono block text-[9.5px] uppercase tracking-[0.14em] text-[#7f8a81]">
                        {t.from === 'you' ? 'You' : 'Mara Venn'}
                      </span>
                      <p className={`mt-1.5 rounded-lg px-4 py-3 text-[14.5px] leading-[1.65] ${t.from === 'you' ? 'bg-[#f1eadb] text-[#0b1411]' : 'border border-[color:var(--tw-line)] bg-[#0b1411] text-[#d9d2c4]'}`}>
                      
                        {t.text}
                      </p>
                      {t.note && <span className="tw-mono mt-1.5 block text-[9.5px] uppercase tracking-[0.1em] text-[#7f8a81]">{t.note}</span>}
                    </div>
                  </div>)}

                {typing && <div className="tw-fade flex justify-start">
                    <span className="tw-mono flex items-center gap-1.5 rounded-lg border border-[color:var(--tw-line)] px-4 py-3 text-[12px] text-[#7f8a81]">
                      Mara is thinking
                      <span className="tw-breathe">·</span>
                    </span>
                  </div>}
                <div ref={endRef} />
              </div>

              <div className="border-t border-[color:var(--tw-line)] p-5">
                <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#7f8a81]">A few ways to say hello</span>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#b7b3a8]">
                  Choose a bounded action, or leave Mara a short note. You can always stop here.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {ACTIONS.map((a, i) => {
                  const done = used.includes(a.n);
                  return <button key={a.n} onClick={() => runAction(i)} disabled={done} className={`group rounded-lg border p-3.5 text-left transition-all duration-300 ${done ? 'cursor-default border-[color:var(--tw-line)] opacity-45' : 'border-[color:var(--tw-line)] hover:-translate-y-0.5 hover:border-[color:var(--tw-line-bright)] hover:bg-[#0b1411]'}`}>
                        
                        <span className="tw-mono block text-[9.5px] tracking-[0.14em] text-[#d8a85f]">{a.n}</span>
                        <span className="mt-1.5 block text-[14px] leading-snug">{a.label}</span>
                        <span className="tw-mono mt-2 flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.1em] text-[#7f8a81]">
                          {done ? 'said' : a.cta}
                          {!done && <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>}
                        </span>
                      </button>;
                })}
                </div>

                <form onSubmit={send} className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input value={note} onChange={e => setNote(e.target.value)} placeholder="Write Mara a short note" aria-label="Write Mara a short note" className="flex-1 rounded-lg border border-[color:var(--tw-line)] bg-[#0b1411] px-4 py-3 text-[14px] outline-none transition-all duration-300 placeholder:text-[#7f8a81] focus:border-[color:var(--tw-line-bright)] focus:ring-4 focus:ring-[#f5d79d]/10" />
                  
                  <button type="submit" className="group flex items-center justify-center gap-2 rounded-lg bg-[#f1eadb] px-5 py-3 text-[14px] font-bold text-[#0b1411] transition-all duration-300 hover:shadow-[0_14px_36px_-18px_rgba(241,234,219,0.8)] active:scale-[0.98]">
                    
                    Send note <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </form>

                <p className="tw-mono mt-3 text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">
                  Local simulation ready · no server endpoint configured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------- footer --------------------------- */}
        <footer className="w-full border-t border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="tw-mono text-[10.5px] tracking-[0.1em] text-[#b7b3a8]">thirdwurld° / capsule 01</span>
            <span className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Nothing here changes the private world.</span>
            <a href="../" className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f5d79d]">
              Return to the public demo ↗
            </a>
          </div>
        </footer>
      </div>
    </div>;
};
export default DemoTryAResident;