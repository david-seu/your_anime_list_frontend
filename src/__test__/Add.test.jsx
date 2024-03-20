import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import Add from '../components/Add';

test('renders all elements in Add component', () => {
  const history = createMemoryHistory();
  render(<MemoryRouter><Add /></MemoryRouter>);
  const titleElement = screen.getByLabelText(/Title/i);
  const watchedElement = screen.getByLabelText(/Watched/i);
  const scoreElement = screen.getByLabelText(/Score/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(titleElement).toBeInTheDocument();
  expect(watchedElement).toBeInTheDocument();
  expect(scoreElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('submit button works', () => {
  render(<MemoryRouter><Add /></MemoryRouter>);
  const titleInput = screen.getByPlaceholderText(/Enter title/i);
  const watchedCheckbox = screen.getByPlaceholderText(/Enter score/i);
  const scoreInput = screen.getByLabelText(/Watched/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });

  userEvent.type(titleInput, 'Naruto');
  userEvent.click(watchedCheckbox);
  userEvent.type(scoreInput, '8.5');
  userEvent.click(submitButton);
  console.log(document.body.innerHTML)
  expect().toContainEqual({
    id: expect.any(String),
    title: 'Naruto',
    watched: 'true',
    score: '8.5'
  });
});