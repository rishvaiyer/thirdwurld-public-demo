import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { DemoWhatComesNext } from '../src/components/generated/DemoWhatComesNext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoWhatComesNext />
  </StrictMode>,
);
