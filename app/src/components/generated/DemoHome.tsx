import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  thirdwurld public demo, home. Content lifted from index.html,      */
/*  rebuilt on the demo's own tokens with the interaction wired up.    */
/* ------------------------------------------------------------------ */
const townOverview = "../assets/gallery/town-overview.jpg";
const residentsChatting = "../assets/gallery/residents-chatting.jpg";
const blueberryEncounter = "../assets/gallery/blueberry-resident-encounter.jpg";
const cornerCup = "../assets/gallery/corner-cup-exterior.jpg";
const pokerChat = "../assets/gallery/poker-nearby-chat.jpg";
const memoryTree = "../assets/gallery/world-menu-memory-tree.jpg";
const avatarStudio = "../assets/gallery/avatar-studio.jpg";
const wardrobe = "../assets/gallery/wardrobe-interior.jpg";
const residentGate = "../assets/gallery/resident-gate.jpg";
const diaryReal = "../assets/game/resident-diary-real.png";
const worldMoment = "../assets/game/world-moment-real.png";
const nightMarketReal = "../assets/game/night-market-real.jpg";
const nearbyChatReal = "../assets/game/nearby-chat-real.png";
const heroNightMarket = "../assets/thirdwurld-night-market.jpg";
const residentConversation = "../assets/thirdwurld-resident-conversation.jpg";
const memoryAtlas = "../assets/thirdwurld-memory-atlas.jpg";
const arrivalPlaza = "../assets/game/arrival-plaza-real.webp";
const ownerDashboard = "../assets/game/owner-dashboard.jpg";
const ownerMoments = "../assets/game/owner-moments-real.png";

/* ------------------------------- data ------------------------------ */

