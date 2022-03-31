import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </MemoryRouter>,
    document.getElementById('app')
  );
});
