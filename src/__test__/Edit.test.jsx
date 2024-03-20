import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Edit from '../components/Edit';

test('renders all elements in Edit component', () => {
  render(<MemoryRouter> <Edit /></MemoryRouter >);
  const titleElement = screen.getByLabelText(/Title/i);
  const watchedElement = screen.getByLabelText(/Watched/i);
  const scoreElement = screen.getByLabelText(/Score/i);
  const submitButton = screen.getByRole('button', { name: /Update/i });
  expect(titleElement).toBeInTheDocument();
  expect(watchedElement).toBeInTheDocument();
  expect(scoreElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

// test('submit button works in Edit component', () => {
//   const handleSubmit = jest.fn();
//   render(<Router><Route path='/'><Edit handleSubmit={handleSubmit} /></Route></Router>);
//   const submitButton = screen.getByRole('button', { name: /Submit/i });
//   fireEvent.click(submitButton);
//   expect(handleSubmit).toHaveBeenCalled();
// });

// test('anime is updated when form is submitted', () => {
//   const testAnime = Anime[0];
//   render(<Edit />);
//   const titleInput = screen.getByLabelText(/Title/i);
//   const watchedCheckbox = screen.getByLabelText(/Watched/i);
//   const scoreInput = screen.getByLabelText(/Score/i);
//   const submitButton = screen.getByRole('button', { name: /Submit/i });

//   userEvent.type(titleInput, 'Bleach');
//   userEvent.click(watchedCheckbox);
//   userEvent.type(scoreInput, '9');
//   fireEvent.click(submitButton);

//   expect(Anime).toContainEqual({
//     id: '1',
//     title: 'Bleach',
//     watched: 'true',
//     score: '9'
//   });
// });