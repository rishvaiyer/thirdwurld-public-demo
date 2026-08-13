import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { DemoHome } from '../src/components/generated/DemoHome';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoHome />
  </StrictMode>,
);