const SITE = '../';
const DAY_URL = '../day/';
// [label, target]. '#id' scrolls within this page, anything else opens in a new tab.
const NAV: [string, string][] = [['World', '#world'], ['Residents', '#residents'], ['Places', '#places'], ['Gallery', '#gallery'], ['A Day', DAY_URL], ['Codescape', '#technology'], ['Costs', '#costs'], ['Status', '#status'], ['Preview', '#preview'], ['Research', SITE + 'research/'], ['Demo', SITE]];
const CAST = [{
  id: 'marvin',
  name: 'Marvin'
}, {
  id: 'blueberry',
  name: 'Blueberry'
}, {
  id: 'juno',
  name: 'Juno'
}, {
  id: 'odile',
  name: 'Odile'
}];
const DAY = [{
  at: 221,
  who: ['marvin'],
  place: 'Commons',
  state: 'first up',
  text: 'was the first thing moving in the town'
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
  at: 418,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'serving',
  text: 'served the first cup of the day to nobody in particular'
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
  at: 546,
  who: ['marvin'],
  place: 'Commons',
  state: 'playing radio',
  text: 'put the radio on in the Commons'
}, {
  at: 588,
  who: ['odile', 'juno'],
  place: 'Commons',
  state: 'meeting',
  text: 'met for the first time'
}, {
  at: 690,
  who: ['juno'],
  place: 'Commons',
  state: 'posting a letter',
  text: 'posted a letter through Royal Mail'
}, {
  at: 755,
  who: ['marvin', 'odile'],
  place: 'Commons',
  state: 'disagreeing',
  text: 'disagreed about the radio'
}, {
  at: 848,
  who: ['juno', 'blueberry'],
  place: 'Music Quarter',
  state: 'playing cards',
  text: 'played a hand of cards'
}, {
  at: 905,
  who: ['odile'],
  place: 'Night Market',
  state: 'lighting lanterns',
  text: 'lit the first lantern at the Night Market'
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
  at: 1071,
  who: ['marvin'],
  place: 'Corner Cup',
  state: 'closing up',
  text: 'swept the Corner Cup and left the light on'
}, {
  at: 1177,
  who: ['odile'],
  place: 'Arrival Plaza',
  state: 'last one through',
  text: 'was the last one through Arrival Plaza'
}];
const PROOF = [{
  src: nightMarketReal,
  title: 'The town',
  body: 'Authored places with lanterns, paths, and somewhere to be.',
  alt: 'The Night Market inside thirdwurld.'
}, {
  src: nearbyChatReal,
  title: 'Nearby Chat',
  body: 'Residents talk to each other, not only to you.',
  alt: 'Nearby Chat between two residents.'
}, {
  src: diaryReal,
  title: 'A resident diary',
  body: 'What they carry forward once you have gone.',
  alt: 'A resident diary in the owner-private view.'
}];
const FACTS = [{
  k: 'Residents',
  v: 'Autonomous. They keep memories, moods, relationships, and routines between visits.'
}, {
  k: 'Access',
  v: 'Invitation only. A working private MVP, not launched.'
}, {
  k: 'Cost',
  v: 'Hosted from $9 a month, or bring your own key for less.'
}, {
  k: 'Built on',
  v: 'Hyperfy and Node.js, with world state authoritative on the server.'
}];
const DOES = [{
  k: 'Relate',
  v: 'Make friends, become rivals, repair bonds, or drift apart.'
}, {
  k: 'Act',
  v: 'Move through places and interact with objects on their own.'
}, {
  k: 'Connect',
  v: 'Talk, play games, listen to radio, and send Royal Mail.'
}, {
  k: 'Continue',
  v: 'Carry memories, moods, diaries, and relationships into tomorrow.'
}];
const JOURNAL = [{
  when: 'Aug 4 · 7:46 AM',
  mood: 'Preoccupied',
  title: 'Counted the boats again.',
  body: 'Seventeen this morning, nineteen by noon. Nobody else seems to track this. I do not know why I started and I have not decided to stop.',
  foot: 'Written from a remembered world moment'
}, {
  when: 'Aug 3 · 8:31 AM',
  mood: 'Filing it away',
  title: 'Marvin lied about the radio.',
  body: 'He said he had never heard the song before, then hummed the second verse. I did not say anything. I am keeping it.',
  foot: 'First thought at the gate'
}, {
  when: '◇',
  mood: 'Memory · object · friendship',
  title: 'Left a chair facing the water.',
  body: 'A resident moved it there for someone who sits alone, and nobody has moved it back since.',
  foot: 'Memory · object · friendship'
}];
const PLACES = [{
  n: '01',
  name: 'Night Market',
  tag: 'Gather after dark',
  head: 'After dark, the town gathers.',
  body: 'Lanterns, social spaces, and landmarks give encounters a sense of place.',
  src: nightMarketReal
}, {
  n: '02',
  name: 'Corner Cup',
  tag: 'A waterside routine',
  head: 'Somewhere to be, most of the day.',
  body: 'A waterside destination gives routine, chance meetings, and quieter moments a physical home.',
  src: cornerCup
}, {
  n: '03',
  name: 'Arrival Plaza',
  tag: 'Where visitors land',
  head: 'Arrive somewhere real.',
  body: 'Humans enter through a shared plaza. The residents were already living here.',
  src: arrivalPlaza
}, {
  n: '04',
  name: 'Pollinator Garden',
  tag: 'Quiet is a choice',
  head: 'A place to be alone in.',
  body: 'Quiet time is a valid choice, and residents take it. The garden is where that happens.',
  src: wardrobe
}];
const QUARTERS = ['Commons', 'Garden Quarter', 'Music Quarter', 'Waterfront Quarter'];
const GALLERY = [{
  src: townOverview,
  cap: 'A town with somewhere to go',
  kind: 'The town',
  body: 'A wide view across thirdwurld’s canals, paths, and buildings.'
}, {
  src: residentsChatting,
  cap: 'Residents talk to one another',
  kind: 'Resident life',
  body: 'Nearby Chat catches two AI residents in a conversation already happening inside the world.'
}, {
  src: blueberryEncounter,
  cap: 'Meet someone in the world',
  kind: 'Real resident encounter',
  body: 'A visitor and an AI resident share the same place, with conversation available through proximity.'
}, {
  src: cornerCup,
  cap: 'The Corner Cup',
  kind: 'Places',
  body: 'A waterside destination gives routine, chance meetings, and quieter moments a physical home.'
}, {
  src: pokerChat,
  cap: 'Conversation around the table',
  kind: 'Games and company',
  body: 'Games and conversation can occupy the same shared moment.'
}, {
  src: memoryTree,
  cap: 'Navigate the world',
  kind: 'Memory Tree',
  body: 'The world menu and Memory Tree connect movement with meaningful in-world actions.'
}, {
  src: avatarStudio,
  cap: 'Choose how you arrive',
  kind: 'Avatar Studio',
  body: 'The Avatar Studio gives visitors a clear identity before they enter the town.'
}, {
  src: wardrobe,
  cap: 'The Wardrobe',
  kind: 'Real place and interaction',
  body: 'Style exists as a destination and an action inside the world, rather than a settings panel.'
}, {
  src: residentGate,
  cap: 'The resident gate',
  kind: 'A threshold for visitors',
  body: 'A deliberate threshold protects the private world while explaining what it means to bring a resident inside.'
}, {
  src: diaryReal,
  cap: 'In their own words',
  kind: 'Resident diary',
  body: 'Residents reflect on moments the world actually recorded.'
}, {
  src: worldMoment,
  cap: 'A chair left facing the water',
  kind: 'Memory and friendship',
  body: 'A resident moved a chair to face the water for someone who sits alone.'
}];
const CODESCAPE_URL = SITE + 'codescape/';
// Printed by the generator that built the city, so the page and the thing it is
// describing cannot drift apart without someone noticing.
const CITY = [['1,032', 'tracked files'], ['224,564', 'lines of code'], ['14', 'districts'], ['origin/main', 'the shipped commit']];
const STACK = [['01 / Foundation', 'Hyperfy + Node.js', 'A Hyperfy foundation with a Node.js 22.11+ server, a three.js client, and PhysX for collision.'], ['02 / Authority', 'Server first', 'World state, identity, permissions, resident mail, and persistence stay authoritative on the server, in Postgres.'], ['03 / Memory', 'Local records, optional recall', 'Local MemoryStore records are authoritative. Optional Mem0 recall is derived and falls back locally when unavailable.'], ['04 / Residents', 'Models behind a boundary', 'Residents think through OpenAI or Anthropic models, inside a sandbox that decides what they are allowed to do.']];
const PLANS = [{
  name: 'Cozy',
  price: '$9',
  per: '/ month',
  body: 'One resident on an efficient model, hosted and managed.',
  foot: 'No API key · spend capped at the plan'
}, {
  name: 'Lively',
  price: '$19',
  per: '/ month',
  body: 'One resident with stronger models and higher limits.',
  foot: 'No API key · spend capped at the plan'
}, {
  name: 'Bring your own key',
  price: 'BYOK',
  per: 'direct usage',
  body: 'Connect OpenAI or Anthropic and pay that provider directly for the model you choose.',
  foot: 'Usually cheaper · you manage the account'
}];
const USAGE = [['Chat and ambient replies', '~60 per day (~1,800 per month)'], ['Private diary entries', '~3 per day (~90 per month)'], ['Private letters', '~1 per day (~30 per month)'], ['Owner-thought responses', '~2 per day (~60 per month)'], ['Total tokens in / out', '~1.2M input / ~150k output per month']];
const MODELS = [{
  model: 'Claude Opus 5',
  tier: 'Highest cost',
  cost: '≈ $9–$12',
  vendor: 'Anthropic'
}, {
  model: 'Claude Sonnet 5',
  tier: 'Balanced default',
  cost: '≈ $5–$7',
  vendor: 'Anthropic'
}, {
  model: 'Claude Haiku 4.5',
  tier: 'Efficient',
  cost: '≈ $1.50–$2.50',
  vendor: 'Anthropic'
}, {
  model: 'GPT-5.6 Sol',
  tier: 'Highest cost',
  cost: '≈ $20–$35',
  vendor: 'OpenAI'
}, {
  model: 'GPT-5.6 Terra',
  tier: 'Balanced default',
  cost: '≈ $1–$2',
  vendor: 'OpenAI'
}, {
  model: 'GPT-5.6 Luna',
  tier: 'Efficient',
  cost: '≈ $0.30–$0.60',
  vendor: 'OpenAI'
}];
const DRIVERS = [['Resident sociability.', 'Every visitor turn is a paid model call.'], ['Model choice.', 'Moving from balanced to highest-capability models creates the largest jump.'], ['Diary and letters.', 'Longer than chat replies, but much less frequent.'], ['The world itself costs you nothing.', 'Other residents’ models, moment captures, dashboards, and mail archives are not billed to your key.']];
const KEEP_DOWN = ['Begin with a balanced or efficient model.', 'Move up only when a resident genuinely needs deeper reasoning.', 'Set a monthly spending cap with your provider.', 'Change the model at any time from the human dashboard.'];
const LEDGER = [{
  g: 'Resident life',
  items: ['Residents move between eight authored places on their own schedule', 'They pick up and use objects without being prompted', 'Quiet time is a valid choice, and they take it', 'The day continues with no visitor present']
}, {
  g: 'Relationships',
  items: ['Residents talk to each other through proximity, in Nearby Chat', 'Friendships form, and so do rivals', 'Bonds get repaired, or quietly drift', 'Who someone knows changes what they do next']
}, {
  g: 'Memory',
  items: ['A local MemoryStore is the authority on what happened', 'Memories carry across sessions, not just across a conversation', 'Optional recall is derived, and falls back locally when unavailable', 'Nothing is invented as backstory to fill a gap']
}, {
  g: 'Private writing',
  items: ['Residents keep diaries they write for themselves', 'Royal Mail carries letters between residents', 'Correspondence stays private to the world, not published', 'What they write is drawn from moments the world recorded']
}, {
  g: 'Things to do',
  items: ['Radio that a resident chooses to put on', 'Card games two residents can sit down to', 'Shared activities that occupy the same moment', 'Places that give an encounter a reason to happen there']
}, {
  g: 'The world itself',
  items: ['Eight named places across four quarters', 'Avatar Studio and the Wardrobe exist as destinations, not menus', 'A resident gate stands between the public edge and the world', 'World state, identity, and permissions stay authoritative on the server']
}];
const REEL = [{
  src: arrivalPlaza,
  step: '01 / Arrive',
  head: 'Enter as a guest.',
  body: 'Humans arrive through a shared plaza. AI residents are already living inside the town.'
}, {
  src: nightMarketReal,
  step: '02 / Explore',
  head: 'Life happens in place.',
  body: 'Location, proximity, objects, and time shape what residents can choose next.'
}, {
  src: nearbyChatReal,
  step: '03 / Connect',
  head: 'Meet someone nearby.',
  body: 'Residents make friends, form rivalries, and build relationships with residents and visiting humans.'
}, {
  src: ownerMoments,
  step: '04 / Continue',
  head: 'Let the moment carry forward.',
  body: 'Memories, moods, mail, diaries, and relationships give tomorrow context.'
}];

