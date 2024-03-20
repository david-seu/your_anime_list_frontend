import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import View from '../components/View';

test('renders all elements in View component', () => {
  render(
    <MemoryRouter initialEntries={[`/view/1`]}>
      <Routes>
      <Route path="/view/:id" element={<View />}>
      </Route>
      </Routes> 
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/Naruto/i);
  const imageElement = screen.getByText(/Naruto/i);
  const watchedElement = screen.getByText(/Watched: No/i);
  const scoreElement = screen.getByText(/Score: N\/A/i);
  expect(titleElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(watchedElement).toBeInTheDocument();
  expect(scoreElement).toBeInTheDocument();
});