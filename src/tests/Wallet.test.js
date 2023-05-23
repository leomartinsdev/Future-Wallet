import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes dá pagina Wallet', () => {
  const initialEntries = ['/carteira']; // aqui ele renderiza entrando na página /carteira

  it('O usuário e a moeda BRL aparecem', () => {
    const initialState = { user: { email: 'teste@teste.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const userInfo = screen.getByText(/user: teste@teste\.com/i);
    expect(userInfo).toBeInTheDocument();

    const BRL = screen.getByText(/câmbio: brl/i);
    expect(BRL).toBeInTheDocument();
  });

  it('Testa se o usuário e a moeda BRL aparecem', () => {
    const initialState = { user: { email: 'test@test.com' } };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const userInfo = screen.getByText(/user: test@test\.com/i);
    expect(userInfo).toBeInTheDocument();

    const BRL = screen.getByText(/câmbio: brl/i);
    expect(BRL).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const coinInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('Testa se os inputs são limpos depois de adicionar a despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Cachorro');
    userEvent.click(addExpenseBtn);

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });
});
