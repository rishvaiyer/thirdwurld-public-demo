import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { DemoTryAResident } from '../src/components/generated/DemoTryAResident';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoTryAResident />
  </StrictMode>,
);