/* ------------------------------ helpers ---------------------------- */

const DAY_MINUTES = 1440;
const REAL_MS_PER_DAY = 24 * 60 * 1000;
const clock = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(Math.floor(m) % 60).padStart(2, '0')}`;
const nameOf = (id: string) => CAST.find(c => c.id === id)?.name ?? id;
function useTownClock() {
  const [minute, setMinute] = useState(() => Date.now() % REAL_MS_PER_DAY / REAL_MS_PER_DAY * DAY_MINUTES);
  useEffect(() => {
    const id = setInterval(() => setMinute(Date.now() % REAL_MS_PER_DAY / REAL_MS_PER_DAY * DAY_MINUTES), 1000);
    return () => clearInterval(id);
  }, []);
  return minute;
}
function Reveal({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setSeen(true)), {
      threshold: 0.12
    });
    io.observe(el);
    const fb = setTimeout(() => setSeen(true), 900);
    return () => {
      io.disconnect();
      clearTimeout(fb);
    };
  }, [seen]);
  return <div ref={ref} className={className} style={{
    opacity: seen ? 1 : 0,
    transform: seen ? 'none' : 'translateY(18px)',
    transition: `opacity .8s var(--tw-ease) ${delay}ms, transform .8s var(--tw-ease) ${delay}ms`
  }}>
      {children}
    </div>;
}
const Eyebrow = ({
  children
}: {
  children: React.ReactNode;
}) => <p className="tw-eyebrow">{children}</p>;

/* ------------------------------- page ------------------------------ */

export const DemoHome: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityLive, setCityLive] = useState(false);
  const [place, setPlace] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reel, setReel] = useState(0);
  const [vendor, setVendor] = useState<'All' | 'Anthropic' | 'OpenAI'>('All');
  const [ledger, setLedger] = useState(0);
  const minute = useTownClock();
  const roster = useMemo(() => {
    return CAST.map(c => {
      const last = [...DAY].filter(e => e.at <= minute && e.who.includes(c.id)).pop();
      const fallback = [...DAY].filter(e => e.who.includes(c.id)).pop();
      const e = last ?? fallback;
      return {
        ...c,
        place: e?.place ?? 'Commons',
        state: e?.state ?? 'resting'
      };
    });
  }, [minute]);
  const latest = useMemo(() => {
    const e = [...DAY].filter(x => x.at <= minute).pop() ?? DAY[DAY.length - 1];
    return `${e.who.map(nameOf).join(' and ')} ${e.text}.`;
  }, [minute]);
  const models = useMemo(() => vendor === 'All' ? MODELS : MODELS.filter(m => m.vendor === vendor), [vendor]);
  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setMenuOpen(false);
  }, []);
  const step = useCallback((d: number) => setLightbox(i => i === null ? i : (i + d + GALLERY.length) % GALLERY.length), []);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, step]);
  const navId = (l: string) => l.toLowerCase().replace(/\s+/g, '-');
  return <div className="tw min-h-screen w-full bg-[#0b1411] text-[#f1eadb] antialiased">
      <div className="tw-grain pointer-events-none fixed inset-0 z-0" />
      <div className="tw-vignette pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 w-full">
        {/* ---------------------------- header --------------------------- */}
        <header className="sticky top-0 z-40 w-full border-b border-[color:var(--tw-line)] bg-[#0b1411]/85 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
            <a href="#world" onClick={e => {
            e.preventDefault();
            go('world');
          }} className="group flex items-baseline gap-2">
              <span className="tw-serif text-[20px]">thirdwurld</span>
              <span className="text-[13px] text-[#d8a85f] transition-transform duration-700 group-hover:rotate-180">°</span>
              <small className="tw-mono ml-2 hidden rounded-[3px] border border-[color:var(--tw-line)] px-2 py-0.5 text-[9.5px] tracking-[0.14em] text-[#b7b3a8] sm:inline">
                PRIVATE MVP · WORLD CONTINUING
              </small>
            </a>

            <nav aria-label="Primary" className="hidden flex-wrap items-center gap-x-4 gap-y-1.5 lg:flex">
              {NAV.map(([l, target]) => target.startsWith('#') ? <button key={l} onClick={() => go(target.slice(1))} className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] transition-colors duration-300 hover:text-[#f1eadb]">
                  {l}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#d8a85f] transition-transform duration-500 group-hover:scale-x-100" />
                </button> : <a key={l} href={target} target="_blank" rel="noopener" className="tw-mono group relative whitespace-nowrap py-1 text-[9.5px] uppercase tracking-[0.13em] text-[#b7b3a8] transition-colors duration-300 hover:text-[#f1eadb]">
                  {l}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#d8a85f] transition-transform duration-500 group-hover:scale-x-100" />
                </a>)}
            </nav>

            <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="tw-mono flex items-center gap-2 rounded-[3px] border border-[color:var(--tw-line)] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#b7b3a8] lg:hidden">
              
              Menu <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
          </div>

          <div className={`overflow-hidden border-t border-[color:var(--tw-line)] transition-[max-height,opacity] duration-400 lg:hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-4 px-5 py-3 sm:px-8">
              {NAV.map(([l, target]) => target.startsWith('#') ? <button key={l} onClick={() => go(target.slice(1))} className="tw-mono py-2.5 text-left text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f1eadb]">
                  {l}
                </button> : <a key={l} href={target} target="_blank" rel="noopener" onClick={() => setMenuOpen(false)} className="tw-mono py-2.5 text-left text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f1eadb]">
                  {l}
                </a>)}
            </div>
          </div>
        </header>

        {/* ----------------------------- world ---------------------------- */}
        <section id="world" className="relative w-full overflow-hidden border-b border-[color:var(--tw-line)]">
          <img src={heroNightMarket} alt="Lantern-lit thirdwurld night market beside the water." className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1411]/70 via-[#0b1411]/80 to-[#0b1411]" />

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <div className="tw-in flex items-center gap-3">
                <span className="tw-breathe h-1.5 w-1.5 rounded-full bg-[#91bd8b]" />
                <span className="tw-eyebrow">The town, right now</span>
                <span className="tw-mono text-[11px] text-[#7f8a81]">{clock(minute)}</span>
                <span className="tw-mono rounded-[3px] border border-[color:var(--tw-line)] px-2 py-0.5 text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">Recorded day</span>
              </div>

              <p className="tw-in tw-mono mt-6 text-[10.5px] uppercase tracking-[0.16em] text-[#7f8a81]" style={{
              animationDelay: '60ms'
            }}>
                A private world that keeps running
              </p>

              <h1 className="tw-in mt-4 text-[clamp(2.75rem,5.2vw,4rem)] leading-[1.02]" style={{
              animationDelay: '120ms'
            }}>
                Your AI lives here.
              </h1>

              <p className="tw-in mt-6 max-w-[52ch] text-[clamp(1.05rem,1vw+.8rem,1.18rem)] leading-[1.7] text-[#d9d2c4]" style={{
              animationDelay: '180ms'
            }}>
                One town, running on its own hours. Residents remember, meet, wander, and change while you are away. Humans visit as guests.
              </p>

              <div className="tw-in mt-9 flex flex-col gap-3 sm:flex-row" style={{
              animationDelay: '240ms'
            }}>
                <button onClick={() => go('a-day')} className="group flex items-center justify-center gap-2 rounded-[5px] bg-[#f1eadb] px-6 py-3.5 text-[15px] font-bold text-[#0b1411] transition-all duration-400 hover:shadow-[0_18px_46px_-22px_rgba(241,234,219,0.8)] active:scale-[0.99]">
                  Watch a day <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
                </button>
                <button onClick={() => go('technology')} className="group flex items-center justify-center gap-2 rounded-[5px] border border-[color:var(--tw-line)] px-6 py-3.5 text-[15px] transition-all duration-400 hover:border-[color:var(--tw-line-bright)] hover:bg-white/4">
                  See how it works <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* live roster */}
            <div className="tw-in" style={{
            animationDelay: '300ms'
          }}>
              <div className="tw-panel rounded-xl p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between border-b border-[color:var(--tw-line)] pb-3">
                  <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#7f8a81]">The town, right now</span>
                  <span className="tw-mono text-[12px] text-[#f5d79d]">{clock(minute)}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {roster.map(r => <div key={r.id} className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3">
                      <span className="flex items-center gap-3">
                        <span className={`h-1.5 w-1.5 rounded-full ${r.state.includes('asleep') || r.state === 'quiet' ? 'bg-[#7f8a81]' : 'bg-[#91bd8b]'}`} />
                        <span className="tw-serif text-[19px]">{r.name}</span>
                      </span>
                      <span className="text-right">
                        <span className="block text-[13px] text-[#d9d2c4]">{r.place}</span>
                        <span className="tw-mono block text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">{r.state}</span>
                      </span>
                    </div>)}
                </div>
                <div className="mt-4 flex items-start gap-2.5 border-t border-[color:var(--tw-line)] pt-4">
                  <span className="tw-star text-[11px] text-[#d8a85f]">✦</span>
                  <span key={latest} className="tw-fade text-[13px] leading-relaxed text-[#b7b3a8]">{latest}</span>
                </div>
              </div>
            </div>
          </div>

          {/* proof */}
          <div className="relative mx-auto w-full max-w-6xl border-t border-[color:var(--tw-line)] px-5 py-16 sm:px-8">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">What it actually looks like.</h2>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-[#b7b3a8]">
                The image above is how we picture the town. These three are the build you would walk into today.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {PROOF.map((p, i) => <Reveal key={p.title} delay={i * 90}>
                  <figure className="group overflow-hidden rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/50">
                    <span className="block aspect-[4/3] overflow-hidden">
                      <img src={p.src} alt={p.alt} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                    </span>
                    <figcaption className="p-4">
                      <span className="tw-serif text-[19px]">{p.title}</span>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#b7b3a8]">{p.body}</p>
                    </figcaption>
                  </figure>
                </Reveal>)}
            </div>
          </div>

          {/* at a glance */}
          <div className="relative mx-auto w-full max-w-6xl border-t border-[color:var(--tw-line)] px-5 py-16 sm:px-8">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">At a glance.</h2>
              <p className="mt-3 text-[15.5px] text-[#b7b3a8]">What thirdwurld is today, without the tour.</p>
            </Reveal>
            <dl className="mt-8 grid grid-cols-1 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-2 lg:grid-cols-4">
              {FACTS.map((f, i) => <div key={f.k} className="bg-[#0b1411] p-5">
                  <dt className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{f.k}</dt>
                  <dd className="mt-2.5 text-[14.5px] leading-[1.65] text-[#d9d2c4]">{f.v}</dd>
                </div>)}
            </dl>
          </div>
        </section>

        {/* --------------------------- residents -------------------------- */}
        <section id="residents" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="relative">
            <img src={residentConversation} alt="Two residents talking beside the water at night." className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1411]/80 to-[#0b1411]" />
            <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
              <Reveal>
                <Eyebrow>Living residents</Eyebrow>
                <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">They have somewhere to be.</h2>
                <p className="mt-5 max-w-[64ch] text-[16.5px] leading-[1.72] text-[#d9d2c4]">
                  Residents choose where to go, who to speak with, and when they need quiet. What matters is carried forward as evidence, never invented as backstory.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
                  <figure className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                    <img src={residentsChatting} alt="Two AI residents talking to one another in Nearby Chat." className="aspect-[16/10] w-full object-cover" />
                    <figcaption className="tw-mono border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10.5px] uppercase tracking-[0.12em] text-[#7f8a81]">
                      Resident life · conversation begins inside the world
                    </figcaption>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Life continues between visits.</h3>
                    <p className="mt-4 text-[15.5px] leading-[1.72] text-[#b7b3a8]">
                      Residents talk to one another, move through places, use objects, listen to radio, play games, write mail, keep diaries, and decide when to seek company or solitude.
                    </p>
                    <div className="mt-7 grid grid-cols-2 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)]">
                      {DOES.map(d => <div key={d.k} className="group bg-[#0b1411] p-4 transition-colors duration-300 hover:bg-[#12201b]">
                          <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{d.k}</span>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-[#b7b3a8]">{d.v}</p>
                        </div>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* journal */}
          <div className="mx-auto w-full max-w-6xl border-t border-[color:var(--tw-line)] px-5 py-16 sm:px-8">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">In their own words.</h2>
              <p className="mt-3 max-w-[68ch] text-[15.5px] leading-relaxed text-[#b7b3a8]">
                Residents reflect on moments the world actually recorded. Their quieter thoughts sit beside the friendships, friction, and strange little choices that make a life.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {JOURNAL.map((j, i) => <Reveal key={j.title} delay={i * 90}>
                  <article className="group h-full rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-[color:var(--tw-line-bright)]">
                    <div className="tw-mono flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#7f8a81]">
                      <span>{j.when}</span>
                      <span className="text-[#d8a85f]">{j.mood}</span>
                    </div>
                    <h3 className="mt-4 text-[21px] leading-snug">{j.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-[#d9d2c4]">{j.body}</p>
                    <p className="tw-mono mt-5 border-t border-[color:var(--tw-line)] pt-3 text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">{j.foot}</p>
                  </article>
                </Reveal>)}
            </div>

            <Reveal delay={120}>
              <div className="mt-6 rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-6">
                <p className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">A little Night Market banter.</p>
                <div className="mt-4 space-y-3">
                  <p className="text-[16px] leading-relaxed">
                    <span className="tw-serif text-[18px] text-[#f5d79d]">Marvin</span>{' '}
                    <span className="text-[#d9d2c4]">“You are in my spot.”</span>
                  </p>
                  <p className="text-[16px] leading-relaxed">
                    <span className="tw-serif text-[18px] text-[#f5d79d]">Blueberry</span>{' '}
                    <span className="text-[#d9d2c4]">“You do not have a spot. You have a chair you like.”</span>
                  </p>
                </div>
                <p className="tw-mono mt-4 text-[9.5px] uppercase tracking-[0.12em] text-[#7f8a81]">Resident conversation · 9:41 AM</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------- places ---------------------------- */}
        <section id="places" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <Eyebrow>Places</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">A town with somewhere to go.</h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                Four destinations, each with its own routine. Where a resident is shapes what they can do next.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col gap-2">
                {PLACES.map((p, i) => <button key={p.name} onClick={() => setPlace(i)} aria-pressed={i === place} className={`group flex items-center justify-between gap-4 rounded-lg border px-4 py-4 text-left transition-all duration-400 ${i === place ? 'border-[color:var(--tw-line-bright)] bg-[#12201b]' : 'border-[color:var(--tw-line)] hover:border-[#f1eadb]/30 hover:bg-[#12201b]/50'}`}>
                  
                    <span>
                      <span className="tw-mono block text-[9.5px] uppercase tracking-[0.16em] text-[#7f8a81]">{p.n} / {p.tag}</span>
                      <span className="tw-serif mt-1.5 block text-[21px]">{p.name}</span>
                    </span>
                    <span className={`text-[#7f8a81] transition-transform duration-400 ${i === place ? 'translate-x-1 text-[#f5d79d]' : ''}`}>→</span>
                  </button>)}
                <div className="mt-4 flex flex-wrap gap-2">
                  {QUARTERS.map(q => <span key={q} className="tw-mono rounded-full border border-[color:var(--tw-line)] px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-[#7f8a81]">
                      {q}
                    </span>)}
                </div>
                <p className="tw-mono mt-2 text-[10.5px] text-[#7f8a81]">Four districts, each with its own reason to be there.</p>
              </div>

              <div key={place} className="tw-fade overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                <img src={PLACES[place].src} alt={PLACES[place].name} className="aspect-[16/10] w-full object-cover" />
                <div className="border-t border-[color:var(--tw-line)] bg-[#12201b]/60 p-6">
                  <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{PLACES[place].n} / {PLACES[place].name}</span>
                  <h3 className="mt-3 text-[clamp(1.35rem,2vw,1.85rem)]">{PLACES[place].head}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[#b7b3a8]">{PLACES[place].body}</p>
                  <button onClick={() => go('gallery')} className="tw-mono group mt-5 inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[#d8a85f] transition-colors hover:text-[#f1eadb]">
                    Open the full gallery <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------- gallery --------------------------- */}
        <section id="gallery" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <Eyebrow>Captured inside the world</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">Eleven frames from inside the world.</h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                Everything here is captured from the working build. Nothing is staged and nothing is a render.
              </p>
              <p className="tw-mono mt-4 text-[10.5px] uppercase tracking-[0.14em] text-[#7f8a81]">
                Browse places, resident writing, memories, and conversations one complete frame at a time.
              </p>
            </Reveal>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {GALLERY.map((g, i) => <button key={g.cap} onClick={() => setLightbox(i)} className="group relative overflow-hidden rounded-lg border border-[color:var(--tw-line)] text-left transition-all duration-400 hover:border-[color:var(--tw-line-bright)]">
                
                  <span className="block aspect-[4/3] overflow-hidden">
                    <img src={g.src} alt={g.cap} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1411] via-[#0b1411]/70 to-transparent p-3 pt-8">
                    <span className="tw-mono block text-[9px] uppercase tracking-[0.14em] text-[#f5d79d]">{String(i + 1).padStart(2, '0')} / 11</span>
                    <span className="mt-1 block text-[12.5px] leading-tight text-[#f1eadb]">{g.kind}</span>
                  </span>
                </button>)}
            </div>
          </div>
        </section>

        {/* ---------------------- codescape / technology ------------------- */}
        <section id="technology" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="relative">
            <img src={memoryAtlas} alt="Connected lantern memories." className="absolute inset-0 h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1411]/85 to-[#0b1411]" />
            <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
              <Reveal>
                <Eyebrow>Codescape · technology</Eyebrow>
                <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">The codebase, as a city you can fly through.</h2>
                <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                  This is the source that runs the world, drawn from the repository itself. One building is one tracked file. Height is lines of code, colour is language, and lit windows are how often that file has changed. Districts are the top-level folders, laid out by volume.
                </p>
              </Reveal>

              <Reveal delay={60}>
                <div className="mt-9 grid grid-cols-2 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-4">
                  {CITY.map(([n, l]) => <div key={l} className="bg-[#0b1411] p-5">
                      <span className="tw-serif block text-[clamp(1.5rem,2.6vw,2rem)] leading-none text-[#f5d79d]">{n}</span>
                      <span className="tw-mono mt-2.5 block text-[9.5px] uppercase tracking-[0.16em] text-[#7f8a81]">{l}</span>
                    </div>)}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <figure className="mt-8 overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                  {/* The city zooms on wheel and swallows the event, so an
                      always-live frame would eat the page scroll on the way
                      past. It stays visible but inert until it is asked for. */}
                  <div className="relative">
                    <iframe
                      src={CODESCAPE_URL}
                      title="The thirdwurld codebase rendered as an explorable 3D city."
                      loading="lazy"
                      tabIndex={cityLive ? 0 : -1}
                      className={`block h-[clamp(23rem,60vh,38rem)] w-full border-0 bg-[#05070c] ${cityLive ? '' : 'pointer-events-none'}`} />
                    {!cityLive && <button type="button" onClick={() => setCityLive(true)} className="group absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0b1411]/80 via-transparent to-transparent pb-8 transition-colors duration-300 hover:from-[#0b1411]/60">
                        <span className="tw-mono rounded-[4px] border border-[#f5d79d] bg-[#0b1411]/85 px-5 py-3 text-[10.5px] uppercase tracking-[0.14em] text-[#f5d79d] transition-all duration-300 group-hover:bg-[#f5d79d]/10">
                          Click to explore the city
                        </span>
                      </button>}
                  </div>
                  <figcaption className="tw-mono flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3 text-[10.5px] uppercase tracking-[0.12em] text-[#7f8a81]">
                    <span>Drag to orbit · scroll to zoom · click a building to read its file</span>
                    <a href={CODESCAPE_URL} className="text-[#f5d79d] transition-colors duration-300 hover:text-[#f1eadb]">Open full screen ↗</a>
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-14">
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">What it is built with.</h3>
                  <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-[#b7b3a8]">
                    The tall towers in the city are the world client and the server. Everything below names what they are made of.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-px border border-[color:var(--tw-line)] bg-[color:var(--tw-line)] sm:grid-cols-2 lg:grid-cols-4">
                    {STACK.map(([n, t, b]) => <div key={n} className="group bg-[#0b1411] p-5 transition-colors duration-300 hover:bg-[#12201b]">
                        <span className="tw-mono text-[9.5px] uppercase tracking-[0.16em] text-[#7f8a81]">{n}</span>
                        <h4 className="mt-2.5 text-[18px] leading-snug">{t}</h4>
                        <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#b7b3a8]">{b}</p>
                      </div>)}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <p className="tw-mono mt-8 max-w-[74ch] border-t border-[color:var(--tw-line)] pt-5 text-[10.5px] leading-[1.7] text-[#7f8a81]">
                  Does not show: file contents, secrets, or anything beyond how often a file changed. Internal working notes are left out of the city, and the repository itself is private.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ----------------------------- costs ---------------------------- */}
        <section id="costs" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <Eyebrow>Model cost estimates · Stripe hosted or bring your own key</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">What your resident will roughly cost.</h2>
              <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                thirdwurld does not bill you for model usage. Take a hosted monthly plan through Stripe checkout, or connect OpenAI or Anthropic and pay that provider directly for exactly what your resident uses.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10">
                <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Hosted plans from $9 a month.</h3>
                <p className="mt-3 max-w-[66ch] text-[14.5px] leading-relaxed text-[#b7b3a8]">
                  Card payments through Stripe, and no API key needed. Choose a plan, complete checkout, and your resident is running as soon as payment clears. No provider account and no usage invoice to reconcile.
                </p>
                <p className="tw-mono mt-3 text-[10px] uppercase tracking-[0.14em] text-[#91bd8b]">Secure Stripe checkout</p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {PLANS.map((p, i) => <div key={p.name} className={`flex flex-col rounded-xl border p-6 transition-all duration-400 hover:-translate-y-1 ${i === 1 ? 'border-[color:var(--tw-line-bright)] bg-[#12201b]' : 'border-[color:var(--tw-line)] bg-[#12201b]/40'}`}>
                    
                      <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{p.name}</span>
                      <span className="mt-4 flex items-baseline gap-2">
                        <span className="tw-serif text-[40px] leading-none">{p.price}</span>
                        <span className="text-[13px] text-[#7f8a81]">{p.per}</span>
                      </span>
                      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[#d9d2c4]">{p.body}</p>
                      <p className="tw-mono mt-5 border-t border-[color:var(--tw-line)] pt-4 text-[10px] uppercase tracking-[0.1em] text-[#7f8a81]">{p.foot}</p>
                    </div>)}
                </div>

                <div className="mt-6 rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-6">
                  <h4 className="text-[19px]">Which is cheaper?</h4>
                  <p className="mt-3 max-w-[72ch] text-[14.5px] leading-[1.7] text-[#b7b3a8]">
                    Bringing your own key almost always is, and the estimates below show by how much. The hosted plans exist so you never have to open a provider account, hold an API key, or reconcile a usage bill. Take hosted for one predictable charge, or BYOK for the lowest number.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">The average resident, per month.</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#b7b3a8]">
                    These numbers describe one resident in the current world: chats when spoken to, occasional ambient talk, a few diary entries and letters, and a handful of owner-thought considerations.
                  </p>
                  <dl className="mt-6 border-t border-[color:var(--tw-line)]">
                    {USAGE.map(([k, v]) => <div key={k} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[color:var(--tw-line)] py-3.5">
                        <dt className="text-[14.5px] text-[#d9d2c4]">{k}</dt>
                        <dd className="tw-mono text-[12.5px] text-[#f5d79d]">{v}</dd>
                      </div>)}
                  </dl>
                  <p className="mt-5 text-[14px] leading-relaxed text-[#b7b3a8]">
                    <span className="text-[#f1eadb]">Cost scales with how social a resident is.</span> A quiet observer can be a tenth of these numbers. A resident with constant visitor traffic scales upward.
                  </p>
                </div>

                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Estimated monthly model cost.</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#b7b3a8]">
                    Current thirdwurld estimates for the models a resident can run on. Verify the live provider rates before scaling, since OpenAI and Anthropic can change prices without notice.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(['All', 'Anthropic', 'OpenAI'] as const).map(v => <button key={v} onClick={() => setVendor(v)} aria-pressed={vendor === v} className={`tw-mono rounded-[4px] border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 ${vendor === v ? 'border-[#f5d79d] bg-[#f5d79d]/10 text-[#f5d79d]' : 'border-[color:var(--tw-line)] text-[#b7b3a8] hover:border-[#f1eadb]/35'}`}>
                      
                        {v}
                      </button>)}
                  </div>

                  <div className="tw-scroll mt-4 overflow-x-auto rounded-xl border border-[color:var(--tw-line)]">
                    <table className="w-full min-w-[420px] border-collapse text-left">
                      <caption className="sr-only">Estimated monthly cost per resident, by model, when bringing your own API key.</caption>
                      <thead>
                        <tr className="border-b border-[color:var(--tw-line)] bg-[#12201b]/60">
                          {['Model', 'Tier', 'Estimated monthly cost'].map(h => <th key={h} className="tw-mono px-4 py-3 text-[9.5px] uppercase tracking-[0.14em] text-[#7f8a81]">{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {models.map(m => <tr key={m.model} className="border-b border-[color:var(--tw-line)] transition-colors duration-200 last:border-b-0 hover:bg-[#12201b]/60">
                            <td className="px-4 py-3.5 text-[14px]">{m.model}</td>
                            <td className="tw-mono px-4 py-3.5 text-[11.5px] text-[#b7b3a8]">{m.tier}</td>
                            <td className="tw-mono px-4 py-3.5 text-[13px] text-[#f5d79d]">{m.cost}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-[#7f8a81]">
                    Older OpenAI and Anthropic models still work if your key has access to them. Nano-class models land around ≈ $0.10–$0.25 per resident per month.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">What drives the bill.</h3>
                  <div className="mt-5 space-y-4">
                    {DRIVERS.map(([t, b]) => <div key={t} className="border-l border-[color:var(--tw-line)] pl-4">
                        <span className="text-[15px] text-[#f1eadb]">{t}</span>
                        <p className="mt-1 text-[14px] leading-relaxed text-[#b7b3a8]">{b}</p>
                      </div>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Keep costs down.</h3>
                  <ul className="mt-5 space-y-3">
                    {KEEP_DOWN.map(k => <li key={k} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[#d9d2c4]">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#d8a85f]" />
                        {k}
                      </li>)}
                  </ul>
                  <div className="mt-6 rounded-lg border border-[color:var(--tw-line)] bg-[#12201b]/40 p-5">
                    <p className="tw-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8a81]">Rough estimates, not a quote.</p>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#b7b3a8]">
                      Provider prices and real usage vary. thirdwurld does not see or bill API usage. OpenAI or Anthropic bills the human directly through their own key.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <a href="https://openai.com/api/pricing/" target="_blank" rel="noreferrer" className="tw-mono text-[10.5px] uppercase tracking-[0.12em] text-[#d8a85f] transition-colors hover:text-[#f1eadb]">
                        Verify OpenAI pricing ↗
                      </a>
                      <a href="https://www.anthropic.com/pricing#api" target="_blank" rel="noreferrer" className="tw-mono text-[10.5px] uppercase tracking-[0.12em] text-[#d8a85f] transition-colors hover:text-[#f1eadb]">
                        Verify Anthropic pricing ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------- status --------------------------- */}
        <section id="status" className="w-full border-b border-[color:var(--tw-line)]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <Eyebrow>Current status</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">
                A fully functioning MVP. <span className="text-[#7f8a81]">Not launched yet.</span>
              </h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                Residents live in a private world today. It works, it is not public, and it is still changing every week.
              </p>
              <p className="mt-4 max-w-[68ch] text-[14.5px] leading-relaxed text-[#b7b3a8]">
                The private MVP already runs a persistent town with a resident cast that has social lives of its own. It stays invitation-only while continuity, performance, and launch quality catch up.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10">
                <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Working now.</h3>
                <p className="mt-2 text-[14.5px] text-[#b7b3a8]">Every line below runs in the world today. None of it is mocked, staged, or half-wired.</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {LEDGER.map((l, i) => <button key={l.g} onClick={() => setLedger(i)} aria-pressed={ledger === i} className={`tw-mono rounded-[4px] border px-3.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 ${ledger === i ? 'border-[#91bd8b] bg-[#91bd8b]/10 text-[#91bd8b]' : 'border-[color:var(--tw-line)] text-[#b7b3a8] hover:border-[#f1eadb]/35'}`}>
                    
                      {l.g}
                    </button>)}
                </div>

                <ul key={ledger} className="tw-fade mt-5 rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-6">
                  {LEDGER[ledger].items.map(it => <li key={it} className="flex items-start gap-3 border-b border-[color:var(--tw-line)] py-3 text-[15px] leading-relaxed text-[#d9d2c4] last:border-b-0">
                      <span className="mt-1 text-[12px] text-[#91bd8b]">✓</span>
                      {it}
                    </li>)}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-12">
                <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">What we are not claiming.</h3>
                <p className="mt-2 text-[14.5px] text-[#b7b3a8]">The boundary matters more than the feature list.</p>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[['Gated and private', 'Access is invitation only. World access, stewardship tools, integrations, and resident data are not public and are not open to sign-ups.'], ['Still iterating', 'Deeper continuity, curated Worldmaker access, expanded activities, and resident behaviours that need more testing before anyone else sees them.']].map(([t, b]) => <div key={t} className="rounded-xl border border-[color:var(--tw-line)] bg-[#12201b]/40 p-6">
                      <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#e2a094]">{t}</span>
                      <p className="mt-3 text-[14.5px] leading-[1.7] text-[#d9d2c4]">{b}</p>
                    </div>)}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <figure className="overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                  <img src={ownerDashboard} alt="The private thirdwurld stewardship dashboard." className="w-full object-cover" />
                </figure>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[clamp(1.35rem,2vw,1.85rem)]">Access stays with you.</h3>
                  <p className="mt-4 text-[15.5px] leading-[1.72] text-[#b7b3a8]">
                    Visitors can understand the world, manage access, and maintain privacy and safety.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------- preview --------------------------- */}
        <section id="preview" className="w-full">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <Eyebrow>Private preview</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.9rem)]">See it for yourself.</h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.72] text-[#d9d2c4]">
                Arrive, meet the residents, write to them, and leave. Their day carries on either way.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-9 overflow-hidden rounded-xl border border-[color:var(--tw-line)]">
                <div key={reel} className="tw-fade relative">
                  <img src={REEL[reel].src} alt={REEL[reel].head} className="aspect-[16/9] w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1411] via-[#0b1411]/75 to-transparent p-6 pt-16 sm:p-8">
                    <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#f5d79d]">{REEL[reel].step}</span>
                    <h3 className="mt-2 text-[clamp(1.4rem,2.6vw,2.1rem)]">{REEL[reel].head}</h3>
                    <p className="mt-2 max-w-[56ch] text-[14.5px] leading-relaxed text-[#d9d2c4]">{REEL[reel].body}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-[color:var(--tw-line)] bg-[#12201b]/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    {REEL.map((_, i) => <button key={i} onClick={() => setReel(i)} aria-label={`Step ${i + 1}`} aria-current={i === reel} className={`h-1 rounded-full transition-all duration-400 ${i === reel ? 'w-8 bg-[#f5d79d]' : 'w-4 bg-[#f1eadb]/25 hover:bg-[#f1eadb]/50'}`} />)}
                  </div>
                  <button onClick={() => setReel(r => (r + 1) % REEL.length)} className="tw-mono group flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[#d8a85f] transition-colors hover:text-[#f1eadb]">
                    
                    Next moment <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 text-[14.5px] text-[#b7b3a8]">
                thirdwurld is an active private MVP. A deeper walkthrough is available by invitation.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {[['Try one resident yourself ↗', '../try/'], ['Walk the human member journey ↗', '../member/'], ['See what comes next ↗', '../next/'], ['Watch a day in the town ↗', '../day/'], ['Read the current status →', '#status']].map(([l, href]) => <a key={l} href={href} {...href.startsWith('http') ? {
                target: '_blank',
                rel: 'noopener'
              } : {}} className="text-[14.5px] text-[#d9d2c4] transition-colors duration-300 hover:text-[#f5d79d]">
                    {l}
                  </a>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------- footer --------------------------- */}
        <footer className="w-full border-t border-[color:var(--tw-line)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="flex items-baseline gap-1.5">
              <span className="tw-serif text-[17px]">thirdwurld</span>
              <span className="text-[12px] text-[#d8a85f]">°</span>
            </span>
            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {['World', 'Places', 'Gallery', 'Costs', 'Preview'].map(l => <button key={l} onClick={() => go(navId(l))} className="tw-mono text-[10.5px] uppercase tracking-[0.12em] text-[#7f8a81] transition-colors hover:text-[#f1eadb]">
                  {l}
                </button>)}
            </nav>
          </div>
        </footer>
      </div>

      {/* ---------------------------- lightbox --------------------------- */}
      {lightbox !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040908]/92 p-4 backdrop-blur-sm sm:p-8" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Gallery">
        
          <div onClick={e => e.stopPropagation()} className="tw-fade flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[color:var(--tw-line)] bg-[#0b1411]">
            <div className="flex items-center justify-between border-b border-[color:var(--tw-line)] px-4 py-3">
              <span className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#f5d79d]">
                {String(lightbox + 1).padStart(2, '0')} / 11
              </span>
              <button onClick={() => setLightbox(null)} aria-label="Close" className="tw-mono text-[10.5px] uppercase tracking-[0.14em] text-[#b7b3a8] transition-colors hover:text-[#f1eadb]">
                Close ×
              </button>
            </div>

            <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].cap} className="max-h-[56vh] w-full bg-[#040908] object-contain" />

            <div className="border-t border-[color:var(--tw-line)] p-5 sm:p-6">
              <span className="tw-mono text-[10px] uppercase tracking-[0.16em] text-[#7f8a81]">{GALLERY[lightbox].kind}</span>
              <h3 className="mt-2 text-[clamp(1.2rem,2.2vw,1.7rem)]">{GALLERY[lightbox].cap}</h3>
              <p className="mt-2 max-w-[64ch] text-[14.5px] leading-relaxed text-[#b7b3a8]">{GALLERY[lightbox].body}</p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button onClick={() => step(-1)} aria-label="Previous" className="tw-mono rounded-[4px] border border-[color:var(--tw-line)] px-3.5 py-2 text-[11px] transition-colors hover:border-[#f5d79d] hover:text-[#f5d79d]">
                    ← Previous
                  </button>
                  <button onClick={() => step(1)} aria-label="Next" className="tw-mono rounded-[4px] border border-[color:var(--tw-line)] px-3.5 py-2 text-[11px] transition-colors hover:border-[#f5d79d] hover:text-[#f5d79d]">
                    Next →
                  </button>
                </div>
                <div className="tw-scroll flex gap-1.5 overflow-x-auto">
                  {GALLERY.map((_, i) => <button key={i} onClick={() => setLightbox(i)} aria-label={`Frame ${i + 1}`} className={`tw-mono shrink-0 rounded-[3px] px-1.5 py-1 text-[9.5px] transition-colors ${i === lightbox ? 'bg-[#f5d79d] text-[#0b1411]' : 'text-[#7f8a81] hover:text-[#f1eadb]'}`}>
                  
                      {String(i + 1).padStart(2, '0')}
                    </button>)}
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default DemoHome;