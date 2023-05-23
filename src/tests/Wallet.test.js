import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import mockData from './helpers/mockData';

describe('Testes dá pagina Wallet', () => {
  const initialEntries = ['/carteira']; // aqui ele renderiza entrando na página /carteira

  it('Testa se tudo aparece na página', () => {
    const initialState = { user: { email: 'test@test.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const userInfo = screen.getByText(/user: test@test\.com/i);
    expect(userInfo).toBeInTheDocument();

    const BRL = screen.getByText(/câmbio: brl/i);
    expect(BRL).toBeInTheDocument();
  });
});
