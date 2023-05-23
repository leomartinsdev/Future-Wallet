import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes dá pagina Login', () => {
  it('Testa login com email e senha válidos', () => {
    renderWithRouterAndRedux(<App />);
    const validMail = 'leo@martins.com';
    const validPassword = '123456';

    const emailBox = screen.getByRole('textbox');
    const passwordBox = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailBox, validMail);
    userEvent.type(passwordBox, validPassword);
    expect(enterButton).toBeEnabled();
  });

  it('Testa se os campos estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailBox = screen.getByRole('textbox');
    const passwordBox = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    expect(emailBox).toBeInTheDocument();
    expect(passwordBox).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it('Testa se o botão entrar direcionada para a página da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const validMail = 'leo@martins.com';
    const validPassword = '123456';

    const emailBox = screen.getByRole('textbox');
    const passwordBox = screen.getByPlaceholderText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailBox, validMail);
    userEvent.type(passwordBox, validPassword);
    expect(enterButton).toBeEnabled();

    userEvent.click(enterButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
