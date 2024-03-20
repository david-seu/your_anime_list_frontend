import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../components/Home';
import Anime from '../data/Anime';

test('renders table headers', () => {
  render(<Router><Home /></Router>);
  const titleHeader = screen.getByText(/Title/i);
  const watchedHeader = screen.getByText(/Watched/i);
  const scoreHeader = screen.getByText(/Score/i);
  const actionsHeader = screen.getByText(/Actions/i);
  expect(titleHeader).toBeInTheDocument();
  expect(watchedHeader).toBeInTheDocument();
  expect(scoreHeader).toBeInTheDocument();
  expect(actionsHeader).toBeInTheDocument();
});

test('renders anime data into the table', () => {
  render(<Router><Home /></Router>);
  const animeTitle = screen.getByText(/Naruto/i); 
  expect(animeTitle).toBeInTheDocument();
});

test('renders buttons', () => {
  render(<Router><Home /></Router>);
  const editButton = screen.getAllByRole('button', { name: /Edit/i })[0];
  const viewButton = screen.getAllByRole('button', { name: /View/i })[0];
  const deleteButton = screen.getAllByRole('button', { name: /DELETE/i })[0];
  expect(editButton).toBeInTheDocument();
  expect(viewButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test('delete button works', () => {
  render(<Router><Home /></Router>);
  window.confirm = jest.fn(() => true);
  const deleteButton = screen.getAllByRole('button', { name: /DELETE/i })[0];
  fireEvent.click(deleteButton);
  const animeTitle = screen.queryByText(/Attack on Titan/i);
  expect(animeTitle).toBeNull();
});

// test('edit button works', () =>{
//   const editHandler = jest.fn();
//   render(<Router><Home editHandler={editHandler}/></Router>);
//   const editButton = screen.getAllByRole('button', {name: /Edit/i })[0];
//   console.log(editButton);
//   fireEvent.click(editButton);
//   expect(editHandler).toHaveBeenCalled();
// })
