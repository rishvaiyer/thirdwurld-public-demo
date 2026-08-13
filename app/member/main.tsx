import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { DemoMemberJourney } from '../src/components/generated/DemoMemberJourney';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoMemberJourney />
  </StrictMode>,
);
