import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

const mockStore = configureStore([]);
const initialState = {
  moviesReducer: {
    items: [],
    status: 'success',
    attempts: 0,
  },
  sortReducer: {
    sortField: { name: 'году', sortProperty: 'year' },
    sortType: 1,
    moviePage: 1,
    moviesPerPage: 10,
    searchValue: '',
  },
};
const store = mockStore(initialState);

describe('Home Component', () => {
  it('отображает контент корректно', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/все фильмы/i)).toBeInTheDocument();
    expect(screen.getByText(/жанр/i)).toBeInTheDocument();
  });
});
