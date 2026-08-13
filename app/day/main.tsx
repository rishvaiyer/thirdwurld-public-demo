import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { DemoADay } from '../src/components/generated/DemoADay';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoADay />
  </StrictMode>,
);
